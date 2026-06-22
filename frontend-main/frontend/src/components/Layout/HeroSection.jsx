import React from "react";
import HeroPicture from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative">
      <img src={HeroPicture} alt="Banner" className=" w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="uppercase text-white text-8xl font-semibold tracking-tighter">
          vacation{" "}
        </h1>
        <p className="uppercase text-white text-8xl font-semibold tracking-tighter">
          ready
        </p>
        <p className="text-white mt-4">
          Explore our vacation-ready outfits with fast wordwide shipping
        </p>
        <Link
          to="collection/all"
          className="bg-white rounded px-4 py-[6px] mt-4"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
