import { EventsService } from "@/_lib/events";

export default async function Events() {
  const events = await EventsService.getPublishedEvents();
  return <div>{events.map((event) => event.title)}</div>;
}
