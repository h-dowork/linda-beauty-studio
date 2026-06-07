"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle, Copy, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "success" | "error";

const FB_PAGE_ID = "61560198843135";

function buildBookingText(fields: {
  name: string; phone: string; email: string; service: string; message: string;
}): string {
  const phone = fields.phone.trim() ? `+420 ${fields.phone.trim()}` : "";
  return [
    "🌸 REZERVACE — Linda's Hair Salon",
    "",
    `Jméno:   ${fields.name}`,
    phone          ? `Telefon: ${phone}`           : null,
    `E-mail:  ${fields.email}`,
    fields.service ? `Služba:  ${fields.service}` : null,
    "",
    fields.message,
  ].filter((l): l is string => l !== null).join("\n");
}

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border text-base sm:text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors";
const inputOk    = `${inputBase} border-gray-200`;
const inputError = `${inputBase} border-red-400`;

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const f = t.form;

  const [form, setForm]     = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  // Stores the submitted booking text + Messenger URL for the success screen
  const submittedRef = useRef<{ text: string; url: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Sync client-side validation — must complete before window.open()
    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.length > 100) newErrors.name = f.nameRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = f.emailRequired;
    if (form.message.trim().length < 10) newErrors.message = f.messageRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build text + URL synchronously, then open Messenger within the user gesture
    const text = buildBookingText(form);
    const url  = `https://m.me/${FB_PAGE_ID}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    // Store for success screen, reset form, show success — all sync
    submittedRef.current = { text, url };
    setStatus("success");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });

    // Log in the background — fire-and-forget, no await
    const submitted = { name: form.name, email: form.email, phone: form.phone, service: form.service, message: form.message };
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitted),
    }).catch(() => {});
  }

  async function handleCopy() {
    const text = submittedRef.current?.text ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select the textarea
    }
  }

  if (status === "success") {
    const { text, url } = submittedRef.current ?? { text: "", url: "#" };
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
        </div>
        <h3
          className="text-xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {f.successHeading}
        </h3>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{f.successBody}</p>

        {/* Copy-paste fallback — shown when Messenger native app ignores ?text= */}
        <div className="mt-5 w-full text-left bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white">
            <p className="text-xs text-gray-500">{f.messengerHint}</p>
            <button
              onClick={handleCopy}
              className="ml-3 flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
              aria-label={f.copyText}
            >
              {copied
                ? <><Check className="w-3 h-3" aria-hidden="true" />{f.copied}</>
                : <><Copy className="w-3 h-3" aria-hidden="true" />{f.copyText}</>
              }
            </button>
          </div>
          <pre className="px-4 py-3 text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{text}</pre>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {f.openAgain}
          </a>
          <button
            onClick={() => { setStatus("idle"); submittedRef.current = null; setCopied(false); }}
            className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded py-3 px-2"
          >
            {f.newBooking}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label={f.submit}>
      {/* Error alerts */}
      {status === "error" && (
        <div role="alert" className="flex items-start gap-2 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          {f.errorGeneric}
        </div>
      )}
      {errors.form && (
        <div role="alert" className="flex items-start gap-2 p-3.5 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          {errors.form}
        </div>
      )}

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.name} <span aria-label="povinné" className="text-red-500">*</span>
          </label>
          <input
            id="name" name="name" type="text" value={form.name} onChange={handleChange}
            required maxLength={100}
            autoComplete="name" autoCapitalize="words" autoCorrect="off"
            placeholder={f.namePlaceholder}
            className={errors.name ? inputError : inputOk}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.email} <span aria-label="povinné" className="text-red-500">*</span>
          </label>
          <input
            id="email" name="email" type="email" value={form.email} onChange={handleChange}
            required maxLength={254}
            autoComplete="email" autoCapitalize="none" autoCorrect="off"
            placeholder={f.emailPlaceholder}
            className={errors.email ? inputError : inputOk}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone + Service */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.phone}
          </label>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-gray-400 bg-white">
            <span className="flex items-center px-3 text-sm text-gray-500 bg-gray-50 border-r border-gray-200 select-none flex-shrink-0">
              +420
            </span>
            <input
              id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
              maxLength={16} autoComplete="tel-national"
              placeholder="xxx xxx xxx"
              className="flex-1 px-3 py-3.5 text-base sm:text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
            {f.service}
          </label>
          <div className="relative">
            <select
              id="service" name="service" value={form.service} onChange={handleChange}
              className={`${inputOk} pr-10 appearance-none cursor-pointer`}
            >
              <option value="">{f.servicePlaceholder}</option>
              {f.services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {f.message} <span aria-label="povinné" className="text-red-500">*</span>
        </label>
        <textarea
          id="message" name="message" value={form.message} onChange={handleChange}
          required minLength={10} maxLength={1000} rows={4}
          placeholder={f.messagePlaceholder}
          className={`${errors.message ? inputError : inputOk} resize-none`}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        <div className="flex justify-between mt-1">
          {errors.message
            ? <p id="message-error" role="alert" className="text-xs text-red-600">{errors.message}</p>
            : <span />}
          <span className="text-xs text-gray-300">{form.message.length}/1000</span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer text-base sm:text-sm"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        {f.submit}
      </button>

      {/* GDPR notice */}
      <p className="text-center text-xs text-gray-400 leading-relaxed">
        {lang === "cs" ? (
          <>
            Vaše osobní údaje zpracováváme za účelem vyřízení rezervace na základě oprávněného zájmu dle naší{" "}
            <a href="/ochrana-soukromi" className="underline hover:text-gray-600 transition-colors">
              Zásady ochrany soukromí
            </a>
            .
          </>
        ) : (
          <>
            Your personal data is processed for booking purposes based on legitimate interest per our{" "}
            <a href="/ochrana-soukromi" className="underline hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
