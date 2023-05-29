import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useSingleVideo } from "../../../api/videos/api";
import { Button, Col, Row, Spinner, Stack } from "react-bootstrap";

type Props = {
  videoId: string;
};

export function MetadataContainer({ videoId }: Props) {
  const video = useSingleVideo(videoId);

  if (video.isLoading) {
    return <Spinner />;
  }

  return (
    <Row>
      <Col>
        <h2>{video.data?.name}</h2>
        <p>{video.data?.description ?? "No description provided"}</p>
      </Col>

      <Col md="auto">
        <Stack gap={2} direction="horizontal">
          <IconButton
            variant="primary"
            icon={<AiFillEye size={18} />}
            count={video.data?.views ?? 0}
            text="views"
          />
          <IconButton
            variant="danger"
            icon={<AiFillHeart size={18} />}
            count={0}
            text="likes"
          />
          <IconButton
            variant="success"
            icon={<FaComment size={18} />}
            count={0}
            text="comments"
          />
        </Stack>
      </Col>
    </Row>
  );

  function IconButton({
    variant,
    icon,
    count,
    text,
  }: {
    variant: string;
    icon: React.ReactNode;
    count: number;
    text: string;
  }) {
    return (
      <Button variant={variant}>
        {icon} <span style={{ fontSize: "14px" }}>{`${count} ${text}`}</span>
      </Button>
    );
  }
}
