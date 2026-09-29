import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(120, "Le nom est trop long."),
  email: z
    .string()
    .trim()
    .email("Indiquez une adresse email valide.")
    .max(254, "L’adresse email est trop longue."),
  organization: z
    .string()
    .trim()
    .max(160, "Le nom de l’organisation est trop long.")
    .optional(),
  phone: z
    .string()
    .trim()
    .max(30, "Le numéro de téléphone est trop long.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre demande en au moins 20 caractères.")
    .max(4000, "Le message est trop long."),
  privacyAccepted: z.boolean().refine((value) => value, {
    message:
      "Confirmez l’utilisation de ces informations pour répondre à votre demande.",
  }),
  website: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFieldName =
  | "fullName"
  | "email"
  | "organization"
  | "phone"
  | "message"
  | "privacyAccepted";

export type ContactFieldErrors = Partial<
  Record<ContactFieldName, readonly string[]>
>;

export type ContactFormStatus =
  "idle" | "invalid" | "unavailable" | "error" | "success";

export interface ContactFormState {
  status: ContactFormStatus;
  message?: string;
  fieldErrors?: ContactFieldErrors;
}

export const initialContactFormState: ContactFormState = {
  status: "idle",
};
