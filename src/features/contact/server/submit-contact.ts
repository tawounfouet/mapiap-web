"use server";

import {
  contactFormSchema,
  type ContactFieldErrors,
  type ContactFormInput,
  type ContactFormState,
} from "@/features/contact/model/contact";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function toCandidate(formData: FormData) {
  return {
    fullName: readString(formData, "fullName"),
    email: readString(formData, "email"),
    organization: readString(formData, "organization"),
    phone: readString(formData, "phone"),
    message: readString(formData, "message"),
    privacyAccepted: formData.get("privacyAccepted") === "on",
    website: readString(formData, "website"),
  };
}

async function deliverContactRequest(input: ContactFormInput) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!endpoint) {
    return {
      status: "unavailable" as const,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        source: "mapiap-web",
        submittedAt: new Date().toISOString(),
        contact: {
          fullName: input.fullName,
          email: input.email,
          organization: input.organization || undefined,
          phone: input.phone || undefined,
          message: input.message,
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return {
        status: "error" as const,
      };
    }

    return {
      status: "success" as const,
    };
  } catch {
    return {
      status: "error" as const,
    };
  }
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = contactFormSchema.safeParse(toCandidate(formData));

  if (!result.success) {
    return {
      status: "invalid",
      message: "Vérifiez les champs signalés puis réessayez.",
      fieldErrors: result.error.flatten().fieldErrors as ContactFieldErrors,
    };
  }

  if (result.data.website) {
    return {
      status: "success",
      message: "Votre demande a été prise en compte.",
    };
  }

  const delivery = await deliverContactRequest(result.data);

  if (delivery.status === "unavailable") {
    return {
      status: "unavailable",
      message:
        "Le formulaire est validé, mais l’envoi n’est pas encore configuré. Aucun message n’a été transmis.",
    };
  }

  if (delivery.status === "error") {
    return {
      status: "error",
      message:
        "L’envoi n’a pas abouti. Aucun succès n’est enregistré ; réessayez ultérieurement.",
    };
  }

  return {
    status: "success",
    message: "Votre message a bien été transmis à MAPIAP.",
  };
}
