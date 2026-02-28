export const createError = (message, status = 500, code = null) => {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  return err;
};