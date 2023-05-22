import { Col, Row, Spinner } from "react-bootstrap";
import { useVideos } from "../api/videos/api";
import { VideoCard } from "../components/videos/VideoCard";

export function NewestVideosPage() {
  const videos = useVideos();
  const videoList = videos.data ?? [];

  if (videos.isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Newest Videos</h2>

      <Row>
        {videoList.map((video) => (
          <Col xs sm={6} md={4} xl={3}>
            <VideoCard data={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
