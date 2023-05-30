import { Card, Stack } from "react-bootstrap";
import { Video } from "../../api/videos/types";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { palette } from "../../config/palette";
import { formatDistanceToNow } from "date-fns";
import { abbreviateNumber } from "../../utils/numberAbbreviator";

type Props = {
  data: Video;
};

export function VideoCard({ data }: Props) {
  const navigate = useNavigate();

  return (
    <Card onClick={handleClick} style={{ cursor: "pointer", height: "100%" }}>
      <Card.Img
        variant="top"
        src={
          data.thumbnail ??
          "https://1.bp.blogspot.com/-KgVoAl8nfUg/X1D5H6zmA7I/AAAAAAAAB-4/n4u4qHh4kN0a8GToVjveE2gM9oLjR4pVACPcBGAYYCw/w919/lofi-girl-studying-hip-hop-radio-headphone-uhdpaper.com-4K-7.2708-wp.thumbnail.jpg"
        }
      />
      <Card.Body>
        <Stack direction="horizontal" className="align-items-start" gap={2}>
          <HiUserCircle size={36} color={palette.gray} />
          <Stack>
            <Card.Title className="mb-0" style={{ fontSize: "18px" }}>
              {data.name}
            </Card.Title>
            <span style={{ color: palette.gray }}>{data.username}</span>
            <span style={{ color: palette.gray, fontSize: "14px" }}>
              {`${abbreviateNumber(data.views)} views • ${formatDate(
                data.created
              )}`}
            </span>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );

  function handleClick() {
    navigate(`/video/${data.id}`);
  }

  function formatDate(date: string | Date | number) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }
}
