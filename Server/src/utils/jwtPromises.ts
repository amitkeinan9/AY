import jwt, {
  JwtPayload,
  Secret,
  VerifyErrors,
  VerifyOptions,
} from "jsonwebtoken";

export const jwtVerify = (token: string, secret: Secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      (error: VerifyErrors, data: string | JwtPayload) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
