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

    return () => {};
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2">
        <a className="navbar-brand ml-1" href="#">
          Video Wall
        </a>
        <ul className="nav navbar-nav ms-auto">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#newStream"
            onClick={goHome}
          >
            Go Home
          </button>
        </ul>
      </nav>
      <div className="card main-content">
        <img className="card-img-top single-stream" src={imgSrc}></img>
        <div className="card-body">
          <span className="fs-6 fw-semibold">{stream.name}</span>
        </div>
      </div>
    </>
  );
};

export default SingleStream;
