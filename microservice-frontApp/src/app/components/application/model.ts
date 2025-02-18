export class JobApplication {
  applicationId?: number;
  jobId: number;
  userId: number;
  resumePath: string;
  status: ApplicationStatus;
  applicationTimestamp: Date;
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  REVIEWED = 'REVIEWED',
  INTERVIEWED = 'INTERVIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}
