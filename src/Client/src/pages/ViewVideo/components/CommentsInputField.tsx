import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../components/forms/InputField";
import { useAuthenticatedUser } from "../../../api/auth/api";
import { useCreateVideoComment } from "../../../api/videoComments/api";
import { VideoCommentForm } from "../../../api/videoComments/types";

type Props = {
  videoId: string;
};

export function CommentsInputField({ videoId }: Props) {
  const user = useAuthenticatedUser();
  const submitComment = useCreateVideoComment();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const disabled = !user || user.isLoading || submitComment.isLoading;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          name="comment"
          as="textarea"
          className="mb-2"
          placeholder="Write your comment"
          disabled={disabled}
        />

        <Button variant="primary" type="submit" disabled={disabled}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );

  function handleFormSubmit(data: any) {
    const request: VideoCommentForm = {
      videoId: videoId,
      authorId: user.data?.id ?? "",
      comment: data.comment,
    };

    submitComment.mutate(request, { onSuccess: () => reset() });
  }
}
