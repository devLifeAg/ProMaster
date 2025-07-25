// File: components/DashboardContent.tsx
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import colors from '../../styles/colors';
import { CircleChart } from "../../components/CircleChart";
import StatusCard from '../../components/StatusCard';
import { ImagePaths, IconPaths } from '../../constants/consts';
import fonts from "../../styles/fonts";
import TagDialog from "../../components/DashboardDialog";
import SelectDialog from "../../components/SelectDialog";
import GroupDialog from "../../components/GroupDialog";
import { useState } from 'react';

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

const propertyData = [
  { name: "MHW Green Park Residenece", items: ["Puteri", "IBN Highlands City", "IBN Bukit Bintang", "Phase 8", "PHASE 03A", "PHASE 01A", "PHASE 02A"] },
  { name: "Double Storey Terrance", items: ["1A1"] },
  { name: "PH01-05 (Plot 1) PTD 180920 Seed", items: ["TSP1 Seed", "TSP2"] },
  { name: "Loftus Park", items: ["Phase LP1A", "Phase LP1B"] }
];


export default function DashboardContent() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("selling_fast");
  const [isDialogFilterOpen, setDialogFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("appointments");

  const [isDialogChart1Open, setDialogChart1Open] = useState(false);
  const [selectedChart1, setSelectedChart1] = useState("unitStatus");

  const [isDialogChart2Open, setDialogChart2Open] = useState(false);
  const [selectedChart2, setSelectedChart2] = useState("salesStatus");

  const [isDialogChart3Open, setDialogChart3Open] = useState(false);
  const [selectedChart3, setSelectedChart3] = useState("today");

  const [isPropertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<{ team: string[]; personnel: string[] }>({
    team: [],
    personnel: [],
  });


  return (
    <>
      <div className="p-6 relative">
        {isDialogOpen && (
          <TagDialog
            dialogType={0}
            selected={selectedTag}
            onSelect={(val) => setSelectedTag(val)}
            onClose={() => setDialogOpen(false)}
            data={[
              { color: colors.brookedStatus, label: "Selling Fast", value: "selling_fast" },
              { color: colors.waitingStatus, label: "Mix Developments", value: "mix_developments" },
              { color: colors.reserveStatus, label: "Last Few Unit", value: "last_few_unit" },
            ]} // không cần
          />

        )}
        {isDialogFilterOpen && (
          <TagDialog
            dialogType={1}
            selected={selectedFilter}
            onSelect={(val) => setSelectedFilter(val)}
            onClose={() => setDialogFilterOpen(false)}
            data={[
              { value: "appointments", label: "Appointments" },
              { value: "booking", label: "Booking" },
              { value: "timeline", label: "Timeline" },
            ]}
          />

        )}

        {isDialogChart1Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart1}
            onSelect={(val) => setSelectedChart1(val)}
            onClose={() => setDialogChart1Open(false)}
            data={[
              { value: "unitStatus", label: "Unit Status" },
              { value: "salesStatus", label: "Sale Status" },
              { value: "raceStatistic", label: "Race Statistic" },
              { value: "sourceStatistic", label: "Source Statistic" },

            ]}
          />

        )}

        {isDialogChart2Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart2}
            onSelect={(val) => setSelectedChart2(val)}
            onClose={() => setDialogChart2Open(false)}
            data={[
              { value: "salesStatus", label: "Sales Status" },
              { value: "contactStatus", label: "Contact Status" },
              { value: "contactActivity", label: "Contact Activity" },
              { value: "contactAging", label: "Contact Aging" },

            ]}
          />

        )}

        {isDialogChart3Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart3}
            onSelect={(val) => setSelectedChart3(val)}
            onClose={() => setDialogChart3Open(false)}
            data={[
              { value: "today", label: "Today" },
              { value: "thisWeek", label: "This Week" },
              { value: "thisMonth", label: "This Month" },
            ]}
          />

        )}

        {isPropertyDialogOpen && (
          <SelectDialog
            data={propertyData}
            onClose={() => setPropertyDialogOpen(false)}
            onChange={(selected) => setSelectedProperties(selected)}
            selected={selectedProperties}
          />
        )}

        {isGroupDialogOpen && (
          <GroupDialog
            onClose={() => setGroupDialogOpen(false)}
            selectedGroups={selectedGroups}  // ✅ Now supported
            onChange={(updated) => setSelectedGroups(updated)}  // ✅ Now works
          />
        )}


        {/* Projects */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>
                <span className="text-lg font-bold mr-3" style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>Projects</span>
                <Button onClick={() => setDialogOpen(!isDialogOpen)}
                  style={{ background: colors.brookedStatus, fontWeight: 600, fontSize: 14 }} className="text-white hover:bg-blue-600 rounded-md flex items-center gap-1 cursor-pointer">
                  Selling Fast
                  <ChevronDown size={14} />
                </Button>
              </span>
              <div className="cursor-pointer" style={{ fontSize: '16px', color: colors.redRuby }}>See All</div>
            </div>
            <div className="flex gap-4">
              {['Aurora Heights', 'Skyline Park', 'Nova Vista'].map((project, idx) => (
                <div key={idx} className="relative w-1/3 rounded-xl overflow-hidden shadow cursor-pointer">
                  <img src={ImagePaths.avatar} alt={project} className="w-full h-64 object-cover" />
                  <div className="absolute top-2 left-2 rounded text-white px-2 py-1" style={{ background: colors.brookedStatus, fontWeight: 600, fontSize: 14 }}>Selling Fast</div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p style={{ fontSize: 18, fontWeight: 900, fontFamily: fonts.inter }}>{project}</p>
                    <p style={{ fontSize: 14, fontFamily: fonts.outfit }}>Jln Bersatu, Taman Bukit Serdang</p>
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

                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontFamily: fonts.outfit }}>By Property</div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <p onClick={() => setDialogChart1Open(!isDialogChart1Open)} style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Unit Status</p>
                      <ChevronDown size={22} color={colors.redRuby} />
                    </div>
                    <Button onClick={() => setPropertyDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                      Property
                      <ChevronDown size={14} />
                    </Button>
                  </div>
                </div>

                <CircleChart title="Property 1" total={42} data={chartData} />

                <div className="flex flex-col mt-8">
                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontFamily: fonts.outfit }}>By Personnel</div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <p onClick={() => setDialogChart2Open(!isDialogChart2Open)} style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Sales Status</p>
                      <ChevronDown size={22} color={colors.redRuby} />
                    </div>
                    <Button onClick={() => setGroupDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                      Group
                      <ChevronDown size={14} />
                    </Button>
                  </div>
                  <CircleChart title="Team A" total={42} data={chartData} />
                </div>

                <div className="flex flex-col mt-8">
                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontFamily: fonts.outfit }}>By Period</div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <p onClick={() => setDialogChart3Open(!isDialogChart3Open)} style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>Sales Today</p>
                      <ChevronDown size={22} color={colors.redRuby} />
                    </div>
                    <Button onClick={() => setGroupDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
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
                <img className="cursor-pointer" src={IconPaths.filter} onClick={() => setDialogFilterOpen(!isDialogFilterOpen)} alt="icon filter" />
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
