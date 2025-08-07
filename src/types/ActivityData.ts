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