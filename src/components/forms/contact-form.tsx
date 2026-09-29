"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import {
  initialContactFormState,
  type ContactFieldName,
  type ContactFormState,
} from "@/features/contact/model/contact";
import { submitContactForm } from "@/features/contact/server/submit-contact";
import { cn } from "@/lib/utils/cn";

const inputClassName =
  "border-border bg-surface text-foreground placeholder:text-muted-foreground focus-visible:ring-focus-ring min-h-11 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

function firstError(state: ContactFormState, field: ContactFieldName) {
  return state.fieldErrors?.[field]?.[0];
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message: string | undefined;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm" id={id} role="alert">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-foreground text-background inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      type="submit"
    >
      {pending ? "Envoi en cours…" : "Envoyer la demande"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const fullNameError = firstError(state, "fullName");
  const emailError = firstError(state, "email");
  const organizationError = firstError(state, "organization");
  const phoneError = firstError(state, "phone");
  const messageError = firstError(state, "message");
  const privacyError = firstError(state, "privacyAccepted");

  return (
    <form
      action={formAction}
      className="space-y-6"
      noValidate
      ref={formRef}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Site internet</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="fullName">
          Nom complet
        </label>
        <input
          aria-describedby={fullNameError ? "fullName-error" : undefined}
          aria-invalid={Boolean(fullNameError)}
          autoComplete="name"
          className={inputClassName}
          id="fullName"
          name="fullName"
          type="text"
        />
        <FieldError id="fullName-error" message={fullNameError} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          aria-describedby={emailError ? "email-error" : undefined}
          aria-invalid={Boolean(emailError)}
          autoComplete="email"
          className={inputClassName}
          id="email"
          name="email"
          type="email"
        />
        <FieldError id="email-error" message={emailError} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="organization"
          >
            Organisation
          </label>
          <input
            aria-describedby={
              organizationError ? "organization-error" : undefined
            }
            aria-invalid={Boolean(organizationError)}
            autoComplete="organization"
            className={inputClassName}
            id="organization"
            name="organization"
            type="text"
          />
          <FieldError id="organization-error" message={organizationError} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium" htmlFor="phone">
            Téléphone
          </label>
          <input
            aria-describedby={phoneError ? "phone-error" : undefined}
            aria-invalid={Boolean(phoneError)}
            autoComplete="tel"
            className={inputClassName}
            id="phone"
            name="phone"
            type="tel"
          />
          <FieldError id="phone-error" message={phoneError} />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium" htmlFor="message">
          Votre demande
        </label>
        <textarea
          aria-describedby={messageError ? "message-error" : undefined}
          aria-invalid={Boolean(messageError)}
          className={cn(inputClassName, "min-h-40 resize-y")}
          id="message"
          name="message"
        />
        <FieldError id="message-error" message={messageError} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm" htmlFor="privacy">
          <input
            aria-describedby={privacyError ? "privacy-error" : undefined}
            aria-invalid={Boolean(privacyError)}
            className="mt-1 size-4"
            id="privacy"
            name="privacyAccepted"
            type="checkbox"
          />
          <span>
            J’accepte que les informations saisies soient utilisées uniquement
            pour répondre à ma demande.
          </span>
        </label>
        <FieldError id="privacy-error" message={privacyError} />
      </div>

      {state.status !== "idle" && state.message ? (
        <div
          className="border-border bg-surface-muted rounded-md border p-4 text-sm"
          role={state.status === "success" ? "status" : "alert"}
        >
          {state.message}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
