import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, PoundSterling } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event as BaseEvent } from "@/_lib/events";

// Extended Event type with image_url
interface Event extends BaseEvent {
  image_url?: string | null;
}

interface EventCardProps {
  event: Event;
  className?: string;
}

export default function EventCard({ event, className }: EventCardProps) {
  // Truncate description to 100 characters
  const truncatedDescription = event.description
    ? event.description.length > 100
      ? `${event.description.substring(0, 100)}...`
      : event.description
    : "";

  // Format date
  const eventDate = new Date(event.start_time).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Format price in GBP
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(event.price);

  return (
    <Link
      href={`/events/${event.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-lg font-semibold text-primary-foreground/80">
              {event.title}
            </span>
          </div>
        )}
        {/* Price Tag */}
        {event.price > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-sm font-medium backdrop-blur-sm">
            <PoundSterling className="h-4 w-4" />
            {formattedPrice}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {truncatedDescription}
        </p>

        {/* Event Details */}
        <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{eventDate}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
