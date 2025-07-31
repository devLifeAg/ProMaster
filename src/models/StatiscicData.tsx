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


export interface ListGroup {
  chartName: string,
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

export function processCharts(statistics: StatisticRecord[], selectedChartName: string, listName: string[] = []): ChartDataItem[] {
  // Lọc theo chartName và nếu có listName thì lọc thêm itemColName
  const filtered = statistics.filter(item =>
    item.chartName === selectedChartName &&
    (listName.length === 0 || listName.includes(item.chartIdentityName))
  );

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
    // Map lưu group name => Set<chartIdentityName> và chartName
    const groupMap = new Map<string, { chartName: string; items: Set<string> }>();
    const chartTypeMap = new Map<string, number>();
    let chartTypeIndex = 1;

    for (const record of statistic.records) {
      const { group, chartIdentityName, chartName } = record;

      if (!groupMap.has(group)) {
        groupMap.set(group, { chartName, items: new Set<string>() });
      }
      groupMap.get(group)!.items.add(chartIdentityName);

      if (!chartTypeMap.has(chartName)) {
        chartTypeMap.set(chartName, chartTypeIndex++);
      }
    }

    const groupedData: ListGroup[] = Array.from(groupMap.entries()).map(([groupName, { chartName, items }]) => ({
      chartName,
      groupName,
      itemsName: Array.from(items),
    }));

    const chartTypes: { intId: number; description: string }[] = Array.from(chartTypeMap.entries()).map(
      ([description, intId]) => ({ intId, description })
    );

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
