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
  "w-full rounded-2xl border-2 border-[#e4e6f2] bg-white px-4 py-3 text-sm font-medium text-[#161326] outline-none focus-visible:border-[#6C4CF1]";

export function EnquiryForm({ idPrefix = "d3" }: { idPrefix?: string }) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [done, setDone] = useState(false);

  const set = (key: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  if (done) {
    return (
      <div role="status" className="rounded-3xl bg-[#161326] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-[#FFD23F]">You are on the list</p>
        <h3 className="mt-2 font-heading text-3xl font-extrabold">Thank you.</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          A travel specialist will call you shortly. This preview stays in the browser.
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-[#FFD23F] px-4 py-2 text-sm font-extrabold text-[#161326]"
          onClick={() => {
            setValues(emptyEnquiry);
            setErrors({});
            setDone(false);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
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
      <div className="grid gap-4 sm:grid-cols-2">
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
        <textarea id={`${idPrefix}-message`} name="message" rows={4} value={values.message} onChange={(event) => set("message", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined} />
      </Field>
      <p className="text-xs font-medium text-[#5c5670]">We use this only to call you back.</p>
      <button type="submit" className="rounded-full bg-gradient-to-r from-[#0E8C82] to-[#5A3AD6] px-6 py-3.5 text-sm font-extrabold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#161326]">
        Enquire Now
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-[#161326]">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-[#9b2c2c]">{error}</p> : null}
    </div>
  );
}
