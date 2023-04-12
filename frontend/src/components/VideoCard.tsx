import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VideoStream } from "../dtos/VideoStream";
import "../App.css";

interface Props {
  stream: VideoStream;
  onEdit?: (stream: VideoStream) => void;
  onDelete?: (stream: VideoStream) => void;
  onSingleStreamView?: (stream: VideoStream) => void;
  onExitSingleStreamView?: () => void;
}

const VideoCard = ({
  stream,
  onEdit,
  onDelete,
  onSingleStreamView,
  onExitSingleStreamView
}: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  const [faces, setFaces] = useState([]);
  let webSocket: WebSocket;

  const imgRef = useRef<HTMLImageElement>(null);

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);


  useLayoutEffect(() => {
    if (imgRef.current != null) {
      setImgWidth(imgRef.current.offsetWidth);
      setImgHeight(imgRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (stream.wsUrl !== "") {
      try {
        webSocket = new WebSocket(stream.wsUrl);
        webSocket.onmessage = (event: MessageEvent<any>) => {
          let payload = JSON.parse(event.data);
          setImgSrc(`data:image/png;base64,${payload.frame}`);
          setFaces(payload.faces);
        };
      } catch (err) {
        console.error('Failed to connect to websocket', stream.wsUrl, err);
      }
    }
    return () => { };
  }, [stream]);

  const handleClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onEdit)
      onEdit(stream);
  };

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onDelete)
      onDelete(stream);
  };

  const handleSingleStreamView = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (onSingleStreamView)
      onSingleStreamView(stream);
  };

  const handleExitSingleStreamView = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (onExitSingleStreamView)
      onExitSingleStreamView();
  };

  return (
    <div className="card">
      <div className={`video-wrapper ${onExitSingleStreamView ? 'single-stream-img' : ''}`}>
        <img ref={imgRef} className="card-img-top" src={imgSrc}></img>
        <svg width={imgWidth} height={imgHeight}>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="textbg">
              <feFlood floodColor="deeppink" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g>
            {faces.map(({ id, x, y, w, h }, index) => (
              <g key={id} transform={'translate(' + (x * imgWidth) + ',' + (y * imgHeight) + ')'}>
                <text filter="url(#textbg)" textAnchor="start" x='0' y='-4' className='bbox-text'>Face {id}</text>
                <rect x={0} y={0} width={w * imgWidth} height={h * imgHeight}></rect>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="card-body">
        <span className="fs-6 fw-semibold">{stream.name}</span>
        <span className="float-end">
          {onEdit && <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={handleClickDelete}>
            <i className="bi-trash"></i>
          </button>}
          {onEdit && <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={handleClickEdit}>
            <i className="bi-pencil"></i>
          </button>}
          {onSingleStreamView && <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleSingleStreamView}>
            <i className="bi-fullscreen"></i>
          </button>}
          {onExitSingleStreamView && <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleExitSingleStreamView}>
            <i className="bi-fullscreen-exit"></i>
          </button>}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
