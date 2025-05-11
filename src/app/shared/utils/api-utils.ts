import { ApiErrorResp } from '../models';

export const isApiErrorResponse = (x: unknown | ApiErrorResp): x is ApiErrorResp => {
  return (
    !!x &&
    (x as ApiErrorResp).detail !== undefined &&
    (x as ApiErrorResp).title !== undefined &&
    (x as ApiErrorResp).status !== undefined &&
    (x as ApiErrorResp).success === false
  );
};
