import { TUserRole } from "./user.interface";

export const USER_ROLE = {
  customer: "customer",
  admin: "admin",
} as const;

export const UserRoleEnum: TUserRole[] = Object.values(USER_ROLE);
