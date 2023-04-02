import { useEffect, useState } from "react";
import { VideoStream } from "../dtos/VideoStream";
import "../App.css";

interface Props {
  id: number;
  name: string;
  wsUrl: string;
  onEdit: (stream: VideoStream) => void;
  onDelete: (stream: VideoStream) => void;
  onSingleStreamView: (stream: VideoStream) => void;
}

const VideoCard = ({
  id,
  name,
  wsUrl,
  onEdit,
  onDelete,
  onSingleStreamView,
}: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  let webSocket: WebSocket;

  useEffect(() => {
    if (wsUrl !== "") {
      try {
        webSocket = new WebSocket(wsUrl);
        webSocket.onmessage = (event: MessageEvent<any>) => {
          let payload = JSON.parse(event.data);
          setImgSrc(`data:image/png;base64,${payload.data}`);
        };
      } catch (e) {
        console.error('Failed to connect to websocket', wsUrl, e);
      }
    }
    return () => { };
  }, []);

  const handleClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    onEdit({
      id: id,
      name: name,
      wsUrl: wsUrl,
    });
  };

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete({
      id: id,
      name: name,
      wsUrl: wsUrl,
    });
  };

  const handleSingleStreamView = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onSingleStreamView({
      id: id,
      name: name,
      wsUrl: wsUrl,
    });
  };

  return (
    <div className="card">
      {/* <div className="card-img-wrapper"> */}
      <img className="card-img-top" src={imgSrc}></img>
      {/* </div> */}
      <div className="card-body">
        <span className="fs-6 fw-semibold">{name}</span>
        <span className="float-end">
          <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={handleClickDelete}
          >
            <i className="bi-trash"></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={handleClickEdit}
          >
            <i className="bi-pencil"></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleSingleStreamView}
          >
            <i className="bi-fullscreen"></i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
