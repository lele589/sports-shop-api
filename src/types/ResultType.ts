import { ErrorType } from '../responses/errors';

export type ResultType<T> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: ErrorType };
