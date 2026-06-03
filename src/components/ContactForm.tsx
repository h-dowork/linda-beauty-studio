"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const FB_PAGE_ID = "61560198843135";

function buildMessengerUrl(fields: {
  name: string; phone: string; email: string; service: string; message: string;
}, studioLabel: string): string {
  const lines = [
    `🌸 ${studioLabel}`,
    "",
    `Name:    ${fields.name}`,
    fields.phone ? `Phone:   ${fields.phone}` : null,
    `Email:   ${fields.email}`,
    fields.service ? `Service: ${fields.service}` : null,
    "",
    fields.message,
  ].filter((l) => l !== null).join("\n");
  return `https://m.me/${FB_PAGE_ID}?text=${encodeURIComponent(lines)}`;
}

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const f = t.form;

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 422 && data.errors) {
        const mapped: Record<string, string> = {};
        if (data.errors.name) mapped.name = f.nameRequired;
        if (data.errors.email) mapped.email = f.emailRequired;
        if (data.errors.message) mapped.message = f.messageRequired;
        setErrors(mapped);
        setStatus("idle");
        return;
      }
      if (res.status === 429) {
        setErrors({ form: f.tooMany });
        setStatus("idle");
        return;
      }

      const url = buildMessengerUrl(form, "BOOKING REQUEST — Linda Beauty Studio");
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const messengerUrl = buildMessengerUrl(form, "BOOKING REQUEST — Linda Beauty Studio");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          {f.successHeading}
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">{f.successBody}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {f.openAgain}
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="text-sm text-gray-500 underline hover:text-gray-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
          >
            {f.newBooking}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label={f.submit}>
      {status === "error" && (
        <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          {f.errorGeneric}
        </div>
      )}
      {errors.form && (
        <div role="alert" className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          {errors.form}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.name} <span aria-label="povinné">*</span>
          </label>
          <input
            id="name" name="name" type="text" value={form.name} onChange={handleChange}
            required maxLength={100} autoComplete="name" placeholder={f.namePlaceholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${errors.name ? "border-red-400" : "border-gray-200"}`}
            aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={!!errors.name}
          />
          {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.email} <span aria-label="povinné">*</span>
          </label>
          <input
            id="email" name="email" type="email" value={form.email} onChange={handleChange}
            required maxLength={254} autoComplete="email" placeholder={f.emailPlaceholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${errors.email ? "border-red-400" : "border-gray-200"}`}
            aria-describedby={errors.email ? "email-error" : undefined} aria-invalid={!!errors.email}
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">{f.phone}</label>
          <input
            id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
            maxLength={20} autoComplete="tel" placeholder={f.phonePlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">{f.service}</label>
          <select
            id="service" name="service" value={form.service} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="">{f.servicePlaceholder}</option>
            {f.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {f.message} <span aria-label="povinné">*</span>
        </label>
        <textarea
          id="message" name="message" value={form.message} onChange={handleChange}
          required minLength={10} maxLength={1000} rows={4} placeholder={f.messagePlaceholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
          aria-describedby={errors.message ? "message-error" : undefined} aria-invalid={!!errors.message}
        />
        <div className="flex justify-between mt-1">
          {errors.message
            ? <p id="message-error" role="alert" className="text-xs text-red-600">{errors.message}</p>
            : <span />}
          <span className="text-xs text-gray-300">{form.message.length}/1000</span>
        </div>
      </div>

      <button
        type="submit" disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 active:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            {f.submitting}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {f.submit}
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-400">
        {lang === "cs"
          ? "Messenger se otevře s předvyplněnými údaji — stačí kliknout Odeslat."
          : "Messenger opens pre-filled — just tap Send to confirm."}
      </p>
    </form>
  );
}
