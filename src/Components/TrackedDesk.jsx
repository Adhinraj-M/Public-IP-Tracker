import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function TrackedDesk() {
  const { fetchedIp } = useContext(AppContext);

  return (
    fetchedIp.city && (
      <div className="rounded-xl h-40 mb-36 text-center text-gray-500 lg:w-4xl md:w-3xl xl:w-5xl bg-white mx-auto">
        <div className="py-6 px-6 flex justify-between">
          <div className="mt-5 ">
            <h3 className="text-xs font-semibold">IP ADDRESS</h3>
            <h1 className="text-xl font-semibold mt-1 text-gray-800">
              {fetchedIp?.query}
            </h1>
          </div>
          <div>
            <h3 className="text-xs font-semibold mt-5">LOCATION</h3>
            <h1 className="text-xl font-semibold mt-1 text-gray-800">
              {fetchedIp?.city},{fetchedIp?.regionName}
              {fetchedIp?.country}
            </h1>
          </div>
          <div>
            <h3 className="text-xs font-semibold mt-5">TIMEZONE</h3>
            <h1 className="text-xl font-semibold mt-1 text-gray-800">
              {fetchedIp?.timezone}
            </h1>
          </div>
          <div>
            <h3 className="text-xs font-semibold mt-5">ISP</h3>
            <h1 className="text-xl font-semibold mt-1 text-gray-800">
              {fetchedIp?.isp}
            </h1>
          </div>
        </div>
      </div>
    )
  );
}

export default TrackedDesk;
