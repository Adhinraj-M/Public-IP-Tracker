import { useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

export const AppProvider = ({ children }) => {
  const [fetchedIp, setFetchedIp] = useState(null);

  const handleSubmit = async (ip) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;

    // Private IP Ranges
    const privateIpRanges = [
      /^10\./, // 10.0.0.0 - 10.255.255.255
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0 - 172.31.255.255
      /^192\.168\./, // 192.168.0.0 - 192.168.255.255
      /^127\./, // 127.0.0.0 - 127.255.255.255 (Loopback)
    ];

    if (!ip) {
      toast.warn("⚠️ Please enter an IP address.");
      return;
    }

    if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
      toast.warn(
        "❌ Invalid IP format. Please enter a valid IPv4 or IPv6 address."
      );
      return;
    }

    // Check if the IP is in a private range
    if (privateIpRanges.some((regex) => regex.test(ip))) {
      toast.warn("🔒 Private IP detected! Location tracking is not available.");
      return;
    }

    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();

      if (data.status === "fail") {
        toast.error("🚫 IP not found. Please enter a valid IP address.");
        return;
      }

      setFetchedIp(data);
      toast.success(`✅ IP found: ${data.query}`);
    } catch (error) {
      console.error("Error fetching IP:", error);
      toast.error("⚠️ Network error. Please try again later.");
    }
  };

  return (
    <AppContext.Provider value={{ fetchedIp, handleSubmit }}>
      {children}
    </AppContext.Provider>
  );
};
