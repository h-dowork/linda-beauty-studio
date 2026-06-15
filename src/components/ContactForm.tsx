"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Copy, Check, ChevronDown } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "success" | "error";

const WA_URL = "https://wa.me/420774109009";

function buildBookingText(fields: {
  name: string; phone: string; email: string; service: string; message: string;
}): string {
  // Strip any accidentally-typed +420 prefix before prepending — the UI already shows it as static text
  const rawPhone = fields.phone.trim().replace(/^\+?420\s*/, "");
  const phone = rawPhone ? `+420 ${rawPhone}` : "";
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
  "w-full px-4 py-3.5 rounded-xl border text-base sm:text-sm text-white placeholder-gray-600 bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#E8933A] transition-colors";
const inputOk    = `${inputBase} border-[#333]`;
const inputError = `${inputBase} border-red-500`;

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

    // Build text + URL synchronously, then open WhatsApp within the user gesture
    const text = buildBookingText(form);
    const url  = `${WA_URL}?text=${encodeURIComponent(text)}`;
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
        <div className="w-16 h-16 bg-green-950/50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" aria-hidden="true" />
        </div>
        <h3
          className="text-xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {f.successHeading}
        </h3>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{f.successBody}</p>

        {/* Copy-paste fallback — shown when WhatsApp app ignores ?text= */}
        <div className="mt-5 w-full text-left bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#1a1a1a]">
            <p className="text-xs text-gray-500">{f.messengerHint}</p>
            <button
              onClick={handleCopy}
              className="ml-3 flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2a2a2a] text-white rounded-lg hover:bg-[#333] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer"
              aria-label={f.copyText}
            >
              {copied
                ? <><Check className="w-3 h-3" aria-hidden="true" />{f.copied}</>
                : <><Copy className="w-3 h-3" aria-hidden="true" />{f.copyText}</>
              }
            </button>
          </div>
          <pre tabIndex={0} className="px-4 py-3 text-xs text-gray-400 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] rounded-b-xl">{text}</pre>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E8933A] text-white text-sm font-semibold rounded-xl hover:bg-[#d4832a] active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {f.openAgain}
          </a>
          <button
            onClick={() => { setStatus("idle"); submittedRef.current = null; setCopied(false); }}
            className="text-sm text-gray-500 underline underline-offset-2 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] rounded py-3 px-2"
          >
            {f.newBooking}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label={t.contact.formHeading}>
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
            {f.phone}
          </label>
          <div className="flex rounded-xl border border-[#333] overflow-hidden focus-within:ring-2 focus-within:ring-[#E8933A] bg-[#222]">
            <span className="flex items-center px-3 text-sm text-gray-500 bg-[#2a2a2a] border-r border-[#333] select-none flex-shrink-0">
              +420
            </span>
            <input
              id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
              maxLength={16} autoComplete="tel-national"
              placeholder="xxx xxx xxx"
              className="flex-1 px-3 py-3.5 text-base sm:text-sm text-white placeholder-gray-600 bg-[#222] focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1.5">
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
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
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
        className="w-full flex items-center justify-center gap-2 py-4 bg-[#E8933A] text-white font-semibold rounded-xl hover:bg-[#d4832a] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] cursor-pointer text-base sm:text-sm"
      >
        <WhatsAppIcon className="w-4 h-4" />
        {f.submit}
      </button>

      {/* GDPR notice */}
      <p className="text-center text-xs text-gray-400 leading-relaxed">
        {lang === "cs" ? (
          <>
            Vaše osobní údaje zpracováváme za účelem vyřízení rezervace na základě oprávněného zájmu dle naší{" "}
            <a href="/ochrana-soukromi" className="underline hover:text-gray-200 transition-colors">
              Zásady ochrany soukromí
            </a>
            .
          </>
        ) : (
          <>
            Your personal data is processed for booking purposes based on legitimate interest per our{" "}
            <a href="/ochrana-soukromi" className="underline hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
