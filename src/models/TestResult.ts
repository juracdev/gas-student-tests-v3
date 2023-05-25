import { Answer } from './Answer';

export interface TestResult {
  studentFirstname: string;
  studentLastname: string;
  passedAt: Date;

  answers: Answer[];
  stats?: TestResultStats;
}

export interface TestResultStats {
  correctAnsAmount: number;
  incorrectAnsAmount: number;
  percentage: number;
}
