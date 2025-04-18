import { NextRequest, NextResponse } from "next/server";

// Securely load your Telegram Bot Token and Chat ID from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram Bot Token or Chat ID is not configured in environment variables.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address provided." }, { status: 400 });
    }

    const messageText = `🔔 New Waitlist Signup:\nEmail: ${email}`;
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API Error:", result);
      // Don't expose detailed Telegram errors to the client
      return NextResponse.json({ error: "Could not send notification." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
} 