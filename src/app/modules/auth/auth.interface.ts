export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = TLoginUser & {
  name: string;
};

export type TPasswordChange = {
  currentPassword: string;
  newPassword: string;
};
