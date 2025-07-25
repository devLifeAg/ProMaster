import { FaGlobe, FaCog } from "react-icons/fa";

export default function FixedTopIcons({
  onLanguage,
  onSettings,
}: {
  onLanguage: () => void;
  onSettings: () => void;
}) {
  return (
    <div className="fixed top-4 sm:top-8 left-4 sm:left-8 flex gap-3 sm:gap-5 z-[9999] pointer-events-auto">
      <FaGlobe
        size={30}
        className="text-red-600 lg:text-white cursor-pointer transition-colors hover:opacity-80"
        onClick={onLanguage}
      />
      <FaCog
        size={30}
        className="text-red-600 lg:text-white cursor-pointer transition-colors hover:opacity-80"
        onClick={onSettings}
      />
    </div>
  );
}
