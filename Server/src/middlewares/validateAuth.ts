import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtVerify } from "../utils/jwtPromises";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ApiError } from "../errors/ApiError";

export interface AuthRequest extends Request {
  user?: { _id: string };
}

const validateAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    if (token == null) throw new UnauthorizedError("Missing access token");

    const user = await jwtVerify(token, process.env.JWT_SECRET!);
    req.user = user as { _id: string };

    next();
  } catch (err) {
    if (err instanceof ApiError) {
      next(err);
    } else {
      next(new UnauthorizedError("Invalid access token"));
    }
  }
};

export default validateAuth;
