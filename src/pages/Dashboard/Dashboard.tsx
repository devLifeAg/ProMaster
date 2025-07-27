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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/consts';
import { showErrorToast } from '../../components/ToasService';
import type { DashboardData, UserProfile } from '../../models/Dashboard';
import { useOutletContext } from "react-router-dom";
import SkeletonBox from '../../components/SkeletonBox';

type ContextType = {
  setUserInfo: (info: UserProfile) => void;
};

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

const tagColors: Record<number, string> = {
  67845: colors.brookedStatus,
  67861: colors.waitingStatus,
  67846: colors.reserveStatus,
};


export default function DashboardContent() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(-1);
  const [isDialogFilterOpen, setDialogFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(-1);

  const [isDialogChart1Open, setDialogChart1Open] = useState(false);
  const [selectedChart1, setSelectedChart1] = useState(0);

  const [isDialogChart2Open, setDialogChart2Open] = useState(false);
  const [selectedChart2, setSelectedChart2] = useState(0);

  const [isDialogChart3Open, setDialogChart3Open] = useState(false);
  const [selectedChart3, setSelectedChart3] = useState(0);

  const [isPropertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<{ team: string[]; personnel: string[] }>({
    team: [],
    personnel: [],
  });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { setUserInfo } = useOutletContext<ContextType>();




  useEffect(() => {
    const fetchDashboardData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.get(
          `${BASE_URL}promasterauthentication/dashboard`,
          {
            headers: {
              AccessToken: accessToken,
            }
          }
        );
        const result = response.data.result as DashboardData;
        console.log('Full response:', response.data);

        setDashboardData(result);
        setUserInfo(result.userprofile);
      } catch (error) {
        showErrorToast('Error fetching dashboard data: ' + error);
        console.log('Error fetching dashboard data: ' + error);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <>
      <div className="p-4 relative">
        {isDialogOpen && (
          <TagDialog
            dialogType={0}
            selected={selectedTag}
            onSelect={(val) => setSelectedTag(val)}
            onClose={() => setDialogOpen(false)}
            data={dashboardData?.projecttags}
          />

        )}
        {isDialogFilterOpen && (
          <TagDialog
            dialogType={1}
            selected={selectedFilter}
            onSelect={(val) => setSelectedFilter(val)}
            onClose={() => setDialogFilterOpen(false)}
            data={dashboardData?.activityfilters}
          />

        )}

        {isDialogChart1Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart1}
            onSelect={(val) => setSelectedChart1(val)}
            onClose={() => setDialogChart1Open(false)}
            data={[
              { intId: 0, description: "Unit Status" },
              { intId: 1, description: "Sale Status" },
              { intId: 2, description: "Race Statistic" },
              { intId: 3, description: "Source Statistic" },

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
              { intId: 0, description: "Sales Status" },
              { intId: 1, description: "Contact Status" },
              { intId: 2, description: "Contact Activity" },
              { intId: 3, description: "Contact Aging" },

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
              { intId: 0, description: "Today" },
              { intId: 1, description: "This Week" },
              { intId: 2, description: "This Month" },
            ]}
          />

        )}

        {isPropertyDialogOpen && (
          <SelectDialog
            data={propertyData}
            onClose={() => setPropertyDialogOpen(false)}
            onChange={(selected: string[]) => setSelectedProperties(selected)}
            selected={selectedProperties}
          />
        )}

        {isGroupDialogOpen && (
          <GroupDialog
            onClose={() => setGroupDialogOpen(false)}
            selectedGroups={selectedGroups}
            onChange={(updated) => setSelectedGroups(updated)}
          />
        )}


        {/* Projects */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>
                <span
                  className="text-lg font-bold mr-3"
                  style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}
                >
                  Projects
                </span>
                <Button
                  onClick={() => setDialogOpen(!isDialogOpen)}
                  style={{ background: colors.brookedStatus, fontWeight: 600, fontSize: 14 }}
                  className="text-white hover:bg-blue-600 rounded-md flex items-center gap-1 cursor-pointer"
                >
                  {selectedTag == -1 ? 'All' : selectedTag}
                  <ChevronDown size={14} />
                </Button>
              </span>
              <div className="cursor-pointer" style={{ fontSize: '16px', color: colors.redRuby }}>
                See All
              </div>
            </div>

            {/* Horizontal Scrollable List */}
            <div className="grid lg:grid-cols-10 gap-6 w-full">
              <div className="col-span-10 flex gap-4 overflow-x-auto">
                {!dashboardData?.projects ? (
                  <div className="flex gap-4 overflow-x-auto">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="min-w-[240px] h-64 bg-gray-200 animate-pulse rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-10 flex gap-4 overflow-x-auto">
                    {dashboardData.projects.map((project) => (
                      <div
                        key={project.projectId}
                        className="relative min-w-[240px] max-w-[320px] rounded-xl overflow-hidden shadow cursor-pointer"
                      >
                        <img
                          src={ImagePaths.avatar}
                          alt={project.projectName}
                          className="h-64 object-cover"
                        />
                        <div
                          className="absolute top-2 left-2 rounded text-white px-2 py-1"
                          style={{ background: tagColors[project.tagId], fontWeight: 600, fontSize: 14 }}
                        >
                          {project.tagName}
                        </div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <p style={{ fontSize: 18, fontWeight: 900, fontFamily: fonts.inter }}>{project.projectName}</p>
                          <p style={{ fontSize: 14, fontFamily: fonts.outfit }}>{project.projectAddress}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </CardContent>
        </Card>




        {/* Statistics + Activities */}
        <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 flex-1">

          {/* Activities */}
          <Card className="lg:col-span-4 order-1 lg:order-2">
            <CardContent className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <div style={{ fontSize: '20px', fontWeight: 700, color: colors.blackDark }}>Activities</div>
                <img className="cursor-pointer" src={IconPaths.filter} onClick={() => setDialogFilterOpen(!isDialogFilterOpen)} alt="icon filter" />
              </div>
              <div className="flex flex-col justify-between h-full flex-1">
                {!dashboardData?.activities ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <SkeletonBox key={idx} height="h-16" className="w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.activities.map((activity) => (
                      <StatusCard
                        activity={activity}
                        activityName={dashboardData.activityfilters[activity.category]?.description}
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <span style={{ fontSize: 14, color: colors.redRuby, textDecoration: 'underline', cursor: 'pointer' }}>View More</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Card>
              <CardContent>
                <div className="flex flex-col">
                  <span className="text-lg font-bold mb-6" style={{ fontFamily: fonts.outfit, color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>Statistics</span>

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

                {dashboardData ? (
                  <CircleChart title="Property 1" total={42} data={chartData} />
                ) : (
                  <SkeletonBox height="h-[200px]" className="w-full rounded-xl" />
                )}


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
                      {/* Left Chevron */}
                      <ChevronLeft className="text-gray-300 cursor-pointer hover:text-gray-500 transition w-6 h-6 flex-shrink-0" />

                      {/* Chart Section */}
                      <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-[500px] p-4">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <p style={{ fontSize: 14, color: colors.greyShadow }}>Floor</p>
                            <p style={{ fontSize: 14, color: colors.greyShadow }}>14/03/2025</p>
                          </div>

                          {/* Responsive Chart */}
                          <div className="w-full h-[250px]">
                            {dashboardData ? (
                              <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={floorData}
                                margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                                barCategoryGap={20}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <YAxis domain={[1, 5]} tickCount={5} style={{ fontSize: 12, fill: colors.blackDark }} />
                                <XAxis
                                  dataKey="time"
                                  tick={{ fontSize: 12, fill: colors.blackDark }}
                                  axisLine={false}
                                  tickLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="floor" fill={colors.redRuby} radius={[6, 6, 0, 0]} />
                              </BarChart>
                              </ResponsiveContainer>
                            ) : (
                              <SkeletonBox height="h-[250px]" className="w-full rounded-xl" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Chevron */}
                      <ChevronRight className="text-gray-300 cursor-pointer hover:text-gray-500 transition w-6 h-6 flex-shrink-0" />
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>


        </div>
      </div>

    </>
  );
}
