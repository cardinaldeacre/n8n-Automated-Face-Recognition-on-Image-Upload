export interface Application {
  id: number;
  student_name: string;
  // date: string;
  start_time: string;
  end_time: string;
  purpose: string;
  destination?: string;
  status: 'approve' | 'waiting';
}

export interface EventItem {
  name: string;
  details: string;
}
