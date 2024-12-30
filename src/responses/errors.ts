export type ErrorType = {
  code: number;
  message: string;
};

export const errors: { [key: string]: ErrorType } = Object.freeze({
  BadRequestError: { code: 400, message: 'Invalid request' },
  UnauthorizedError: { code: 401, message: 'Unauthorized' },
  ForbiddenError: { code: 403, message: 'Forbidden' },
  NotFoundError: { code: 404, message: 'Not found' },
  TimeoutError: { code: 408, message: 'Timeout' },
  ConflictError: { code: 409, message: 'Conflict: Resource already exists' },
  UnexpectedError: { code: 500, message: 'Unexpected Error' },
});
