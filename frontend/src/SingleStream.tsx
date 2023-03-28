import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoStream } from "./dtos/VideoStream";
import "./App.css";

// interface Props {
//   id: number;
//   name: string;
//   wsUrl: string;
// }

const SingleStream = () => {
  let { streamId } = useParams();

  const navigate = useNavigate();

  const [stream, setStream] = useState<VideoStream>({
    id: 0,
    name: "Invalid",
    wsUrl: "",
  });

  const goHome = () => {
    navigate("/");
  };

  const [imgSrc, setImgSrc] = useState("");
  let webSocket: WebSocket;

  useEffect(() => {
    fetch("http://localhost:8080/api/byid/" + streamId)
      .then((res) => res.json())
      .then(
        (stream) => {
          setStream(stream);
          if (stream.wsUrl !== "") {
            webSocket = new WebSocket(stream.wsUrl);
            webSocket.onmessage = (event: MessageEvent<any>) => {
              let payload = JSON.parse(event.data);
              setImgSrc(`data:image/png;base64,${payload.data}`);
            };
          }
        },
        (error) => {
          // setError(error);
        }
      );

    return () => { };
  }, []);

  return (
    <div className="single-stream-wrapper">
      <div className="card">
        <div className="single-stream-img">
          <img src={imgSrc}></img>
        </div>
        <div className="card-body">
          <span className="fs-6 fw-semibold">{stream.name}</span>
          <span className="float-end">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={goHome}
            >
              <i className="bi-fullscreen-exit"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleStream;
