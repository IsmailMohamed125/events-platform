import { NextResponse } from "next/server";
import { auth } from "@/_lib/auth";
import { EventsService } from "@/_lib/events";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create an event" },
        { status: 401 }
      );
    }

    const eventData = await request.json();

    // Add the creator's ID to the event data
    const eventWithCreator = {
      ...eventData,
      created_by: session.user.id,
      current_attendees: 0, // Initialize with 0 attendees
    };

    const event = await EventsService.createEvent(eventWithCreator);

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
