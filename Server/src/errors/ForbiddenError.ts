import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class ForbiddenError extends ApiError {
    constructor(extraDetails: string) {
        super(StatusCodes.FORBIDDEN, "Forbidden", extraDetails);
    }
}
