export enum Status {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED'
}

export enum ProgramType {
  TOURISM = 'TOURISM',
  CULTURE = 'CULTURE',
  EDUCATION = 'EDUCATION',
  PROFESSIONAL = 'PROFESSIONAL'
}

export class ExchangeProgram {
  exchangeId?: number;
  name?: string;
  description?: string;
  type?: ProgramType;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  capacity?: number;
  participantsNbr?: number;
  status?: Status;
  details?: string;
}
