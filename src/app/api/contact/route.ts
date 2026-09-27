import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const ContactSchema = z.object({
  company: z.string().max(0).optional().default(""),
  email: z.string().email().max(160),
  interest: z.enum(["coleccion", "exhibicion", "prensa", "otro"]),
  message: z.string().trim().min(10).max(3000),
  name: z.string().trim().min(2).max(120),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character] ?? character);
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  attempts.set(key, current);
  return current.count > 5;
}

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return Response.json({ message: "Demasiados intentos. Intenta nuevamente en unos minutos." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "El formato del mensaje no es válido." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ message: "Revisa los campos e intenta de nuevo." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO) {
    return Response.json(
      { message: "El formulario está en modo vista previa. Usa el correo directo mientras configuramos SMTP." },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const transporter = nodemailer.createTransport({
    auth: { pass: SMTP_PASSWORD, user: SMTP_USER },
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true" || SMTP_PORT === "465",
  });

  try {
    await transporter.sendMail({
      from: SMTP_FROM ?? `GÜATSART <${SMTP_USER}>`,
      html: `
        <h1>Nuevo contacto desde GÜATSART</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Interés:</strong> ${escapeHtml(data.interest)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      `,
      replyTo: data.email,
      subject: `[GÜATSART] ${data.interest} — ${data.name}`,
      text: `Nombre: ${data.name}\nCorreo: ${data.email}\nInterés: ${data.interest}\n\n${data.message}`,
      to: CONTACT_TO,
    });
    return Response.json({ message: "Mensaje enviado correctamente." });
  } catch {
    return Response.json({ message: "No pudimos enviar el mensaje. Escríbenos directamente por correo." }, { status: 502 });
  }
}
