import { Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../components/forms/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthSignup } from "../../../api/auth/api";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../../../components/LoadingButton";
import { signupFormSchema } from "./signupFormSchema";

export function SignupPageForm() {
  const signup = useAuthSignup();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signupFormSchema),
  });
  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <InputField
          label="Username"
          placeholder="Enter username"
          name="username"
          styles="mb-3"
        />

        <InputField
          type="password"
          label="Password"
          placeholder="Enter password"
          name="hashedPassword"
          styles="mb-3"
        />

        <LoadingButton
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          Register
        </LoadingButton>
      </Form>
    </FormProvider>
  );

  async function submitHandler(data: any) {
    try {
      await signup.mutateAsync(data, {
        onSuccess: () => navigate("/"),
      });
    } catch (error) {
      alert("An error occured. Try again.");
    }
  }
}
