// app/api/events/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/_lib/auth";
import { EventsService } from "@/_lib/events";

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to register for an event" },
        { status: 401 }
      );
    }

    // Get data from request
    const data = await request.json();
    const { eventId } = data;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Register the user for the event using the service role access
    const result = await EventsService.registerForEvent(
      eventId,
      session.user.id
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error registering for event:", error);

    // Format the error message for the client
    let errorMessage = "Failed to register for event";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
