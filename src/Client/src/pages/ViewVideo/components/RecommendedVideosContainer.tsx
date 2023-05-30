import { Col, Row, Spinner } from "react-bootstrap";
import { useRecommendedVideos } from "../../../api/videos/api";
import { VideoCard } from "../../../components/videos/VideoCard";

type Props = {
  videoId: string;
};

export function RecommendedVideosContainer({ videoId }: Props) {
  const recommendedVideos = useRecommendedVideos(videoId);

  if (recommendedVideos.isLoading) {
    return <Spinner />;
  }

  if (recommendedVideos.data?.length === 0) {
    return <span>No recommended videos yet.</span>;
  }

  return (
    <Row>
      {recommendedVideos.data?.map((x) => (
        <Col xs={12} sm={6} lg={12} className="mb-3">
          <VideoCard key={x.id} data={x} />
        </Col>
      ))}
    </Row>
  );
}
