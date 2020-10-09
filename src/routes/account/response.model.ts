export type ExtractErrors = (res: {
  name: string;
  inner: Array<{ path: string; message: string }>;
}) => { [key: string]: string };

export const extractErrors: ExtractErrors = (res) => {
  if (res.name === "ValidationError") {
    return res.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  }

  return {};
};
