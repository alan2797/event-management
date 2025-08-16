export interface Task {
  id: number;
  title: string;
  description?: string;
  direction?: string;
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  type?: string;
  completed: boolean;
}
