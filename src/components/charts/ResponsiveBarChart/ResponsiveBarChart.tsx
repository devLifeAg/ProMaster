/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SkeletonBox from '../../layout/SkeletonBox';
import colors from '../../../styles/colors';

interface ResponsiveBarChartProps {
  titleLeft: string;
  titleRight: string;
  chartHeight?: number;
  data?: any[];
  dataKeyX?: string;
  dataKeyY?: string;
}

export default function ResponsiveBarChart({
  titleLeft,
  titleRight,
  chartHeight = 250,
  data,
  dataKeyX = "time",
  dataKeyY = "floor",
}: ResponsiveBarChartProps) {
  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[500px] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: 14, color: colors.greyShadow }}>{titleLeft}</p>
          <p style={{ fontSize: 14, color: colors.greyShadow }}>{titleRight}</p>
        </div>

        {/* Chart or Skeleton */}
        <div className="w-full" style={{ height: `${chartHeight}px` }}>
          {data ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <YAxis
                  domain={[1, 5]}
                  tickCount={5}
                  style={{ fontSize: 12, fill: colors.blackDark }}
                />
                <XAxis
                  dataKey={dataKeyX}
                  tick={{ fontSize: 12, fill: colors.blackDark }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey={dataKeyY}
                  fill={colors.redRuby}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <SkeletonBox height={`h-[${chartHeight}px]`} className="w-full rounded-xl" />
          )}
        </div>
      </div>
    </div>
  );
}
