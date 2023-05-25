import { calculateTestsStats } from '../../answer-checking/calculateTestsStats';
import { checkTestResults } from '../../answer-checking/checkAnswers';
import { TestResult } from '../../models/TestResult';
import { parseAnswerSheet } from '../../parsing/parseAnswerSheet';
import { parseQuestionSheet } from '../../parsing/parseQuestionSheet';

export function getTestResults(sheetId?: string): TestResult[] {
  const questions = parseQuestionSheet(sheetId);
  const testResults = parseAnswerSheet(questions, sheetId);

  checkTestResults(testResults);
  calculateTestsStats(testResults);

  return testResults;
}
