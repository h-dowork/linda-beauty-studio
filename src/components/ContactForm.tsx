"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const SERVICES = ["Hair", "Nails", "Makeup & Lashes", "Skin Care", "Other"];

export default function ContactForm() {
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

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else if (res.status === 429) {
        setErrors({ form: "Too many requests. Please wait 15 minutes and try again." });
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" aria-hidden="true" />
        <h3 className="text-xl font-bold text-pink-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Message Sent!
        </h3>
        <p className="text-pink-600 text-sm">We&apos;ll get back to you shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-pink-500 underline hover:text-pink-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Contact form">
      {status === "error" && (
        <div role="alert" className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          Something went wrong. Please try again.
        </div>
      )}

      {errors.form && (
        <div role="alert" className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          {errors.form}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-pink-900 mb-1.5">
            Name <span aria-label="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-pink-900 placeholder-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
              errors.name ? "border-red-400" : "border-pink-200"
            }`}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-pink-900 mb-1.5">
            Email <span aria-label="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-pink-900 placeholder-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
              errors.email ? "border-red-400" : "border-pink-200"
            }`}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-pink-900 mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            maxLength={20}
            autoComplete="tel"
            placeholder="+84 xxx xxx xxx"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 text-sm text-pink-900 placeholder-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-pink-900 mb-1.5">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-pink-200 text-sm text-pink-900 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-pink-900 mb-1.5">
          Message <span aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder="Tell us about the service you're interested in, preferred dates, or any questions..."
          className={`w-full px-4 py-3 rounded-xl border text-sm text-pink-900 placeholder-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors resize-none ${
            errors.message ? "border-red-400" : "border-pink-200"
          }`}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p id="message-error" role="alert" className="text-xs text-red-600">{errors.message}</p>
          ) : <span />}
          <span className="text-xs text-pink-300">{form.message.length}/1000</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 active:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 cursor-pointer"
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
