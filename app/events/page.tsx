import { EventsService } from "@/_lib/events";
import EventCard from "@/app/_components/EventCard";

export default async function Events() {
  const events = await EventsService.getPublishedEvents();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-semibold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
