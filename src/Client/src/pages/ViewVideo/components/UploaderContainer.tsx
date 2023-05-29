import { Spinner, Stack } from "react-bootstrap";
import { useUser } from "../../../api/users/api";
import { HiUserCircle } from "react-icons/hi";
import { palette } from "../../../config/palette";

type Props = {
  userId: string;
};

export function UploaderContainer({ userId }: Props) {
  const user = useUser(userId);

  if (user.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Stack gap={2} direction="horizontal">
        <HiUserCircle size={80} color={palette.gray} />

        <Stack className="justify-content-center">
          <p style={{ marginBottom: 0, fontSize: "20px" }}>
            {user.data?.username}
          </p>
          <p
            style={{ marginBottom: 0, fontSize: "14px", color: palette.gray }}
          >{`Joined on ${formatDate(user.data?.created!)}`}</p>
        </Stack>
      </Stack>
    </>
  );
}

function formatDate(date: Date | string) {
  return new Date(date).toISOString().substring(0, 10);
}
