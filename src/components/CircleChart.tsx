import { PieChart, Pie, Cell } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import colors, { hexToRgba } from "../styles/colors";

interface CircleChartProps {
  title: string;
  total: number;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

export const CircleChart = ({ title, total, data }: CircleChartProps) => {
  const [showBadges, setShowBadges] = useState(true);
  const [chartReady, setChartReady] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Khi component PieChart đã mount thì delay một chút để đảm bảo vẽ xong
    const timeout = setTimeout(() => {
      setChartReady(true);
    }, 2000); // 100ms là đủ để render PieChart

    return () => clearTimeout(timeout);
  }, [data]);

  const totalValue = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data]
  );

  const badges = useMemo(() => {
    let startAngle = 90;
    return data.map((item) => {
      const percent = item.value / totalValue;
      const angle = percent * 360;
      const midAngle = startAngle - angle / 2;

      const RADIAN = Math.PI / 180;
      const radius = 90;

      const x = 100 + radius * Math.cos(-midAngle * RADIAN);
      const y = 100 + radius * Math.sin(-midAngle * RADIAN);

      startAngle -= angle;

      return {
        ...item,
        percent: Math.round(percent * 100),
        x,
        y,
      };
    });
  }, [data, totalValue]);

  return (
    <div className="w-full rounded-xl border p-6 shadow-sm">
      {/* Title */}
      <p
        style={{
          color: colors.blackDark,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        {title}
      </p>

      <div className="flex items-center justify-between overflow-x-auto">
        <ChevronLeft className="text-gray-300 cursor-pointer w-6 h-6 flex-shrink-0" />

        <div
          className="flex flex-col md:flex-row items-center flex-1 justify-center gap-4 md:gap-8 cursor-pointer"
          onClick={() => setShowBadges((prev) => !prev)}
        >
          {/* Chart */}
          <div ref={chartRef} className="relative mb-4 md:mb-0 w-[200px] h-[200px]">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0.5}
                dataKey="value"
                stroke="#fff"
                strokeWidth={6}
                labelLine={false}
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={hexToRgba(entry.color, 0.8)} />
                ))}
              </Pie>
            </PieChart>

            {/* Center Text */}
            {chartReady &&
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p style={{ color: colors.blackDark, fontSize: 14 }}>Total Available</p>
              <p style={{ color: colors.blackDark, fontSize: 24, fontWeight: 700 }}>
                {total}
              </p>
            </div>}

            {/* Animated Badges */}
            {chartReady &&
              badges.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ left: 100 - 20, top: 100 - 12 }}
                  animate={{
                    left: showBadges ? item.x - 20 : 100 - 20,
                    top: showBadges ? item.y - 12 : 100 - 12,
                    opacity: showBadges ? 1 : 0,
                    scale: showBadges ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    width: 40,
                    height: 24,
                    background: hexToRgba(item.color, 0.9),
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "24px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    pointerEvents: "none",
                  }}
                >
                  {item.percent}%
                </motion.div>
              ))}
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-black font-medium">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.value} units</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChevronRight className="text-gray-300 cursor-pointer w-6 h-6 flex-shrink-0" />
      </div>
    </div>
  );
};
