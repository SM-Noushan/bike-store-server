import status from "http-status";
import AppError from "../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import catchAsync from "../utils/catchAsync";
import decodeToken from "../utils/decodeToken";
import { TUserRole } from "../user/user.interface";
import { NextFunction, Request, Response } from "express";

const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // if token is present
    if (!token) throw new AppError(status.UNAUTHORIZED, "Unauthorized access");

    const decoded = decodeToken(token) as JwtPayload;

    const { email, role } = decoded;
    // validate user => check if user exists, is authorized, is deleted, is blocked
    await User.validateUser({
      payload: { email, password: "" },
    });
    //   check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(role))
      throw new AppError(status.FORBIDDEN, "Forbidden access");

    req.user = decoded;
    next();
  });

export default auth;
