import { createClient } from "@supabase/supabase-js";
import { Database } from "@/_lib/types/supabase";

// Types
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
export type EventUpdate = Database["public"]["Tables"]["events"]["Update"];
export type EventAttendee =
  Database["public"]["Tables"]["event_attendees"]["Row"];
export type EventAttendeeInsert =
  Database["public"]["Tables"]["event_attendees"]["Insert"];

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class EventsService {
  // Get all published events
  static async getPublishedEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get event by ID
  static async getEventById(id: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new event
  static async createEvent(event: EventInsert) {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update event
  static async updateEvent(id: string, updates: EventUpdate) {
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete event
  static async deleteEvent(id: string) {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) throw error;
  }

  // Get events created by a specific user
  static async getEventsByCreator(userId: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", userId)
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data;
  }

  // Register user for an event
  static async registerForEvent(eventId: string, userId: string) {
    // First check if event exists and has capacity
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (eventError) throw eventError;
    if (!event) throw new Error("Event not found");
    if (event.current_attendees >= event.max_attendees) {
      throw new Error("Event is full");
    }

    // Check if user is already registered
    const { data: existingRegistration } = await supabase
      .from("event_attendees")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .single();

    if (existingRegistration) {
      throw new Error("User is already registered for this event");
    }

    // Begin transaction
    const { data: attendee, error: attendeeError } = await supabase
      .from("event_attendees")
      .insert({
        event_id: eventId,
        user_id: userId,
        status: "registered",
      })
      .select()
      .single();

    if (attendeeError) throw attendeeError;

    // Update event attendee count
    const { error: updateError } = await supabase
      .from("events")
      .update({ current_attendees: event.current_attendees + 1 })
      .eq("id", eventId);

    if (updateError) throw updateError;

    return attendee;
  }

  // Cancel event registration
  static async cancelRegistration(eventId: string, userId: string) {
    // First check if registration exists
    const { data: registration, error: regError } = await supabase
      .from("event_attendees")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .single();

    if (regError) throw regError;
    if (!registration) throw new Error("Registration not found");

    // Begin transaction
    const { error: deleteError } = await supabase
      .from("event_attendees")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", userId);

    if (deleteError) throw deleteError;

    // Update event attendee count
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (eventError) throw eventError;

    const { error: updateError } = await supabase
      .from("events")
      .update({ current_attendees: event.current_attendees - 1 })
      .eq("id", eventId);

    if (updateError) throw updateError;
  }

  // Get user's registered events
  static async getUserEvents(userId: string) {
    const { data, error } = await supabase
      .from("event_attendees")
      .select(
        `
        *,
        events (*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Update event status
  static async updateEventStatus(
    id: string,
    status: "draft" | "published" | "cancelled" | "completed"
  ) {
    const { data, error } = await supabase
      .from("events")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Search events
  static async searchEvents(query: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .eq("status", "published")
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get upcoming events
  static async getUpcomingEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get past events
  static async getPastEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .lt("start_time", new Date().toISOString())
      .order("start_time", { ascending: false });

    if (error) throw error;
    return data;
  }
}
