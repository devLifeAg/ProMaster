import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleChart } from "../CircleChart";
import ResponsiveBarChart from "../ResponsiveBarChart";
import type { ChartDataItem } from "../../../types/StatiscicData";

interface ChartCarouselProps {
  charts: ChartDataItem[];
}

export default function ChartCarousel({ charts }: ChartCarouselProps) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  if (!Array.isArray(charts) || charts.length === 0) {
    return (
      <div className="w-full py-10 text-center text-gray-500 text-sm">
        No chart available
      </div>
    );
  }

  const paginate = (dir: "left" | "right") => {
    if (dir === "left" && activeIndex > 0) {
      setDirection("left");
      setActiveIndex((prev) => prev - 1);
    } else if (dir === "right" && activeIndex < charts.length - 1) {
      setDirection("right");
      setActiveIndex((prev) => prev + 1);
    }
  };

  const activeChart = charts[activeIndex];
  const isBarChart = activeChart.chartType === "Bar";

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === charts.length - 1;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Chevron Left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <ChevronLeft
          size={28}
          onClick={() => paginate("left")}
          className={`cursor-pointer transition ${isFirst ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"
            }`}
        />
      </div>

      {/* Chevron Right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <ChevronRight
          size={28}
          onClick={() => paginate("right")}
          className={`cursor-pointer transition ${isLast ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"
            }`}
        />
      </div>

      {/* Animated Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
          transition={{ type: "tween", duration: 0.4 }}
        >
          {isBarChart ? (
            <ResponsiveBarChart
              titleLeft={activeChart.chartIdentityName}
              titleRight={activeChart.chartName}
              data={activeChart.data.map((d: any) => ({
                x: d.label,
                y: d.value,
              }))}
              dataKeyX="x"
              dataKeyY="y"
            />
          ) : (
            <CircleChart
              title={activeChart.chartIdentityName}
              total={activeChart.data.reduce((sum: number, d: any) => sum + d.value, 0)}
              data={activeChart.data}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}