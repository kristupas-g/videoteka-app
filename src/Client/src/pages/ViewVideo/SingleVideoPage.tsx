import { useParams } from "react-router-dom";
import { useSingleVideo } from "../../api/videos/api";
import { Spinner } from "react-bootstrap";

export function SingleVideoPage() {
  const { id } = useParams();
  const video = useSingleVideo(id ?? "");

  if (video.isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <VideoContainer />
      <VideoMetadata />
    </div>
  );

  function VideoMetadata() {
    return (
      <div>
        <h2>{video.data?.name}</h2>
      </div>
    );
  }

  function VideoContainer() {
    return (
      <video width="100%" controls>
        <source
          src="https://videotekamediacdn.azureedge.net/videotekacontainer/my_video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    );
  }
}
