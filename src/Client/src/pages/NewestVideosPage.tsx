import { Col, Row, Spinner } from "react-bootstrap";
import { useVideos } from "../api/videos/api";
import { VideoCard } from "../components/videos/VideoCard";
import { Video } from "../api/videos/types";

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

      <VideoList list={videoList} />
    </div>
  );
}

function VideoList({ list }: { list: Video[] }) {
  if (list.length === 0) {
    return <p>No videos uploaded yet.</p>;
  }

  return (
    <Row>
      {list.map((video) => (
        <Col key={video.id} xs={12} sm={6} md={4} xl={3} className="mb-3">
          <VideoCard data={video} />
        </Col>
      ))}
    </Row>
  );
}
