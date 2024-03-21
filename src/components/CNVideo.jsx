import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";

const CNVideo = ({ url }) => {
  const router = useRouter();
  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  return (
    <div
      style={{
        // height: "40vh",
        width: "100%",
        backgroundColor: "black",
      }}
      className="cn-video"
    >
      <video
        style={videoStyle}
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.png"
      >
        <source
          src={
            router.locale == "ar"
              ? "/company-needs-arabic.mp4"
              : "company-needs-english.mp4"
          }
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default CNVideo;
