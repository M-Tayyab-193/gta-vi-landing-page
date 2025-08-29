import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const main = document.querySelector(".main");

    const handleScroll = () => {
      if (main?.scrollTop === 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    main?.addEventListener("scroll", handleScroll);
    return () => main?.removeEventListener("scroll", handleScroll);
  }, [showContent]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "center center",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "center center",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          tl.kill();
        }
      },
    });
  });

  useGSAP(() => {
    const main = document.querySelector(".main");
    console.log(window?.innerWidth);

    if (!showContent) return;
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 1.5,
      ease: "expo.inOut",
      delay: "-0.8",
    });
    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
      delay: "-0.8",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
      delay: "-0.8",
    });
    gsap.to(".girl", {
      rotate: 0,
      x: "-50%",
      bottom: window.innerWidth <= 1000 ? "-15%" : "-45%",
      duration: 2,
      ease: "expo.inOut",
      delay: "-0.8",
      transformOrigin: "50% 50%",
    });
    gsap.to(".txt", {
      rotate: 0,
      scale: 1,
      duration: 2,
      ease: "expo.inOut",
      delay: "-0.8",
    });

    main?.addEventListener("mousemove", function (e) {
      let moveX = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".images-div .txt", {
        x: `${moveX}%`,
      });

      gsap.to(".sky", {
        x: `${moveX * 0.2}%`,
      });
      gsap.to(".bg", {
        x: `${moveX * 0.2}%`,
      });
    });
  }, [showContent]);
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-10 w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  className="text-white"
                  x="50%"
                  y="50%"
                  fontSize="250"
                  fill="white"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-screen h-screen bg-black  scale-[1.7] overflow-x-hidden rotate-[-25deg]">
          <div className="landing overflow-hidden w-full h-screen">
            {showNavbar && (
              <div className="navbar absolute top-0 left-0 z-2 p-10 w-full">
                <div className="logo flex gap-6 items-center ">
                  <div className="lines flex flex-col gap-[5px]">
                    <div className="line max-sm:w-8 sm:w-10 max-sm:h-[4px] h-[5px] bg-white" />
                    <div className="line max-sm:w-6 sm:w-7 max-sm:h-[4px] h-[5px] bg-white" />
                    <div className="line max-sm:w-4 sm:w-4 max-sm:h-[4px] h-[5px] bg-white" />
                  </div>
                  <h3
                    className="max-sm:text-3xl 
                sm:text-4xl lg:text-5xl -mt-2 leading-0"
                  >
                    Rockstar
                  </h3>
                </div>
              </div>
            )}

            <div className="relative images-div w-full h-screen overflow-hidden">
              <img
                src="/sky.png"
                alt=""
                className="sky absolute top-0 left-0 w-full h-full object-cover scale-[1.5] rotate-[25deg]"
              />
              <img
                src="/bg.png"
                alt=""
                className="bg scale-[1.5] rotate-[-15deg] absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="txt absolute top-[25%]  xl:top-10 left-1/2 -translate-x-1/2 font-pricedown scale-[1.4] rotate-[-10deg]">
                <h1 className="max-sm:text-[4rem] sm:text-[6rem] xl:text-[10rem] leading-none max-sm:-ml-15 sm:-ml-40">
                  grand
                </h1>
                <h1 className="max-sm:text-[4rem] sm:text-[6rem] xl:text-[10rem] leading-none max-sm:-ml-5 sm:-ml-20">
                  theft
                </h1>
                <h1 className="max-sm:text-[4rem] sm:text-[6rem] xl:text-[10rem] leading-none max-sm:-ml-15 sm:-ml-40">
                  auto
                </h1>
              </div>
              <img
                src="/girlbg.png"
                alt=""
                className=" girl absolute -bottom-[150%] left-1/2 sm:-translate-x-1/2 max-sm:scale-[0.9] scale-[0.75] xl:scale-[0.85] overflow-hidden rotate-[-20deg]"
              />
            </div>
            <div className="btm-part w-full p-10 py-12 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center max-sm:gap-1 gap-2 max-sm:-ml-9 max-sm:mb-4">
                <i className="ri-arrow-down-line text-white font-black max-sm:text-[14px] sm:text-2xl"></i>
                <h3 className="font-poppins font-black max-sm:text-[12px]">
                  Scroll Down
                </h3>
              </div>
              <img
                src="/ps5.png"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[15%] max-sm:h-[50px] sm:h-[60px] max-sm:w-[230px] max-sm:mt-2 z-10"
              />
            </div>
          </div>

          <div
            className="z-10 w-full max-md:h-[110vh]
          h-full flex items-center justify-center px-10 bg-black"
          >
            <div className="box w-full flex items-center justify-center max-md:flex-col-reverse h-[90%] p-4 md:p-10 md:justify-between max-md:gap-10">
              <div className="flex-1 left-img relative w-1/2 h-full transition-transform hover:scale-105 duration-500 ease-in-out">
                <img
                  src="/imag.png"
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  max-md:mt-10 max-md:scale-[2] md:scale-[1.1]"
                />
              </div>
              <div className="flex-1 right-content relative md:-top-[20%] max-md:flex max-md:flex-col max-md:items-center max-md:gap-1">
                <h1 className="text-[30px] leading-none md:text-6xl md:w-[350px]">
                  Still Running,{" "}
                  <span className="max-md:ml-1">Not Hunting</span>
                </h1>
                <p className="mt-9 font-poppins font-[600] max-md:text-sm">
                  Step into the next era of open-world adventure. GTA VI brings
                  you to the vibrant streets of Vice City, where every choice
                  shapes your destiny. Experience stunning visuals, dynamic
                  weather, and a living world that reacts to your every move.
                </p>
                <p className="mt-4 font-poppins font-[600] max-sm:text-sm">
                  Explore new stories, meet unforgettable characters, and carve
                  your own path in the most immersive Grand Theft Auto
                  experience ever. Are you ready to take control?
                </p>
                <button className="max-md:mt-4 mt-8 max-md:px-3 max-md:py-2 px-6 py-3 bg-yellow-600 max-md:text-[16px] text-[22px] tracking-wider rounded-lg font-medium text-black cursor-pointer drop-shadow-lg drop-shadow-amber-500/80 transition-transform hover:scale-105 duration-500">
                  Download Now
                </button>
              </div>
              <div className="">
                <h1></h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
