import { useSingleVideo } from "../../../api/videos/api";

type Props = {
  videoId: string;
};

export function VideoContainer({ videoId }: Props) {
  const video = useSingleVideo(videoId);

  return (
    <video
      width="100%"
      height="500"
      controls
      style={{ backgroundColor: "black" }}
    >
      <source src={video.data?.videoUrl ?? ""} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
