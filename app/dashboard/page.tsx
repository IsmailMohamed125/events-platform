"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EventsService } from "@/_lib/events";
import EventCard from "@/app/_components/EventCard";
import { useEffect, useState } from "react";
import { Event, EventAttendee } from "@/_lib/events";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [adminEvents, setAdminEvents] = useState<Event[]>([]);
  const [draftEvents, setDraftEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.user?.id) {
        try {
          console.log("Session user:", session.user);

          // Fetch user's registered events
          const userEventsData = await EventsService.getUserEvents(
            session.user.id
          );
          console.log("User events data:", userEventsData);
          setUserEvents(
            userEventsData.map(
              (data: EventAttendee & { events: Event }) => data.events
            )
          );

          // If user is admin, fetch their created events and drafts
          if (session.user.role === "admin") {
            console.log("User is admin, fetching created events...");

            // Fetch all events created by the user
            const createdEvents = await EventsService.getEventsByCreator(
              session.user.id
            );
            console.log("Raw created events from database:", createdEvents);

            // Log each event's status
            createdEvents.forEach((event) => {
              console.log(
                `Event ${event.title} (${event.id}) has status: ${event.status}`
              );
            });

            // Filter published and draft events
            const publishedEvents = createdEvents.filter((event) => {
              console.log(
                `Checking event ${event.title} for published status:`,
                event.status === "published"
              );
              return event.status === "published";
            });

            const draftEvents = createdEvents.filter((event) => {
              console.log(
                `Checking event ${event.title} for draft status:`,
                event.status === "draft"
              );
              return event.status === "draft";
            });

            console.log("Filtered published events:", publishedEvents);
            console.log("Filtered draft events:", draftEvents);

            // Try fetching draft events directly
            const directDraftEvents =
              await EventsService.getDraftEventsByCreator(session.user.id);
            console.log("Directly fetched draft events:", directDraftEvents);

            setAdminEvents(publishedEvents);
            setDraftEvents(directDraftEvents);
          } else {
            console.log("User is not an admin");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();
  }, [session]);

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user?.role === "admin";
  console.log("Current admin status:", isAdmin);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hover:bg-accent-400 hover:text-primary-950"
        >
          Sign Out
        </Button>
      </div>
      <p className="mb-8">Welcome, {session.user?.name}!</p>

      {/* User's Events Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              className={
                new Date(event.end_time) < new Date() ? "opacity-50" : ""
              }
            />
          ))}
          {userEvents.length === 0 && (
            <p className="text-muted-foreground">
              You haven't registered for any events yet.
            </p>
          )}
        </div>
      </section>

      {/* Admin Sections */}
      {isAdmin && (
        <>
          {/* Published Events Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {adminEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {adminEvents.length === 0 && (
                <p className="text-muted-foreground">
                  You haven't created any published events yet.
                </p>
              )}
            </div>
          </section>

          {/* Draft Events Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Draft Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {draftEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {draftEvents.length === 0 && (
                <p className="text-muted-foreground">
                  You don't have any draft events.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
