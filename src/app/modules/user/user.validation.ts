import { z } from "zod";
import { trimmedString } from "./../utils/validation";

const ChangeDeliveryAddressValidationSchema = z.object({
  body: z.object({
    deliveryAddress: trimmedString,
  }),
});

export const UserValidations = {
  ChangeDeliveryAddressValidationSchema,
};
