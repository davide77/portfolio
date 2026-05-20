import { NextResponse } from "next/server";
import { CONTACT_RATE_LIMIT } from "@/constants/config";
import { sendContactEmail } from "@/lib/resend";
import { contactSchema, fieldErrors } from "@/lib/validation/contact";

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + CONTACT_RATE_LIMIT.windowMs });
    return true;
  }
  if (entry.count >= CONTACT_RATE_LIMIT.maxRequests) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Return per-field messages from the shared schema so the client and
    // server never disagree about what is wrong.
    return NextResponse.json(
      { errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
