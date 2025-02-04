import { z } from "zod";
import { trimmedString } from "../utils/validation";

const loginValidationSchema = z.object({
  body: z.object({
    email: trimmedString.email(),
    password: z.string(),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: trimmedString,
    email: trimmedString.email(),
    password: z.string(),
  }),
});

const passwordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  passwordValidationSchema,
};
