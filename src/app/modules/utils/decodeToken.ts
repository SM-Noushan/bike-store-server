import jwt from "jsonwebtoken";
import status from "http-status";
import config from "../../config";
import AppError from "../errors/AppError";

const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    return decoded;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }
};

export default decodeToken;
