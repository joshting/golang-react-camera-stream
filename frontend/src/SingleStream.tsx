import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoStream } from "./dtos/VideoStream";
import "./App.css";
import VideoCard from "./components/VideoCard";

const SingleStream = () => {
  let { streamId } = useParams();

  const navigate = useNavigate();

  const [stream, setStream] = useState<VideoStream>({
    id: 0,
    name: "Invalid",
    wsUrl: "",
  });

  const handleExitSingleStreamView = () => {
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
      <VideoCard
        key={stream.id}
        stream={stream}
        onExitSingleStreamView={handleExitSingleStreamView}
      ></VideoCard>
    </div>
  );
};

export default SingleStream;
