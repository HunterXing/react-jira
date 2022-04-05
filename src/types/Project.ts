// 项目的interface
export interface Project {
  id: number;
  personId: number | string;
  name: string;
  organization: string;
  created: number;
  pin?: boolean;
}
