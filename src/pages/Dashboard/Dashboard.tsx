// File: components/DashboardContent.tsx
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import colors from '../../styles/colors';
import { CircleChart } from "../../components/CircleChart";
import StatusCard from '../../components/StatusCard';

const chartData = [
  { label: "Available", value: 42, color: colors.availableStatus },
  { label: "Booked", value: 67, color: colors.brookedStatus },
  { label: "Reserved", value: 130, color: colors.reserveStatus },
];

const floorData = [
  { time: "8AM", floor: 2 },
  { time: "12PM", floor: 4 },
  { time: "4PM", floor: 3 },
  { time: "8PM", floor: 4 },
  { time: "12AM", floor: 5 },
  { time: "4AM", floor: 5 },
];

export default function DashboardContent() {
  return (
    <>
    <div className="p-6">
{/* Projects */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>
              <span className="text-lg font-bold mr-3" style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>Projects</span>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-md flex items-center gap-1 cursor-pointer">
                Selling Fast
                <ChevronDown size={14} />
              </Button>
            </span>
            <div className="cursor-pointer" style={{ fontSize: '16px', color: colors.redRuby }}>See All</div>
          </div>
          <div className="flex gap-4">
            {['Aurora Heights', 'Skyline Park', 'Nova Vista'].map((project, idx) => (
              <div key={idx} className="relative w-1/3 rounded-xl overflow-hidden shadow cursor-pointer">
                <img src='/assets/image.jpg' alt={project} className="w-full h-64 object-cover" />
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Selling Fast</div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="font-semibold text-sm">{project}</p>
                  <p className="text-xs">Jln Bersatu, Taman Bukit Serdang</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics + Activities */}
      <div className="grid grid-cols-10 gap-6 flex-1">
        {/* Statistics */}
        <div className="col-span-6">
          <Card>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-lg font-bold mb-6" style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>Statistics</span>

                <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>By Property</div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Unit Status</p>
                    <ChevronDown size={22} color={colors.redRuby} />
                  </div>
                  <Button variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                    Property
                    <ChevronDown size={14} />
                  </Button>
                </div>
              </div>

              <CircleChart title="Property 1" total={42} data={chartData} />

              <div className="flex flex-col mt-8">
                <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>By Personnel</div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Sale Status</p>
                    <ChevronDown size={22} color={colors.redRuby} />
                  </div>
                  <Button variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                    Group
                    <ChevronDown size={14} />
                  </Button>
                </div>
                <CircleChart title="Team A" total={42} data={chartData} />
              </div>

              <div className="flex flex-col mt-8">
                <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>By Period</div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Sales Today</p>
                    <ChevronDown size={22} color={colors.redRuby} />
                  </div>
                  <Button variant="custom" className="rounded-full flex items-center gap-4" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                    Group
                    <ChevronDown size={14} />
                  </Button>
                </div>
                <div className="w-full rounded-xl border p-6 shadow-sm">
                  <p style={{ color: colors.blackDark, fontSize: 18, fontWeight: 500 }}>Phase 1</p>
                  <div className="flex items-center justify-between">
                    <ChevronLeft className="text-gray-300 cursor-pointer hover:text-gray-500 transition" />
                    <div className="flex-1 flex justify-center">
                      <div className="p-4 rounded-xlw-[460px]">
                        <div className="flex items-center justify-between mb-4">
                          <p style={{ fontSize: 14, color: colors.greyShadow }}>Floor</p>
                          <p style={{ fontSize: 14, color: colors.greyShadow }}>14/03/2025</p>
                        </div>
                        <ResponsiveContainer width={460} height={250}>
                          <BarChart data={floorData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }} barCategoryGap={20}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <YAxis domain={[1, 5]} tickCount={5} style={{ fontSize: 12, fill: colors.blackDark }} />
                            <XAxis dataKey="time" tick={{ fontSize: 12, fill: colors.blackDark }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="floor" fill={colors.redRuby} radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-300 cursor-pointer hover:text-gray-500 transition" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities */}
        <Card className="col-span-4">
          <CardContent className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div style={{ fontSize: '20px', fontWeight: 700, color: colors.blackDark }}>Activities</div>
              <img src="/assets/icons/filterIcon.png" alt="icon filter" />
            </div>
            <div className="flex flex-col justify-between h-full flex-1">
              <div className="space-y-4">
                <StatusCard type="Booking" note="Aurora Heights A-03-11 Booked Successfully." time="Today 11:30 AM" />
                <StatusCard type="Booking" note="Aurora Heights A-03-11 Booked Successfully." time="Today 11:30 AM" />
                <StatusCard type="Appointment" contact="Alex Tan" note="Aurora Heights A-03-11 Booked Successfully." time="Today 11:30 AM" />
                <StatusCard type="Booking" note="Aurora Heights A-03-11 Booked Successfully." time="Today 11:30 AM" />
                <StatusCard type="Timeline" note="Aurora Heights A-03-11 Booked Successfully." time="Today 11:30 AM" />
              </div>
              <div className="flex justify-end mt-4">
                <span style={{ fontSize: 14, color: colors.redRuby, textDecoration: 'underline', cursor: 'pointer' }}>View More</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      
    </>
  );
}
