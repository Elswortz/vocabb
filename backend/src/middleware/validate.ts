import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestPart = "query" | "body" | "params";

export const validate = (schema: ZodType, part: RequestPart) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      res.status(400).json({
        message: `Invalid request ${part}`,
        errors: result.error.flatten().fieldErrors,
      });

      return;
    }

    res.locals[part] = result.data;

    next();
  };
};
