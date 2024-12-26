import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const VideoCarousal = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLDivElement[]>([]);

  const [video, setVideo] = useState<{
    isEnd: boolean;
    startPlay: boolean;
    videoId: number;
    isLastVideo: boolean;
    isPlaying: boolean;
  }>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease : 'power2.inOut'
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        if (startPlay) {
          videoRef.current[videoId].play().then(() => {
            console.log("Video is playing");
          }).catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (
    e: SyntheticEvent<HTMLVideoElement, Event>
  ) => setLoadedData((prev) => [...prev, e]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100)
          if(progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], { width :  window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                      ? "10vw" // tablet
                      : "4vw", // laptop
               });

            // console.log("currentProgress", currentProgress);
            gsap.to(span[videoId], { width: `${currentProgress}%`, background : 'white' });
          }
        },
        onComplete: () => {
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId], { width : "12px" });
            gsap.to(span[videoId], { backgroundColor : '#afafaf' });
          }
        },
      });
      if(videoId === 0) {
        anim.restart();
      }
      const animUpdate =  () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
      }
      if(isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        console.log("remove ticker");
          gsap.ticker.remove(animUpdate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, startPlay]);

  useEffect(() => {
    videoRef.current.forEach((video) => {
      if (video && video.readyState >= 1) {
        handleLoadedMetadata({target: video} as unknown as SyntheticEvent<HTMLVideoElement, Event>);
      }
    });
  }, []);


  const handleProcess = (type: string, i: number) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
            <div key={list.id} id="slider" className="sm:pr-20 pr-10">
              <div className="video-carousel_container">
                <div className="w-full h-full flex-center overflow-hidden rounded-3xl bg-black">
                  <video
                      id="video"
                      playsInline={true}
                      preload="metadata"
                      muted
                      ref={(el) => {
                        if (el) videoRef.current[i] = el;
                      }}
                      onPlay={() => {
                        setVideo((prev) => ({
                          ...prev,
                          isPlaying: true,
                        }));
                      }}
                      onEnded={() =>
                        i !== 3 ? handleProcess("video-end", i) : handleProcess("video-last", i)
                      }
                      onLoadedMetadata={(e) => {
                        handleLoadedMetadata(e)
                      }}
                      onError={(e) => {
                        console.error("Error loading video", e);
                      }}
                  >
                    <source src={list.video} type="video/mp4"/>
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                  {list.textLists.map((text) => (
                      <p key={text} className="md:text-2xl text-xl font-medium ">
                        {text}
                      </p>
                  ))}
                </div>
              </div>
            </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-700 backdrop-blur rounded-full">
          {videoRef &&
              videoRef.current.length > 0 &&
              videoRef.current.map((_, i) => (
                  <div
                      key={i}
                      ref={(el) => {
                        if (el) videoDivRef.current[i] = el;
                      }}
                      className="h-3 w-3 mx-2 cursor-pointer relative bg-gray-200 rounded-full">
                <span
                    ref={(el) => {
                      if (el) videoSpanRef.current[i] = el;
                  }}
                  className="absolute h-full w-full rounded-full"
                />
              </div>
            ))}
        </div>
        <button className="control-btn">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset", 0)
                : !isPlaying
                ? () => handleProcess("play", 0)
                : () => handleProcess("pause", 0)
            }
          />
        </button>
      </div>
    </>
  );
};
