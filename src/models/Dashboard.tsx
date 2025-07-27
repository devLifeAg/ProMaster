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
