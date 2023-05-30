import { Stack } from "react-bootstrap";
import { VideoComment } from "../../../api/videoComments/types";
import { HiUserCircle } from "react-icons/hi";
import { palette } from "../../../config/palette";
import { formatDistanceToNow } from "date-fns";
import { useAuthenticatedUser } from "../../../api/auth/api";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteVideoComment } from "../../../api/videoComments/api";

type Props = {
  row: VideoComment;
};

export function CommentRow({ row }: Props) {
  const user = useAuthenticatedUser();
  const deleteComment = useDeleteVideoComment();

  const isAuthor = user.data?.id === row.authorId;

  return (
    <Stack direction="horizontal" gap={2} className="align-items-start">
      <Stack direction="horizontal" gap={2} className="align-items-start w-100">
        <HiUserCircle size={36} color={palette.gray} />

        <Stack gap={1}>
          <Author />
          <span>{row.comment}</span>
        </Stack>
      </Stack>

      {isAuthor && (
        <AiFillDelete
          size={20}
          color={palette.gray}
          style={{ cursor: "pointer" }}
          onClick={() => deleteComment.mutate(row.id)}
        />
      )}
    </Stack>
  );

  function Author() {
    return (
      <Stack direction="horizontal" gap={2}>
        <span style={{ fontWeight: 600 }}>{row.username}</span>
        <span style={{ color: palette.gray, fontSize: "14px" }}>
          {formatDate(row.created)}
        </span>
      </Stack>
    );
  }

  function formatDate(date: string | Date | number) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }
}
