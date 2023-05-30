import * as Yup from "yup";

export type LoginFormValues = {
  username: string;
  hashedPassword: string;
};

export const loginFormSchema = Yup.object().shape({
  username: Yup.string().required("Username field is required"),
  hashedPassword: Yup.string().required("Password field is required"),
});
