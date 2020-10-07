import * as yup from "yup";

const checkName: yup.TestFunction<
  string | null | undefined,
  object
> = async function (name) {
  const { db } = this.options.context as Express.RequestContext;
  const user = await db.user.findOne({ where: { name: name! } });
  if (user) return false;
  return true;
};

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(5)
    .max(100)
    .lowercase()
    .required("Username is a manadatory field")
    .test("usernameTaken", "username already taken", checkName),
  email: yup.string().trim().lowercase().min(3).max(100).email().required(),
});
