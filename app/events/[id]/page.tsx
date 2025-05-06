import { EventsService } from "@/_lib/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, PoundSterling, Users } from "lucide-react";
import { Event as BaseEvent } from "@/_lib/events";
import RegisterButton from "../../_components/RegisterButton";

// Extended Event type with image_url
interface Event extends BaseEvent {
  image_url?: string | null;
}

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = (await EventsService.getEventById(id)) as Event;

  if (!event) {
    notFound();
  }

  // Format date
  const eventDate = new Date(event.start_time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format start time
  const startTime = new Date(event.start_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Format end time
  const endTime = new Date(event.end_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Format price in GBP
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(event.price);

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-2xl font-semibold text-primary-foreground/80">
                {event.title}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{event.title}</h1>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{eventDate}</p>
                <p className="text-sm text-muted-foreground">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">{event.location}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">
                {event.current_attendees} / {event.max_attendees} attendees
              </p>
            </div>

            {event.price > 0 && (
              <div className="flex items-center gap-2">
                <PoundSterling className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">{formattedPrice}</p>
              </div>
            )}
          </div>

          {/* Register Button */}
          <RegisterButton event={event} />
        </div>
      </div>
    </div>
  );
}
