import { calculateTestsStats } from '../../answer-checking/calculateTestsStats';
import { checkTestResults } from '../../answer-checking/checkAnswers';
import { TestResult } from '../../models/TestResult';
import { parseAnswerSheet } from '../../parsing/parseAnswerSheet';
import { parseManualCheckSheet } from '../../parsing/parseManualCheckSheet';
import { parseQuestionSheet } from '../../parsing/parseQuestionSheet';

export function getTestResults(sheetId?: string): TestResult[] {
  const questions = parseQuestionSheet(sheetId);
  const testResults = parseAnswerSheet(questions, sheetId);
  const manualCheckRules = parseManualCheckSheet(sheetId);

  checkTestResults(testResults, manualCheckRules);
  calculateTestsStats(testResults);

  console.log(JSON.stringify(testResults));

  return testResults;
}
