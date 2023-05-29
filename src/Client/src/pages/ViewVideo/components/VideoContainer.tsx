type Props = {
  videoId: string;
};

export function VideoContainer({ videoId }: Props) {
  return (
    <video
      width="100%"
      height="500"
      controls
      style={{ backgroundColor: "black" }}
    >
      <source src={getPath(videoId)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function getPath(id: string) {
  return `https://videotekamediacdn.azureedge.net/videotekacontainer/${id}`;
}
