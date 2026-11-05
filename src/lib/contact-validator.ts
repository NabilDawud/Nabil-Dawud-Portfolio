export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp_website?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    message: string;
    _hp_website?: string;
  };
}

const MESSAGES = {
  en: {
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    nameMax: "Name must be at most 100 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    subjectRequired: "Subject is required",
    subjectMin: "Subject must be at least 3 characters",
    subjectMax: "Subject must be at most 200 characters",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    messageMax: "Message must be at most 5000 characters",
  },
  ar: {
    nameRequired: "الاسم مطلوب",
    nameMin: "يجب أن يتكون الاسم من حرفين على الأقل",
    nameMax: "يجب ألا يتجاوز الاسم 100 حرف",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح",
    subjectRequired: "الموضوع مطلوب",
    subjectMin: "يجب أن يتكون الموضوع من 3 أحرف على الأقل",
    subjectMax: "يجب ألا يتجاوز الموضوع 200 حرف",
    messageRequired: "الرسالة مطلوبة",
    messageMin: "يجب أن تتكون الرسالة من 10 أحرف على الأقل",
    messageMax: "يجب ألا تتجاوز الرسالة 5000 حرف",
  },
} as const;

// Strict RFC-compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function sanitizeSingleLine(str: unknown): string {
  if (typeof str !== "string") return "";
  // Strip all ASCII control characters [\x00-\x1F\x7F]
  return str.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

function sanitizeMultiLine(str: unknown): string {
  if (typeof str !== "string") return "";
  // Strip control characters except newline (\n), carriage return (\r), and tab (\t)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

export function validateContactPayload(
  body: unknown,
  locale: "en" | "ar" = "en"
): ValidationResult {
  const dict = MESSAGES[locale] || MESSAGES.en;
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return {
      isValid: false,
      errors: {
        name: dict.nameRequired,
        email: dict.emailRequired,
        subject: dict.subjectRequired,
        message: dict.messageRequired,
      },
    };
  }

  const raw = body as Record<string, unknown>;

  const name = sanitizeSingleLine(raw.name);
  const email = sanitizeSingleLine(raw.email);
  const subject = sanitizeSingleLine(raw.subject);
  const message = sanitizeMultiLine(raw.message);
  const hpWebsite = raw._hp_website ? sanitizeSingleLine(raw._hp_website) : undefined;

  // Name validation
  if (!name) {
    errors.name = dict.nameRequired;
  } else if (name.length < 2) {
    errors.name = dict.nameMin;
  } else if (name.length > 100) {
    errors.name = dict.nameMax;
  }

  // Email validation
  if (!email) {
    errors.email = dict.emailRequired;
  } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = dict.emailInvalid;
  }

  // Subject validation
  if (!subject) {
    errors.subject = dict.subjectRequired;
  } else if (subject.length < 3) {
    errors.subject = dict.subjectMin;
  } else if (subject.length > 200) {
    errors.subject = dict.subjectMax;
  }

  // Message validation
  if (!message) {
    errors.message = dict.messageRequired;
  } else if (message.length < 10) {
    errors.message = dict.messageMin;
  } else if (message.length > 5000) {
    errors.message = dict.messageMax;
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: {},
    sanitized: {
      name,
      email,
      subject,
      message,
      ...(hpWebsite !== undefined ? { _hp_website: hpWebsite } : {}),
    },
  };
}
