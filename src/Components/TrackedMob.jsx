import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function TrackedMob() {
  const { fetchedIp } = useContext(AppContext);

  return (
    fetchedIp.city && (
      <div className="flex flex-col rounded-xl justify-center text-center text-gray-500 w-96 bg-white mx-auto">
        <div className="py-6 ">
          <h3 className="text-xs font-semibold">IP ADDRESS</h3>
          <h1 className="text-xl font-semibold mt-1">{fetchedIp?.query}</h1>
          <h3 className="text-xs font-semibold mt-5">LOCATION</h3>
          <h1 className="text-xl font-semibold mt-1">
            {fetchedIp?.city},{fetchedIp?.regionName}
            {fetchedIp?.country}
          </h1>
          <h3 className="text-xs font-semibold mt-5">TIMEZONE</h3>
          <h1 className="text-xl font-semibold mt-1">{fetchedIp?.timezone}</h1>
          <h3 className="text-xs font-semibold mt-5">ISP</h3>
          <h1 className="text-xl font-semibold mt-1">{fetchedIp?.isp}</h1>
        </div>
      </div>
    )
  );
}

export default TrackedMob;
