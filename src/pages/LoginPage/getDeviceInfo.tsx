export interface DeviceInfo {
  deviceName: string;
  hostName: string;
  ipAddress: string;
  platformId: number;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {

  // get device info
  const deviceName = navigator.platform || "Unknown";
  const hostName = navigator.userAgent.split(" ")[0] || "Unknown";

  // get IP
  let ipAddress = "Unknown";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ipAddress = data.ip || "Unknown";
  } catch (err) {
    console.warn("can't get IP:", err);
  }

  return {
    deviceName,
    hostName,
    ipAddress,
    platformId: 2,
  };
};
