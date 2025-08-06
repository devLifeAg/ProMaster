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





export interface DashboardData {
  userprofile: UserProfile;
  projecttags: ProjectTag[];
  projects: Project[];
}

