import { useParams } from "react-router-dom";
import { useSingleVideo } from "../../api/videos/api";
import { Col, Row, Spinner } from "react-bootstrap";
import { UploaderContainer } from "./components/UploaderContainer";

export function SingleVideoPage() {
  const { id } = useParams();
  const video = useSingleVideo(id ?? "");

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
          <VideoContainer />
          <VideoMetadata />
          <div style={{ marginBottom: 48 }}>
            <h5>Uploader</h5>
            <UploaderContainer userId={video.data?.uploaderId ?? ""} />
          </div>
          <VideoComments />
        </Col>
      </Row>
    </div>
  );

  function VideoComments() {
    return (
      <div>
        <h5>Comments</h5>
      </div>
    );
  }

  function VideoMetadata() {
    return (
      <div style={{ marginBottom: 48 }}>
        <h2>{video.data?.name}</h2>
        <p>{video.data?.description ?? "No description provided"}</p>
      </div>
    );
  }

  function VideoContainer() {
    return (
      <video
        width="100%"
        height="500"
        controls
        style={{ backgroundColor: "black", marginBottom: "16px" }}
      >
        <source
          src={`https://videotekamediacdn.azureedge.net/videotekacontainer/${id}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    );
  }
}
