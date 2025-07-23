export interface DeviceInfo {
//   deviceId: string;
  deviceName: string;
  hostName: string;
  ipAddress: string;
//   nosUserName: string;
  platformId: number;
//   versionText: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
//   // Tạo/lấy deviceId từ localStorage
//   let deviceId = localStorage.getItem("device_id");
//   if (!deviceId) {
//     deviceId = `device-${crypto.randomUUID()}`;
//     localStorage.setItem("device_id", deviceId);
//   }

  // Lấy thông tin thiết bị
  const deviceName = navigator.platform || "Unknown";
  const hostName = navigator.userAgent.split(" ")[0] || "Unknown";

  // Lấy IP
  let ipAddress = "Unknown";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ipAddress = data.ip || "Unknown";
  } catch (err) {
    console.warn("Không lấy được IP:", err);
  }

  return {
    // deviceId,
    deviceName,
    hostName,
    ipAddress,
    // nosUserName: "unknown", // Cập nhật nếu bạn lấy được
    platformId: 2,
    // versionText: "1.0.0"
  };
};
