import React from "react";
import Image from "next/image";
import { useState } from "react";

const CNImage = (props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Image
        // fill
        sizes="(max-width: 768px) 100vw, 33vw"
        {...props}
        src={error || loading ? "/placeholder.png" : props.src}
        style={{
          ...props.style,
        }}
        onError={() => {
          setError(true);
        }}
        onLoad={() => setLoading(false)}
        priority
        placeholder="blur"
        blurDataURL="/placeholder.png"
      />
    </div>
  );
};

export default CNImage;
