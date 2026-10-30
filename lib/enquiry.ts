export type EnquiryValues = {
  name: string;
  phone: string;
  city: string;
  travellers: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues;

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  city: "",
  travellers: "",
  message: "",
};

export function validateEnquiry(
  values: EnquiryValues,
  fields: readonly EnquiryField[],
): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (fields.includes("name") && values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (fields.includes("phone")) {
    const digits = values.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }
  }

  if (fields.includes("city") && values.city.trim().length < 2) {
    errors.city = "Please enter your city.";
  }

  if (fields.includes("travellers") && values.travellers.trim().length === 0) {
    errors.travellers = "Select how many people are travelling.";
  }

  if (fields.includes("message") && values.message.trim().length > 500) {
    errors.message = "Please keep the message under 500 characters.";
  }

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}
