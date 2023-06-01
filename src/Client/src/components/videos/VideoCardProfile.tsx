import { Card, Dropdown, Stack } from "react-bootstrap";
import { Video } from "../../api/videos/types";
import { useNavigate } from "react-router-dom";

import { palette } from "../../config/palette";
import { formatDistanceToNow } from "date-fns";
import { abbreviateNumber } from "../../utils/numberAbbreviator";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useDeleteVideo } from "../../api/videos/api";

type Props = {
  data: Video;
};

export function VideoCardProfile({ data }: Props) {
  const navigate = useNavigate();
  const deleteVideo = useDeleteVideo();

  return (
    <Card style={{ cursor: "pointer", height: "100%" }}>
      <Card.Img
        onClick={handleClick}
        variant="top"
        src={
          "https://1.bp.blogspot.com/-KgVoAl8nfUg/X1D5H6zmA7I/AAAAAAAAB-4/n4u4qHh4kN0a8GToVjveE2gM9oLjR4pVACPcBGAYYCw/w919/lofi-girl-studying-hip-hop-radio-headphone-uhdpaper.com-4K-7.2708-wp.thumbnail.jpg"
        }
      />
      <Card.Body>
        <Stack direction="horizontal" className="align-items-start" gap={2}>
          <Stack>
            <Card.Title className="mb-0" style={{ fontSize: "18px" }}>
              {data.name}
            </Card.Title>
            <span style={{ color: palette.gray, fontSize: "14px" }}>
              {data.description}
            </span>
            <span style={{ color: palette.gray, fontSize: "10px" }}>
              {`${abbreviateNumber(data.views)} views • ${formatDate(
                data.created
              )}`}
            </span>
          </Stack>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu id="basic-dropdown">
              <Dropdown.Item>
                <AiFillDelete
                  size={20}
                  color={palette.gray}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    deleteVideo.mutate(data.id, {
                      onSuccess: () => window.location.reload(),
                    })
                  }
                />
                <span style={{ color: palette.gray, fontSize: "12px" }}>
                  Delete
                </span>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleEditClick}>
                <AiFillEdit
                  size={20}
                  color={palette.gray}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ color: palette.gray, fontSize: "12px" }}>
                  Edit
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Card.Body>
    </Card>
  );

  function handleClick() {
    navigate(`/video/${data.id}`);
  }
  function handleEditClick() {
    navigate(`/update/${data.id}`);
  }

  function formatDate(date: string | Date | number) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }
}
