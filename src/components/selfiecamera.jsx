import React, { useRef, useEffect, useState } from "react";

function SelfieCamera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideo = () => {
    let video = videoRef.current;
    if (video && video.srcObject) {
      let stream = video.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    stopVideo(); // Stop the video stream after taking a photo
  };

  useEffect(() => {
    getVideo();
    return () => {
      stopVideo(); // Ensure the video stream is stopped when the component unmounts
    };
  }, [videoRef]);

  return (
    <div className="relative min-h-screen">
      <div className="relative">
        <video className="w-auto h-auto" ref={videoRef}></video>
        <button
          onClick={takePhoto}
          className="absolute left-2 bottom-2 appearance-none border-none outline-none px-8 bg-blue-500 text-white"
        >
          Take photo
        </button>
        <button
          onClick={stopVideo}
          className="absolute left-2 bottom-12 appearance-none border-none outline-none px-8 bg-red-500 text-white"
        >
          Stop video
        </button>
      </div>
      <div
  className={
    `fixed top-0 w-full h-full flex items-center transition-all duration-400 transition-opacity ${hasPhoto ? 'left-0 opacity-100' : 'left-full opacity-0'}`}
>
  <canvas ref={photoRef}></canvas>
  <button className="absolute left-2 bottom-2 appearance-none border-none outline-none px-8 bg-blue-500 text-white">
    Perfect!
  </button>
</div>
    </div>
  );
}

export default SelfieCamera;