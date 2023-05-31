import * as Yup from "yup";

export type SignupFormValues = {
  username: string;
  hashedPassword: string;
};

export const signupFormSchema = Yup.object<SignupFormValues>().shape({
  username: Yup.string().required("Username field is required"),
  hashedPassword: Yup.string().required("Password field is required"),
});
