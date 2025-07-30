import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { ChevronDown } from "lucide-react";
import colors from '../../styles/colors';
import StatusCard from '../../components/StatusCard';
import { IconPaths } from '../../constants/consts';
import fonts from "../../styles/fonts";
import TagDialog from "../../components/DashboardDialog";
import SelectDialog from "../../components/SelectDialog";
import GroupDialog from "../../components/GroupDialog";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/consts';
import { showErrorToast } from '../../components/ToasService';
import type { DashboardData, ChartDataItem } from '../../models/DashboardData';
import { processStatistics, processCharts } from '../../models/DashboardData';
import ChartCarousel from "../../components/ChartCarousel";
import { fetchAndExtractImages } from "../../utils/FetchAndExtractImages";

import { useUserContext } from '../../contexts/UserContext';
import SkeletonBox from '../../components/SkeletonBox';

const tagColors: Record<number, string> = {
  67845: colors.bookedStatus,
  67861: colors.waitingStatus,
  67846: colors.reserveStatus,
};

export default function DashboardContent() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{ intId: number; description: string }>();
  const [isDialogFilterOpen, setDialogFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{ intId: number; description: string }>();

  const [isDialogChart1Open, setDialogChart1Open] = useState(false);
  const [selectedChart1, setSelectedChart1] = useState<{ intId: number; description: string }>();


  const [isDialogChart2Open, setDialogChart2Open] = useState(false);
  const [selectedChart2, setSelectedChart2] = useState<{ intId: number; description: string }>();

  const [isDialogChart3Open, setDialogChart3Open] = useState(false);
  const [selectedChart3, setSelectedChart3] = useState<{ intId: number; description: string }>();

  const [isPropertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<Record<string, string[]>>({});

  const [isPeriodGroupDialogOpen, setPeriodGroupDialogOpen] = useState(false);
  const [selectedPeriodGroups, setSelectedPeriodGroups] = useState<Record<string, string[]>>({});

  const [propertyData, setPropertyData] = useState<{ groupName: string; itemsName: string[] }[]>([]);
  const [propertyChartType, setPropertyChartType] = useState<{ intId: number; description: string }[]>([]);


  const [personnelData, setPersonnelData] = useState<{ groupName: string; itemsName: string[] }[]>([]);
  const [personnelChartType, setPersonnelChartType] = useState<{ intId: number; description: string }[]>([]);

  const [periodData, setPeriodData] = useState<{ groupName: string; itemsName: string[] }[]>([]);
  const [periodChartType, setPeriodChartType] = useState<{ intId: number; description: string }[]>([]);

  const [propertyCharts, setPropertyCharts] = useState<ChartDataItem[]>([]);
  const [personnelCharts, setPersonnelCharts] = useState<ChartDataItem[]>([]);
  const [periodCharts, setPeriodCharts] = useState<ChartDataItem[]>([]);
  const [projectImages, setProjectImages] = useState<Record<string, string>>({});





  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { setUserInfo } = useUserContext();



  useEffect(() => {
    console.log('fetch');
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
        const photos = result.projects
          .map((p) => p.photo)
          .filter((photo): photo is string => !!photo?.trim());

        if (photos.length > 0) {
          fetchAndExtractImages(photos, accessToken, BASE_URL)
            .then(setProjectImages)
            .catch(() => console.log("can't download images"));
        }

        setUserInfo(result.userprofile);
        if (result.projecttags != null && result.projecttags.length > 0) {
          setSelectedTag(result.projecttags[0]);
        }

        if (result.activityfilters != null && result.activityfilters.length > 0) {
          setSelectedFilter(result.activityfilters[0]);

        }

        if (result.statistics != null) {
          const statisticData = processStatistics(result.statistics);
          setPropertyData(statisticData.propertyData);
          setPropertyChartType(statisticData.propertyChartType);
          setPersonnelData(statisticData.personnelData);
          setPersonnelChartType(statisticData.personnelChartType);
          setPeriodData(statisticData.periodData);
          setPeriodChartType(statisticData.periodChartType);

          // Sau khi gán xong mới set selected
          setSelectedChart1(statisticData.propertyChartType[0]);
          setSelectedChart2(statisticData.personnelChartType[0]);
          setSelectedChart3(statisticData.periodChartType[0]);

          const propertyCharts = processCharts(
            result.statistics[0].records,
            selectedChart1?.description ?? statisticData.propertyChartType[0]?.description ?? ""
          );
          const personnelCharts = processCharts(
            result.statistics[1].records,
            statisticData.personnelChartType[0]?.description ?? ""
          );
          const periodCharts = processCharts(
            result.statistics[2].records,
            statisticData.periodChartType[0]?.description ?? ""
          );

          // Nếu cần lưu vào state:
          setPropertyCharts(propertyCharts);
          setPersonnelCharts(personnelCharts);
          setPeriodCharts(periodCharts);
        }
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
            selected={selectedTag!.intId}
            onConfirm={(intId) => {
              const found = dashboardData?.projecttags.find((item) => item.intId === intId);
              if (found) {
                setSelectedTag(found);
              }
            }}
            onClose={() => setDialogOpen(false)}
            data={dashboardData?.projecttags}
          />

        )}
        {isDialogFilterOpen && (
          <TagDialog
            dialogType={1}
            selected={selectedFilter!.intId}
            onConfirm={(intId) => {
              const found = dashboardData?.activityfilters.find((item) => item.intId === intId);
              if (found) {
                setSelectedFilter(found);
              }
            }}
            onClose={() => setDialogFilterOpen(false)}
            data={dashboardData?.activityfilters}
          />

        )}

        {isDialogChart1Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart1!.intId}
            onConfirm={(intId) => {
              const found = propertyChartType.find((item) => item.intId === intId);
              if (found) {
                setSelectedChart1(found);
                if (dashboardData) {
                  const updatedCharts = processCharts(
                    dashboardData.statistics[0].records,
                    found.description
                  );
                  setPropertyCharts(updatedCharts);
                }
              }
            }}
            onClose={() => setDialogChart1Open(false)}
            data={propertyChartType}
          />

        )}

        {isDialogChart2Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart2!.intId}
            onConfirm={(intId) => {
              const found = personnelChartType.find((item) => item.intId === intId);
              if (found) {
                setSelectedChart2(found);
                if (dashboardData) {
                  const updatedCharts = processCharts(
                    dashboardData.statistics[1].records,
                    found.description
                  );
                  setPersonnelCharts(updatedCharts);
                }
              }
            }}
            onClose={() => setDialogChart2Open(false)}
            data={personnelChartType}
          />

        )}

        {isDialogChart3Open && (
          <TagDialog
            dialogType={2}
            selected={selectedChart3!.intId}
            onConfirm={(intId) => {
              const found = periodChartType.find((item) => item.intId === intId);
              if (found) {
                setSelectedChart3(found);
                if (dashboardData) {
                  const updatedCharts = processCharts(
                    dashboardData.statistics[2].records,
                    found.description
                  );
                  setPeriodCharts(updatedCharts);
                }
              }
            }}
            onClose={() => setDialogChart3Open(false)}
            data={periodChartType}
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
            groupData={personnelData}
            selectedGroups={selectedGroups}
            onChange={(updatedMap) => {
              setSelectedGroups(updatedMap);
            }}
          />
        )}

        {isPeriodGroupDialogOpen && (
          <GroupDialog
            onClose={() => setPeriodGroupDialogOpen(false)}
            groupData={periodData}
            selectedGroups={selectedPeriodGroups}
            onChange={(updatedMap) => {
              setSelectedPeriodGroups(updatedMap);
            }}
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
                {dashboardData?.projecttags ? <Button
                  onClick={() => setDialogOpen(!isDialogOpen)}
                  style={{ background: tagColors[selectedTag?.intId ?? 0] || colors.bookedStatus, fontWeight: 600, fontSize: 14 }}
                  className="text-white hover:bg-blue-600 rounded-md flex items-center gap-1 cursor-pointer"
                >
                  {selectedTag?.description}
                  <ChevronDown size={14} />
                </Button> : <SkeletonBox height="h-8" width="w-[120px]" rounded="rounded-md" />
                }

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
                    {dashboardData.projects
                      .filter((project) => project.tagId === selectedTag?.intId)
                      .map((project) => (
                        <div
                          key={project.projectId}
                          className="relative min-w-[240px] max-w-[320px] rounded-xl overflow-hidden shadow cursor-pointer"
                        >
                          {projectImages[project.photo] ? (
                            <img
                              src={projectImages[project.photo]}
                              alt={project.projectName}
                              className="h-64 object-cover"
                            />
                          ) : (
                            <div className="min-w-[240px] h-64 bg-gray-200 animate-pulse rounded-xl" />
                          )}

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
            <CardContent className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div style={{ fontSize: '20px', fontWeight: 700, color: colors.blackDark }}>Activities</div>
                <img
                  className="cursor-pointer"
                  src={IconPaths.filter}
                  onClick={() =>
                    !dashboardData?.activityfilters
                      ? null
                      : setDialogFilterOpen(!isDialogFilterOpen)
                  }
                  alt="icon filter"
                />
              </div>

              <div className="flex flex-col flex-1 space-y-4">
                {!dashboardData ? (
                  Array(3)
                    .fill(0)
                    .map((_, idx) => <SkeletonBox key={idx} height="h-16" className="w-full" />)
                ) : (
                  <>
                    {dashboardData.activities &&
                      dashboardData.activities.filter((activity) => activity.category === selectedFilter?.intId).length > 0 ? (
                      dashboardData.activities
                        .filter((activity) => activity.category === selectedFilter?.intId)
                        .map((activity) => (
                          <StatusCard
                            key={activity.category}
                            activity={activity}
                            activityName={
                              dashboardData.activityfilters[activity.category]?.description
                            }
                          />
                        ))
                    ) : (
                      <div>
                        <span style={{ fontSize: 14, color: colors.greyInputText }}>
                          Nothing to show
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {dashboardData?.activities && dashboardData.activities.length > 0 && (
                <div className="flex justify-end mt-4">
                  <span
                    style={{
                      fontSize: 14,
                      color: colors.redRuby,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View More
                  </span>
                </div>
              )}
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
                      {!dashboardData ? (
                        <SkeletonBox height="h-6" width="w-32" />
                      ) : selectedChart1 ? (
                        <>
                          <p
                            onClick={() => setDialogChart1Open(!isDialogChart1Open)}
                            style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}
                          >
                            {selectedChart1!.description}
                          </p>
                          <ChevronDown size={22} color={colors.redRuby} />
                        </>
                      ) : (
                        <span style={{ fontSize: 14, color: colors.greyInputText }}>Not available</span>
                      )}
                    </div>
                    {!dashboardData ? <SkeletonBox height="h-8" width="w-[110px]" rounded="rounded-full" />
                      : <Button onClick={() => setPropertyDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                        Property
                        <ChevronDown size={14} />
                      </Button>}

                  </div>
                </div>

                {dashboardData ? (
                  <ChartCarousel
                    key={`property-${selectedChart1?.intId ?? 0}`}
                    charts={propertyCharts}
                  />


                ) : (
                  <SkeletonBox height="h-[200px]" className="w-full rounded-xl" />
                )}


                <div className="flex flex-col mt-8">
                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontFamily: fonts.outfit }}>By Personnel</div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="flex items-center gap-2">
                        {!dashboardData ? (
                          <SkeletonBox height="h-6" width="w-32" />
                        ) : selectedChart2 ? (
                          <>
                            <p
                              onClick={() => setDialogChart2Open(!isDialogChart2Open)}
                              style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}
                            >
                              {selectedChart2.description}
                            </p>
                            <ChevronDown size={22} color={colors.redRuby} />
                          </>
                        ) : (
                          <span style={{ fontSize: 14, color: colors.greyInputText }}>Not available</span>
                        )}
                      </div>
                    </div>
                    {dashboardData ? <Button onClick={() => setGroupDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                      Group
                      <ChevronDown size={14} />
                    </Button> : <SkeletonBox height="h-8" width="w-[110px]" rounded="rounded-full" />
                    }

                  </div>
                  {dashboardData ? (
                    <ChartCarousel
                      key={`personnel-${selectedChart2?.intId ?? 0}`}
                      charts={personnelCharts}
                    />

                  ) : (
                    <SkeletonBox height="h-[200px]" className="w-full rounded-xl" />
                  )}
                </div>
                <div className="flex flex-col mt-8">
                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontFamily: fonts.outfit }}>By Period</div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="flex items-center gap-2">
                        {!dashboardData ? (
                          <SkeletonBox height="h-6" width="w-32" />
                        ) : selectedChart3 ? (
                          <>
                            <p
                              onClick={() => setDialogChart3Open(!isDialogChart3Open)}
                              style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}
                            >
                              {selectedChart3.description}
                            </p>
                            <ChevronDown size={22} color={colors.redRuby} />
                          </>
                        ) : (
                          <span style={{ fontSize: 14, color: colors.greyInputText }}>Not available</span>
                        )}
                      </div>
                    </div>
                    {dashboardData ? <Button onClick={() => setPeriodGroupDialogOpen(true)} variant="custom" className="rounded-full flex items-center gap-4 cursor-pointer" style={{ padding: '6px 16px', border: `1px solid ${colors.redRuby}`, color: colors.blackDark, fontSize: '14px', backgroundColor: 'transparent' }}>
                      Group
                      <ChevronDown size={14} />
                    </Button> : <SkeletonBox height="h-8" width="w-[110px]" rounded="rounded-full" />
                    }

                  </div>
                  <ChartCarousel
                    key={`period-${selectedChart2?.intId ?? 0}`}
                    charts={periodCharts}
                  />

                </div>

              </CardContent>
            </Card>
          </div>


        </div>
      </div>

    </>
  );
}
