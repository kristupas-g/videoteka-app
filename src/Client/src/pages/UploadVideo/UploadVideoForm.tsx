import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { uploadVideoFormSchema } from "./uploadVideoFormSchema";
import InputField from "../../components/forms/InputField";
import { useUploadVideo } from "../../api/videos/api";

export function UploadVideoForm() {
  const uploadVideo = useUploadVideo();

  const methods = useForm({
    resolver: yupResolver(uploadVideoFormSchema),
  });
  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField label="Name:" name="name" type="text" styles="mb-3" />
        <InputField
          label="Description:"
          name="description"
          styles="mb-3"
          as="textarea"
        />
        <InputField label="File:" name="file" type="file" styles="mb-3" />

        <Button
          variant="primary"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Upload
        </Button>
      </Form>
    </FormProvider>
  );

  function handleFormSubmit(data: any) {
    uploadVideo.mutate(data);
  }
}
