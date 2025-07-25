import { PieChart, Pie, Cell } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
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

      const x = 110 + radius * Math.cos(-midAngle * RADIAN);
      const y = 110 + radius * Math.sin(-midAngle * RADIAN);

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

      <div className="flex items-center justify-between">
        <ChevronLeft className="text-gray-300 cursor-pointer" />

        <div
          className="flex items-center flex-1 justify-center cursor-pointer"
          onClick={() => setShowBadges((prev) => !prev)}
        >
          <div className="relative">
            <PieChart width={220} height={220}>
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
                  <Cell
                    key={idx}
                    fill={hexToRgba(entry.color, 0.8)}
                  />
                ))}
              </Pie>
            </PieChart>

            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p style={{ color: colors.blackDark, fontSize: 14 }}>
                Total Available
              </p>
              <p
                style={{
                  color: colors.blackDark,
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {total}
              </p>
            </div>

            {/* Animated Badges */}
            {badges.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{
                  left: 110 - 20,
                  top: 110 - 12,
                }}
                animate={{
                  left: showBadges ? item.x - 20 : 110 - 20,
                  top: showBadges ? item.y - 12 : 110 - 12,
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

          <div className="ml-8 space-y-3">
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

        <ChevronRight className="text-gray-300 cursor-pointer" />
      </div>
    </div>
  );
};
