import { Col, Row} from "react-bootstrap";
import { VideoCardProfile } from "../../components/videos/VideoCardProfile";
import { useAuthenticatedUser } from "../../api/auth/api";
import { User } from "../../api/auth/types";
import {  useUploaderVideos } from "../../api/videos/api";
import { Video } from "../../api/videos/types";
import { HiUserCircle } from "react-icons/hi";


export function ProfilePage() {
  
    const user = useAuthenticatedUser();
    

    return (
      <Row>
        <Col lg={{ order: 1, span: 3 }}>
          <ProfileLoad user={user.data} />
        </Col>
        <Col lg={{ order: 2 }} className="mb-4">        
            <VideoLoad user={user.data}/>         
        </Col>
      </Row>
    );
    
   
}
function ProfileLoad({ user }: { user?: User }) {
  
  if (!!user) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <HiUserCircle size={200} color="gray" />
      <span style={{ color: "gray", fontSize: "20px", marginTop: "10px" }}>{user.username}</span>
    </div>
      );
  }

  return <div>asdasdad</div>;
}
function VideoLoad({ user }: { user?: User }){
  const videos = useUploaderVideos(user?.id ?? "");
  const videoList = videos.data ?? [];
  return(
    <div><h2 className="mb-4">My Videos</h2>
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
          <VideoCardProfile data={video} />
        </Col>
      ))}
    </Row>
  );
}