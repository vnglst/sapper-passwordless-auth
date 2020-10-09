import * as yup from "yup";

const checkName: yup.TestFunction<
  string | null | undefined,
  object
> = async function (name) {
  if (!name) return false;
  const { db } = this.options.context as Express.RequestContext;
  const user = await db.user.findOne({ where: { name: name! } });
  if (user) return false;
  return true;
};

const userName = yup
  .string()
  .trim()
  .min(5)
  .max(100)
  .lowercase()
  .required("username is a manadatory field")
  .test("usernameTaken", "username already taken", checkName);

const email = yup
  .string()
  .trim()
  .lowercase()
  .min(3)
  .max(100)
  .required()
  .email();

export const loginSchema = yup.object().shape({ email });

export const registerSchema = yup.object().shape({
  name: userName,
  email,
});

export const tokenSchema = yup
  .object()
  .shape({ token: yup.string().uuid("invalid token") });
