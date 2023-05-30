import { Spinner, Stack } from "react-bootstrap";
import { useVideoComments } from "../../../api/videos/api";
import { CommentsInputField } from "./CommentsInputField";
import { CommentRow } from "./CommentRow";

type Props = {
  videoId: string;
};

export function CommentsContainer({ videoId }: Props) {
  const comments = useVideoComments(videoId);

  if (comments.isLoading) {
    return <Spinner />;
  }

  if (comments.data?.length === 0) {
    return (
      <Stack gap={3}>
        <CommentsInputField videoId={videoId} />
        <span>No comments posted yet.</span>
      </Stack>
    );
  }

  return (
    <Stack gap={3}>
      <CommentsInputField videoId={videoId} />

      {comments.data?.map((row) => (
        <CommentRow key={row.id} row={row} />
      ))}
    </Stack>
  );
}
