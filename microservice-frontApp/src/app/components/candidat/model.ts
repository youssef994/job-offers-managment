export interface Candidate {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  skills: Map<string, Level>;
  languageLevel: Map<Language, Level>;
  experiences: Experience[];
  educationHistory: Education[];
}

export interface Experience {
  id: number;
  companyName: string;
  poste: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

export interface Education {
  id: number;
  school: string;
  startDate: Date | null;
  endDate: Date | null;
  degree: string;
}

export enum Language {
  ARABIC = 'ARABIC',
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  SPANISH = 'SPANISH',
  GERMAN = 'GERMAN',
  OTHER = 'OTHER',
}

export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
