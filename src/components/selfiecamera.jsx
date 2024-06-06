import React, { useRef, useEffect, useState } from "react";


function SelfieCamera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 640, height: 480 },
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
        const width = 640;
        const height = 480;

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

    let heading = "USER DETAILS "


    return (
        <div>
            <div className="h-[13vh] bg-transparent text-white font-bold flex items-center px-10 underline underline-offset-4">Verification Process</div>
            <div>
                <div className="flex">
                    <div>
                    <video className="w-auto h-auto pl-2" ref={videoRef}></video>
                    
                    {hasPhoto ? null : (
                        <>
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
                        </>
                    )}
                    </div>
                    {/* <div className="flex justify-center items-center text-white m-20 pl-20">
                        {heading}
                    </div> */}
    
                </div>
                <div className="col-start-2 bg-lime-200">

                </div>
                <div
                    className={`fixed top-0 w-full h-full flex items-center transition-all duration-400 transition-opacity ${hasPhoto ? 'left-0 opacity-100' : 'left-full opacity-0'}`}
                >
                    <canvas ref={photoRef}></canvas>
                    <button className="absolute left-2 bottom-2 appearance-none border-none outline-none px-8 bg-blue-500 text-white">
                        Perfect!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelfieCamera;