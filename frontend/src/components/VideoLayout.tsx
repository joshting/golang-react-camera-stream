import { VideoStream } from "../dtos/VideoStream";
import VideoCard from "./VideoCard";
import "../App.css";

interface Props {
  videoStreams: VideoStream[];
  onEdit: (stream: VideoStream) => void;
  onDelete: (stream: VideoStream) => void;
  onSingleStreamView: (stream: VideoStream) => void;
}

const VideoLayout = ({
  videoStreams,
  onEdit,
  onDelete,
  onSingleStreamView,
}: Props) => {
  const handleOnEdit = (item: VideoStream) => {
    onEdit(item);
  };

  const handleOnDelete = (item: VideoStream) => {
    onDelete(item);
  };

  const handleOnSingleStreamView = (item: VideoStream) => {
    onSingleStreamView(item);
  };

  return (
    <div className="container">
      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        {videoStreams.length === 0 && (
          <div className="position-relative w-100 main-content">
            <div className="position-absolute top-50 start-50 translate-middle">
              <h3>No Streams</h3>
            </div>
          </div>
        )}
        {videoStreams.map(({ id, name, wsUrl }, index) => (
          <div className="col">
            <VideoCard
              key={id}
              id={id}
              name={name}
              wsUrl={wsUrl}
              onEdit={handleOnEdit}
              onDelete={handleOnDelete}
              onSingleStreamView={handleOnSingleStreamView}
            ></VideoCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLayout;
