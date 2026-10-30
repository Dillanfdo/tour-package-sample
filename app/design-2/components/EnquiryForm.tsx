"use client";

import { useState } from "react";
import {
  emptyEnquiry,
  hasErrors,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/enquiry";

const fields: readonly EnquiryField[] = ["name", "phone", "city", "travellers", "message"];

const travellers = [
  { value: "", label: "Select travellers" },
  { value: "1", label: "1 traveller" },
  { value: "2", label: "2 travellers" },
  { value: "3-4", label: "3–4 travellers" },
  { value: "5+", label: "5 or more" },
];

const inputClass =
  "w-full border-0 border-b border-[#cfc4b6] bg-transparent px-0 py-2.5 text-base outline-none focus-visible:border-[#2A2420] focus-visible:outline-none";

export function EnquiryForm({ idPrefix = "d2" }: { idPrefix?: string }) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [done, setDone] = useState(false);

  const set = (key: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  if (done) {
    return (
      <div role="status" className="border-t border-[#2A2420] py-8">
        <h3 className="font-heading text-3xl">Thank you.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5c534c]">
          A specialist will call you shortly. This preview keeps the note on this page and does not send it.
        </p>
        <button
          type="button"
          className="mt-6 text-xs uppercase tracking-[0.16em] text-[#8C3E2C]"
          onClick={() => {
            setValues(emptyEnquiry);
            setErrors({});
            setDone(false);
          }}
        >
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const next = validateEnquiry(values, fields);
        setErrors(next);
        if (!hasErrors(next)) setDone(true);
      }}
    >
      <Field id={`${idPrefix}-name`} label="Name" error={errors.name}>
        <input id={`${idPrefix}-name`} name="name" autoComplete="name" value={values.name} onChange={(event) => set("name", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${idPrefix}-phone`} label="Phone" error={errors.phone}>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(event) => set("phone", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined} />
        </Field>
        <Field id={`${idPrefix}-city`} label="City" error={errors.city}>
          <input id={`${idPrefix}-city`} name="city" autoComplete="address-level2" value={values.city} onChange={(event) => set("city", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? `${idPrefix}-city-error` : undefined} />
        </Field>
      </div>
      <Field id={`${idPrefix}-travellers`} label="Travellers" error={errors.travellers}>
        <select id={`${idPrefix}-travellers`} name="travellers" value={values.travellers} onChange={(event) => set("travellers", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.travellers)} aria-describedby={errors.travellers ? `${idPrefix}-travellers-error` : undefined}>
          {travellers.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </Field>
      <Field id={`${idPrefix}-message`} label="Message" error={errors.message}>
        <textarea id={`${idPrefix}-message`} name="message" rows={3} value={values.message} onChange={(event) => set("message", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined} />
      </Field>
      <p className="text-xs text-[#7a6e64]">Used only to answer this enquiry.</p>
      <button type="submit" className="justify-self-start border border-[#2A2420] px-6 py-3 text-xs uppercase tracking-[0.18em] transition hover:bg-[#2A2420] hover:text-[#FAF7F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5543A]">
        Enquire now
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-[#8C3E2C]">
        {label}
      </label>
      {children}
      {error ? <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-[#8C3E2C]">{error}</p> : null}
    </div>
  );
}
