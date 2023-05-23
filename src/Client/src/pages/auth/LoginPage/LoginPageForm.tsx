import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../components/forms/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "./loginFormSchema";
import { useAuthLogin } from "../../../api/auth/api";

export function LoginPageForm() {
  const login = useAuthLogin();

  const methods = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  const { handleSubmit, formState, reset } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
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

        <Button
          variant="primary"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Log in
        </Button>
      </Form>
    </FormProvider>
  );

  function onSubmitHandler(data: any) {
    login.mutate(data);
    reset();
  }
}
