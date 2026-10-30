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

type EnquiryFormProps = {
  idPrefix?: string;
};

export function EnquiryForm({ idPrefix = "d1" }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [done, setDone] = useState(false);

  const set = (key: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  if (done) {
    return (
      <div className="rounded-lg border border-[#d9e4c8] bg-[#f4f8ec] p-5" role="status">
        <h3 className="font-heading text-xl font-semibold text-[#1B365D]">Thank you.</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#314056]">
          A travel specialist will call you shortly. This is a preview form, so nothing was sent.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-[#1B365D] underline"
          onClick={() => {
            setValues(emptyEnquiry);
            setErrors({});
            setDone(false);
          }}
        >
          Send another enquiry
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
        <input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => set("name", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${idPrefix}-phone`} label="Phone" error={errors.phone}>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="98XXXXXX10"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            className={inputClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
          />
        </Field>
        <Field id={`${idPrefix}-city`} label="City" error={errors.city}>
          <input
            id={`${idPrefix}-city`}
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => set("city", event.target.value)}
            className={inputClass}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? `${idPrefix}-city-error` : undefined}
          />
        </Field>
      </div>
      <Field id={`${idPrefix}-travellers`} label="Travellers" error={errors.travellers}>
        <select
          id={`${idPrefix}-travellers`}
          name="travellers"
          value={values.travellers}
          onChange={(event) => set("travellers", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.travellers)}
          aria-describedby={errors.travellers ? `${idPrefix}-travellers-error` : undefined}
        >
          {travellers.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id={`${idPrefix}-message`} label="Message" error={errors.message}>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => set("message", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
        />
      </Field>
      <p className="text-xs text-[#5d6b7c]">We use these details only to respond to your enquiry.</p>
      <button
        type="submit"
        className="rounded-lg bg-[#F28C28] px-5 py-3 text-sm font-semibold text-[#1B365D] hover:bg-[#ffb15c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B365D]"
      >
        Request a callback
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1B365D]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-[#9b2c2c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#d5deea] bg-white px-3 py-2.5 text-sm text-[#1c2838] outline-none focus-visible:border-[#1B365D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#1B365D]";
