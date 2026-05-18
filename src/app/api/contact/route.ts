import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_RATE_LIMIT } from "@/constants/config";
import { sendContactEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  website: z.string().optional(),
});

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
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
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
