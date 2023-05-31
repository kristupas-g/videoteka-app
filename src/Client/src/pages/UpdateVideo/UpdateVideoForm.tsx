import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import InputField from "../../components/forms/InputField";
import { useSingleVideo, useUpdateVideo } from "../../api/videos/api";
import { LoadingButton } from "../../components/LoadingButton";
import { useNavigate } from "react-router-dom";
import { UpdateVideoFormValues, updateVideoFormSchema } from "./UpdateVideoFormSchema";

export function UpdateVideoForm({id}: {id?:string}) {
    
  const navigate = useNavigate();
  const updatedVideo = useUpdateVideo();
  const video = useSingleVideo(id ?? "");

  const methods = useForm<UpdateVideoFormValues>({
    mode: "onChange",
    resolver: yupResolver(updateVideoFormSchema),
  });
  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <InputField label="Name:" name="name" type="text" styles="mb-3" defaultValue = {video.data?.name} />
        <InputField
          label="Description:"
          defaultValue={video.data?.description}
          name="description"
          styles="mb-3"
          as="textarea"
        />

        <LoadingButton
          type="submit"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          Update
        </LoadingButton>
      </Form>
    </FormProvider>
  );

  async function submitHandler(data: UpdateVideoFormValues) {
    const updatedData = {
      id: video.data?.id,
      name: data.name || video.data?.name || "", 
      description: data.description || video.data?.description || "",
    };

    await updatedVideo.mutateAsync(updatedData,  { onSuccess: () => navigate("/profile") });
  }
}