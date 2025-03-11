import React, { useContext, useEffect, useState } from "react";
import bgImgMob from "../assets/images/pattern-bg-mobile.png";
import bgImgDesk from "../assets/images/pattern-bg-desktop.png";
import iconArrow from "../assets/images/icon-arrow.svg";
import { AppContext } from "../Context/AppContext";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [ip, setIp] = useState("");

  const { handleSubmit } = useContext(AppContext);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div
      className="relative h-80 bg-cover bg-center flex flex-col justify-start items-center pt-5"
      style={{ backgroundImage: `url(${isMobile ? bgImgMob : bgImgDesk})` }}
    >
      <h1 className="text-4xl text-white font-medium mt-2 font-rubik font-bold">
        Public IP Address Tracker
      </h1>

      <div className="flex justify-center mt-5">
        <input
          id="ipAddress"
          className="min-w-72 md:w-80 p-5 rounded-l-xl shadow-lg border bg-amber-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter IP Address..."
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button
          className="bg-gray-950 p-6 px-7 rounded-r-xl hover:bg-gray-900 cursor-pointer"
          onClick={() => handleSubmit(ip)}
        >
          <img src={iconArrow} alt="Arrow" />
        </button>
      </div>
    </div>
  );
}

export default Header;
