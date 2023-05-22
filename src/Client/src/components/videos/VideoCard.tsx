import { Card } from "react-bootstrap";
import { Video } from "../../api/videos/types";

type Props = {
  data: Video;
};

export function VideoCard({ data }: Props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          data.thumbnail ??
          "https://1.bp.blogspot.com/-KgVoAl8nfUg/X1D5H6zmA7I/AAAAAAAAB-4/n4u4qHh4kN0a8GToVjveE2gM9oLjR4pVACPcBGAYYCw/w919/lofi-girl-studying-hip-hop-radio-headphone-uhdpaper.com-4K-7.2708-wp.thumbnail.jpg"
        }
      />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
