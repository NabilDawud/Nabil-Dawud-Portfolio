export interface CVRequestPayload {
  fullName: string;
  email: string;
  purpose: string;
  organization?: string;
  _hp_website?: string;
}

export interface CVRequestValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    fullName: string;
    email: string;
    purpose: string;
    organization?: string;
    _hp_website?: string;
  };
}

const MESSAGES = {
  en: {
    nameRequired: "Full name is required",
    nameMin: "Name must be at least 2 characters",
    nameMax: "Name must be at most 100 characters",
    emailRequired: "Email address is required",
    emailInvalid: "Please enter a valid email address",
    purposeRequired: "Purpose of request is required",
    purposeMin: "Purpose must be at least 5 characters",
    purposeMax: "Purpose must be at most 500 characters",
    organizationMax: "Organization must be at most 100 characters",
  },
  ar: {
    nameRequired: "الاسم الكامل مطلوب",
    nameMin: "يجب أن يتكون الاسم من حرفين على الأقل",
    nameMax: "يجب ألا يتجاوز الاسم 100 حرف",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح",
    purposeRequired: "سبب الطلب مطلوب",
    purposeMin: "يجب أن يتكون سبب الطلب من 5 أحرف على الأقل",
    purposeMax: "يجب ألا يتجاوز سبب الطلب 500 حرف",
    organizationMax: "يجب ألا تتجاوز المؤسسة 100 حرف",
  },
} as const;

// RFC-compliant email regex matching existing contact validator
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function sanitizeSingleLine(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

function sanitizeMultiLine(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

export function validateCVRequestPayload(
  payload: unknown,
  locale: "en" | "ar" = "en"
): CVRequestValidationResult {
  const dict = MESSAGES[locale] || MESSAGES.en;
  const errors: Record<string, string> = {};

  if (!payload || typeof payload !== "object") {
    return {
      isValid: false,
      errors: {
        fullName: dict.nameRequired,
        email: dict.emailRequired,
        purpose: dict.purposeRequired,
      },
    };
  }

  const raw = payload as Record<string, unknown>;
  const fullName = sanitizeSingleLine(raw.fullName);
  const email = sanitizeSingleLine(raw.email);
  const purpose = sanitizeMultiLine(raw.purpose);
  const organizationRaw = raw.organization ? sanitizeSingleLine(raw.organization) : undefined;
  const hp = typeof raw._hp_website === "string" ? raw._hp_website : undefined;

  // 1. Full Name
  if (!fullName) {
    errors.fullName = dict.nameRequired;
  } else if (fullName.length < 2) {
    errors.fullName = dict.nameMin;
  } else if (fullName.length > 100) {
    errors.fullName = dict.nameMax;
  }

  // 2. Email Address
  if (!email) {
    errors.email = dict.emailRequired;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = dict.emailInvalid;
  }

  // 3. Purpose
  if (!purpose) {
    errors.purpose = dict.purposeRequired;
  } else if (purpose.length < 5) {
    errors.purpose = dict.purposeMin;
  } else if (purpose.length > 500) {
    errors.purpose = dict.purposeMax;
  }

  // 4. Organization (Optional, max 100 chars)
  if (organizationRaw && organizationRaw.length > 100) {
    errors.organization = dict.organizationMax;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitized: isValid
      ? {
          fullName,
          email,
          purpose,
          organization: organizationRaw || undefined,
          _hp_website: hp,
        }
      : undefined,
  };
}
