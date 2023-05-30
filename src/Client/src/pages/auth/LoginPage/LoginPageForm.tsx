import { Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../components/forms/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "./loginFormSchema";
import { useAuthLogin } from "../../../api/auth/api";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../../../components/LoadingButton";

export function LoginPageForm() {
  const login = useAuthLogin();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
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
          Log in
        </LoadingButton>
      </Form>
    </FormProvider>
  );

  async function submitHandler(data: any) {
    await login.mutateAsync(data, {
      onSuccess: () => navigate("/"),
    });
  }
}
