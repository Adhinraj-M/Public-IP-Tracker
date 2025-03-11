import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import TrackedMob from "./Components/TrackedMob";
import MapComponent from "./Components/MapComponent";
import TrackedDesk from "./Components/TrackedDesk";
import { AppProvider } from "./Context/AppProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <AppProvider>
      <div className="relative min-h-screen">
        <Header />
        <div className="absolute inset-0 flex items-center justify-center mb-80 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            {isMobile ? <TrackedMob /> : <TrackedDesk />}
          </div>
        </div>

        <div className="flex justify-center items-center min-h-screen bg-gray-100 relative z-10">
          <MapComponent />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </AppProvider>
  );
}

export default App;
