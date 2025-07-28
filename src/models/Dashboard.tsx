export interface UserProfile {
  userId: number;
  profileName: string;
  teamId: number;
  teamName: string;
}

export interface ProjectTag {
  intId: number;
  id: string;
  description: string;
}

export interface Project {
  ticketId: number;
  projectId: number;
  projectName: string;
  projectAddress: string;
  isFeature: boolean;
  photo: string;
  tagId: number;
  tagName: string;
}

export interface ActivityFilter {
  intId: number;
  id: string;
  description: string;
}

export interface Activity {
  category: number;
  activityTitle: string;
  activityDate: number;
  status: string;
}

export interface StatisticRecord {
  chartType: string;
  chartName: string;
  group: string;
  chartIdentityName: string;
  filter: string;
  itemColName: string;
  xAxisName: string;
  xAxisColName: string;
  yAxisName: string;
  yAxisColName: number;
}

export interface Statistic {
  statisticName: string;
  generatedDate: number;
  records: StatisticRecord[];
}

export interface DashboardData {
  userprofile: UserProfile;
  projecttags: ProjectTag[];
  projects: Project[];
  activityfilters: ActivityFilter[];
  activities: Activity[];
  statistics: Statistic[];
}

export interface ListGroup {
  groupName: string;
  itemsName: string[];
}

export interface ChartDataItem {
  chartType: string;
  chartName: string;
  chartIdentityName: string;
  data: {
    label: string;
    value: number;
    unit: string;
  }[];
}

export function processCharts(statistics: StatisticRecord[], selectedChartName: string): ChartDataItem[] {
  // Lọc theo chartName (chính là selectedChartX.description)
  const filtered = statistics.filter(item => item.chartName === selectedChartName);

  const groupedByIdentity = new Map<string, ChartDataItem>();

  for (const item of filtered) {
    const key = item.chartIdentityName;

    if (!groupedByIdentity.has(key)) {
      groupedByIdentity.set(key, {
        chartType: item.chartType,
        chartName: item.chartName,
        chartIdentityName: item.chartIdentityName,
        data: [],
      });
    }

    const group = groupedByIdentity.get(key)!;

    const label = item.itemColName;
    const existing = group.data.find(d => d.label === label);

    const value = typeof item.yAxisColName === 'number' ? item.yAxisColName : 0;

    if (existing) {
      existing.value += value;
    } else {
      group.data.push({
        label: label,
        value: value,
        unit: item.yAxisName,
      });
    }
  }

  return Array.from(groupedByIdentity.values());
}



export function processStatistics(statistics: Statistic[]) {
  const result = {
    propertyData: [] as ListGroup[],
    propertyChartType: [] as { intId: number; description: string }[],
    personnelData: [] as ListGroup[],
    personnelChartType: [] as { intId: number; description: string }[],
    periodData: [] as ListGroup[],
    periodChartType: [] as { intId: number; description: string }[],
  };

  statistics.forEach((statistic, index) => {
    const map = new Map<string, Set<string>>();
    const chartTypeMap = new Map<string, number>();
    let chartTypeIndex = 1;

    for (const record of statistic.records) {
      const { group, chartIdentityName, chartName } = record;

      // Nhóm chartIdentity theo group
      if (!map.has(group)) {
        map.set(group, new Set());
      }
      map.get(group)!.add(chartIdentityName);

      // Gán intId cho từng xAxisName theo thứ tự xuất hiện
      if (!chartTypeMap.has(chartName)) {
        chartTypeMap.set(chartName, chartTypeIndex++);
      }
    }

    const groupedData: ListGroup[] = Array.from(map, ([groupName, itemsSet]) => ({
      groupName,
      itemsName: Array.from(itemsSet),
    }));

    const chartTypes: { intId: number; description: string }[] = Array.from(chartTypeMap, ([description, intId]) => ({
      intId,
      description,
    }));

    if (index === 0) {
      result.propertyData = groupedData;
      result.propertyChartType = chartTypes;
    } else if (index === 1) {
      result.personnelData = groupedData;
      result.personnelChartType = chartTypes;
    } else if (index === 2) {
      result.periodData = groupedData;
      result.periodChartType = chartTypes;
    }
  });

  return result;
}

