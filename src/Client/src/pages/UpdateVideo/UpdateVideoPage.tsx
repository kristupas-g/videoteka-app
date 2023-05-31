import { useParams } from "react-router-dom";
import { UpdateVideoForm } from "./UpdateVideoForm";

export function UpdateVideoPage() {
    const { id } = useParams();
  return (
    <div>
      <h2 className="mb-4">Update a Video</h2>

      <UpdateVideoForm id = {id}/>
    </div>
  );
}