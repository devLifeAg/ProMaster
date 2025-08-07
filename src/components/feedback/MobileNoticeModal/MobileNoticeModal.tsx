import { useEffect, useState } from "react";
import colors from '../../../styles/colors';

export default function MobileNoticeModal() {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      if (width < 1024) { // Tailwind 'lg' breakpoint = 1024px
        setIsMobile(true);
        setShowModal(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || !showModal) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <p className="text-sm text-gray-700 mb-4">
          For the best experience, please use <strong>Pro Master</strong> on our mobile application.
        </p>
        <button
          onClick={() => setShowModal(false)} style={{background: colors.redRuby}}
          className="mt-2 px-4 py-2 text-white rounded-md hover:bg-red-700 text-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
