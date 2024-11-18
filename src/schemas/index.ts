import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  name: z.string().min(3, {
    message: "Name is required!",
  }),

  role: z.enum(["ADMIN", "USER"], {
    errorMap: () => ({ message: "Select a role!" }),
  }),
});

export type RegisterProps = z.infer<typeof RegisterSchema>;

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export type ResetProps = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required!",
  }),
});

export type NewPasswordProps = z.infer<typeof NewPasswordSchema>;
// export type UserRole = "ADMIN" | "USER" | "SUPERUSER";

const phoneRegex = /^[6-9]\d{9}$/;

export const pickupSchema = z.object({
  date: z.date(),
  contactNo: z.string().regex(phoneRegex, "Invalid Indian phone number"),
  contactPerson: z.string().min(2, "Contact person is required"),
  address: z.string().min(5, "Address is required"),
  itemCount: z
    .number()
    .int()
    .positive("Number of items must be positive")
    .min(1, "At least one item is required"),
  remarks: z.string().optional(),
});

export type PickupFormValues = z.infer<typeof pickupSchema>;

export const scanningSchema = z.object({
  date: z.date(),
  contactNo: z.string().regex(phoneRegex, "Invalid Indian phone number"),
  contactPerson: z.string().min(2, "Contact person is required"),
  documentType: z.enum(["PAPER", "BOOK", "PHOTO"]),
  pageCount: z
    .number()
    .int()
    .positive("Number of items must be positive")
    .min(1, "At least one item is required"),
  scanResolution: z.enum(["LOW", "MEDIUM", "HIGH"]),
  remarks: z.string().optional(),
});

export type ScanningFormValues = z.infer<typeof scanningSchema>;

export const retrievalSchema = z.object({
  date: z.date(),
  contactNo: z.string().regex(phoneRegex, "Invalid Indian phone number"),
  contactPerson: z.string().min(2, "Contact person is required"),
  fileType: z.enum(["BOX", "FILE", "OTHER"]),
  retrievalMethod: z.enum(["DELIVERY", "PICKUP"]),
  itemIdentifier: z.string().min(1, "Item identifier is required"),
  remarks: z.string().optional(),
});

export type RetrievalFormValues = z.infer<typeof retrievalSchema>;

export const shredSchema = z.object({
  date: z.date(),
  contactPerson: z.string().min(2, "Contact person is required"),
  contactNo: z.string().regex(phoneRegex, "Invalid Indian phone number"),
  shredLocation: z.enum(["ON_SITE", "OFF_SITE"]),
  itemCount: z.number().min(1, "At least one item is required"),
  itemType: z.enum(["PAPER", "HARD_DRIVE", "OTHER"]),
  certificateRequired: z.boolean(),
  remarks: z.string().optional(),
});

export type ShredFormValues = z.infer<typeof shredSchema>;
