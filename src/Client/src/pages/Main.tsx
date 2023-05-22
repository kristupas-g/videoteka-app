import { Alert } from "react-bootstrap";
import { useVideos } from "../api/videos/api";

export function Main() {
  const videos = useVideos();

  return (
    <div>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {videos.isLoading ? "loading" : "not loading"}
      </header>
      <Alert variant="primary">This is a primary alert—check it out!</Alert>
    </div>
  );
}
