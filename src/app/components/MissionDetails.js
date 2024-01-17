"use client";
import Image from "next/image";
import ImageNot from "@/assets/image-not.png";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function MissionDetails({ flight }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div className=" px-2  mx-2 my-5   ">
        <Image
          className="img rounded cursor-pointer"
          src={flight.links.flickr_images[0] || ImageNot}
          width={600}
          height={400}
          alt={`${flight.links.flickr_images[0]}`}
          onClick={handleModal}
          priority
        />
        <h2 className="text-xl font-normal mt-7">
          {flight.launch_date_local.split("T", 1)}
        </h2>
        <h1 className="text-3xl font-semibold mt-4 mb-6">
          {flight.mission_name}
        </h1>
        <button
          className="px-10 py-3 border-2 border-white font-medium"
          onClick={handleModal}
        >
          Learn More
        </button>

        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-scroll">
            <div className=" text-black  p-8 w-4/5 bg-slate-300">
              <div className="flex justify-center">
                {flight.links.video_link && (
                  <ReactPlayer
                    url={flight.links.video_link}
                    controls
                    playing
                    width="80%"
                  />
                )}
              </div>
              <div className="flex justify-center  pt-4 ">
                <h1 className="text-2xl w-11/12 font-semibold  ">
                  {flight.mission_name}
                </h1>
              </div>
              <div className="flex justify-center pt-4">
                <h4 className="w-11/12 text-justify font-medium ">
                  {flight.details}
                </h4>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white"
                  onClick={handleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
