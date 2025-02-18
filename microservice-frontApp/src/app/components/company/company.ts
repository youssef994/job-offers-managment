export class CompanyDetails {
  companyId!: number;
  userId!: number;
  companyName!: string;
  email!: string;
  employeeNumber!: number;
  fullName!: string;
  phone!: number;
  picture!: string;
  jobDetails?: JobDetails[];
}

export class JobDetails {
  jobId!: number;
  jobTitle!: string;
  peopleNumber!: number;
  location!: string;
  jobType!: JobType;
  nbrHours!: number;
  startDate!: Date;
  salary!: number;
  description!: string;
  companyDetails?: CompanyDetails;
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  TEMPORARY = 'TEMPORARY',
  INTERNSHIP = 'INTERNSHIP',
  PERMANENT = 'PERMANENT',
}

export enum Period {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
