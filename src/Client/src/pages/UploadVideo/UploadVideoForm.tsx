import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import {
  UploadVideoFormValues,
  uploadVideoFormSchema,
} from "./uploadVideoFormSchema";
import InputField from "../../components/forms/InputField";
import { useUploadVideo } from "../../api/videos/api";
import { LoadingButton } from "../../components/LoadingButton";
import { useNavigate } from "react-router-dom";

export function UploadVideoForm() {
  const navigate = useNavigate();
  const uploadVideo = useUploadVideo();

  const methods = useForm<UploadVideoFormValues>({
    mode: "onChange",
    resolver: yupResolver(uploadVideoFormSchema),
  });
  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <InputField label="Name:" name="name" type="text" styles="mb-3" />
        <InputField
          label="Description:"
          name="description"
          styles="mb-3"
          as="textarea"
        />
        <InputField label="File:" name="file" type="file" styles="mb-3" />

        <LoadingButton
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          Upload
        </LoadingButton>
      </Form>
    </FormProvider>
  );

  async function submitHandler(data: UploadVideoFormValues) {
    await uploadVideo.mutateAsync(data, { onSuccess: () => navigate("/") });
  }
}
