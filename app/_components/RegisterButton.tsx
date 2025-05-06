// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Event } from "@/_lib/events";
// import { EventsService } from "@/_lib/events";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// interface RegisterButtonProps {
//   event: Event;
// }

// export default function RegisterButton({ event }: RegisterButtonProps) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);

//   // Check if user is already registered
//   useEffect(() => {
//     const checkRegistration = async () => {
//       if (session?.user?.id) {
//         try {
//           const userEvents = await EventsService.getUserEvents(session.user.id);
//           const isAlreadyRegistered = userEvents.some(
//             (data) => data.events.id === event.id
//           );
//           setIsRegistered(isAlreadyRegistered);
//         } catch (error) {
//           console.error("Error checking registration status:", error);
//         }
//       }
//     };

//     checkRegistration();
//   }, [session?.user?.id, event.id]);

//   const handleClick = async () => {
//     if (!session) {
//       // Redirect to login page with return URL
//       router.push(`/login?callbackUrl=/events/${event.id}`);
//       return;
//     }

//     if (!session.user?.id) {
//       console.error("No user ID in session:", session);
//       toast.error("User session is invalid. Please try logging in again.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       console.log("Attempting registration with user ID:", session.user.id);
//       await EventsService.registerForEvent(event.id, session.user.id);
//       toast.success("Successfully registered for event!");
//       setIsRegistered(true);
//       // Refresh the page to show updated attendee count
//       router.refresh();
//     } catch (error) {
//       console.error("Error registering for event:", error);

//       // Check for specific error types for better user feedback
//       let errorMessage = "Failed to register for event";
//       if (error instanceof Error) {
//         if (error.message.includes("already registered")) {
//           errorMessage = "You're already registered for this event";
//           setIsRegistered(true);
//         } else if (error.message.includes("profile not found")) {
//           errorMessage = "User profile not found. Please try logging in again.";
//         } else {
//           errorMessage = error.message;
//         }
//       }

//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Disable the button if event is full or user is already registered
//   const isFull = event.current_attendees >= event.max_attendees;

//   return (
//     <button
//       onClick={handleClick}
//       disabled={isLoading || isFull || isRegistered}
//       className="mt-auto bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isLoading
//         ? "Processing..."
//         : isRegistered
//         ? "Registered!"
//         : isFull
//         ? "Event Full"
//         : event.price > 0
//         ? "Purchase Ticket"
//         : "Attend Event"}
//     </button>
//   );
// }
// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Event } from "@/_lib/events";
// import { EventsService } from "@/_lib/events";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// interface RegisterButtonProps {
//   event: Event;
// }

// export default function RegisterButton({ event }: RegisterButtonProps) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);

//   // Check if user is already registered
//   useEffect(() => {
//     const checkRegistration = async () => {
//       if (session?.user?.id) {
//         try {
//           const userEvents = await EventsService.getUserEvents(session.user.id);
//           const isAlreadyRegistered = userEvents.some(
//             (data) => data.events.id === event.id
//           );
//           setIsRegistered(isAlreadyRegistered);
//         } catch (error) {
//           console.error("Error checking registration status:", error);
//         }
//       }
//     };

//     checkRegistration();
//   }, [session?.user?.id, event.id]);

//   const handleClick = async () => {
//     if (!session) {
//       // Redirect to login page with return URL
//       router.push(`/login?callbackUrl=/events/${event.id}`);
//       return;
//     }

//     if (!session.user?.id) {
//       console.error("No user ID in session:", session);
//       toast.error("User session is invalid. Please try logging in again.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       console.log("Attempting registration with user ID:", session.user.id);

//       // Use the API endpoint instead of direct service call
//       const response = await fetch("/api/events/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ eventId: event.id }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to register for event");
//       }

//       toast.success("Successfully registered for event!");
//       setIsRegistered(true);
//       // Refresh the page to show updated attendee count
//       router.refresh();
//     } catch (error) {
//       console.error("Error registering for event:", error);

//       // Check for specific error types for better user feedback
//       let errorMessage = "Failed to register for event";
//       if (error instanceof Error) {
//         if (error.message.includes("already registered")) {
//           errorMessage = "You're already registered for this event";
//           setIsRegistered(true);
//         } else if (error.message.includes("profile not found")) {
//           errorMessage = "User profile not found. Please try logging in again.";
//         } else {
//           errorMessage = error.message;
//         }
//       }

//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Disable the button if event is full or user is already registered
//   const isFull = event.current_attendees >= event.max_attendees;

//   return (
//     <button
//       onClick={handleClick}
//       disabled={isLoading || isFull || isRegistered}
//       className="mt-auto bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       {isLoading
//         ? "Processing..."
//         : isRegistered
//         ? "Registered!"
//         : isFull
//         ? "Event Full"
//         : event.price > 0
//         ? "Purchase Ticket"
//         : "Attend Event"}
//     </button>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Event } from "@/_lib/events";
import { EventsService } from "@/_lib/events";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface RegisterButtonProps {
  event: Event;
}

export default function RegisterButton({ event }: RegisterButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if user is already registered
  useEffect(() => {
    const checkRegistration = async () => {
      if (session?.user?.id) {
        try {
          const userEvents = await EventsService.getUserEvents(session.user.id);
          const isAlreadyRegistered = userEvents.some(
            (data) => data.events.id === event.id
          );
          setIsRegistered(isAlreadyRegistered);
        } catch (error) {
          console.error("Error checking registration status:", error);
        }
      }
    };

    checkRegistration();
  }, [session?.user?.id, event.id]);

  const handleClick = async () => {
    if (!session) {
      // Redirect to login page with return URL
      router.push(`/login?callbackUrl=/events/${event.id}`);
      return;
    }

    if (!session.user?.id) {
      console.error("No user ID in session:", session);
      toast.error("User session is invalid. Please try logging in again.");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Attempting registration with user ID:", session.user.id);
      await EventsService.registerForEvent(event.id, session.user.id);
      toast.success("Successfully registered for event!");
      setIsRegistered(true);
      // Refresh the page to show updated attendee count
      router.refresh();
    } catch (error) {
      console.error("Error registering for event:", error);

      // Check for specific error types for better user feedback
      let errorMessage = "Failed to register for event";
      if (error instanceof Error) {
        if (error.message.includes("already registered")) {
          errorMessage = "You're already registered for this event";
          setIsRegistered(true);
        } else if (error.message.includes("profile not found")) {
          errorMessage = "User profile not found. Please try logging in again.";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Disable the button if event is full or user is already registered
  const isFull = event.current_attendees >= event.max_attendees;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isFull || isRegistered}
      className="mt-auto bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading
        ? "Processing..."
        : isRegistered
        ? "Registered!"
        : isFull
        ? "Event Full"
        : event.price > 0
        ? "Purchase Ticket"
        : "Attend Event"}
    </button>
  );
}
