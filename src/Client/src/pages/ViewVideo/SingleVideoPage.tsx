import { useParams } from "react-router-dom";
import { useSingleVideo, useUpdateVideoViews } from "../../api/videos/api";
import { Col, Row, Spinner, Stack } from "react-bootstrap";
import { UploaderContainer } from "./components/UploaderContainer";
import { VideoContainer } from "./components/VideoContainer";
import { MetadataContainer } from "./components/MetadataContainer";
import { useMemo } from "react";

export function SingleVideoPage() {
  const { id } = useParams();
  const video = useSingleVideo(id ?? "");
  const updateViews = useUpdateVideoViews(id ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => updateViews.mutate(), [video.data?.name]);

  if (video.isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Row>
        <Col lg={3}>
          <h5>Recommended for you</h5>
        </Col>
        <Col>
          <Stack gap={4}>
            <VideoContainer videoId={video.data?.id ?? ""} />

            <div>
              <MetadataContainer videoId={video.data?.id ?? ""} />
            </div>

            <div>
              <h5>Uploaded by</h5>
              <UploaderContainer userId={video.data?.uploaderId ?? ""} />
            </div>

            <div>
              <VideoComments />
            </div>
          </Stack>
        </Col>
      </Row>
    </div>
  );

  function VideoComments() {
    return (
      <div>
        <h5>Comments (5)</h5>
        <Spinner />
      </div>
    );
  }
}
