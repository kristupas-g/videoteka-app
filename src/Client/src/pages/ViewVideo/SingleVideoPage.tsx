import { useParams } from "react-router-dom";
import {
  useRecommendedVideos,
  useSingleVideo,
  useUpdateVideoViews,
} from "../../api/videos/api";
import { Col, Row, Spinner, Stack } from "react-bootstrap";
import { UploaderContainer } from "./components/UploaderContainer";
import { VideoContainer } from "./components/VideoContainer";
import { MetadataContainer } from "./components/MetadataContainer";
import { useMemo } from "react";
import { CommentsContainer } from "./components/CommentsContainer";
import { VideoCard } from "../../components/videos/VideoCard";
import { RecommendedVideosContainer } from "./components/RecommendedVideosContainer";

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
    <Row>
      <Col lg={{ order: 2 }} className="mb-4">
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
            <h5>Comments</h5>
            <CommentsContainer videoId={video.data?.id ?? ""} />
          </div>
        </Stack>
      </Col>
      <Col lg={{ order: 1, span: 3 }}>
        <h5 className="mb-4">Recommended for you</h5>
        <RecommendedVideosContainer videoId={video.data?.id ?? ""} />
      </Col>
    </Row>
  );
}
