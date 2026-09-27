"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo enviar el mensaje.");
      form.reset();
      setStatus("success");
      setMessage("Recibimos tu mensaje. Te responderemos pronto.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No se pudo enviar el mensaje.");
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="field-row">
        <label>
          <span>Nombre</span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label>
          <span>Correo</span>
          <input autoComplete="email" inputMode="email" name="email" required type="email" />
        </label>
      </div>
      <label>
        <span>Interés</span>
        <select defaultValue="" name="interest" required>
          <option disabled value="">Selecciona una opción</option>
          <option value="coleccion">Adquirir una obra</option>
          <option value="exhibicion">Proponer una exhibición</option>
          <option value="prensa">Prensa y colaboración</option>
          <option value="otro">Otro</option>
        </select>
      </label>
      <label>
        <span>Mensaje</span>
        <textarea minLength={10} name="message" required rows={4} />
      </label>
      <input aria-hidden="true" autoComplete="off" className="honeypot" name="company" tabIndex={-1} type="text" />
      <div className="form-footer">
        <button disabled={status === "sending"} type="submit">
          {status === "sending" ? <LoaderCircle aria-hidden="true" className="spinner" /> : <ArrowUpRight aria-hidden="true" />}
          {status === "sending" ? "Enviando" : "Enviar mensaje"}
        </button>
        <p aria-live="polite" className={`form-message ${status}`}>{message}</p>
      </div>
    </form>
  );
}
