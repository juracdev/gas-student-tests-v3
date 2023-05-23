import { calculateTestsStats } from './answer-checking/calculateTestsStats';
import { checkTestResults } from './answer-checking/checkAnswers';
import { TestResult } from './models/TestResult';
import { getTestErrorsReport } from './output/getTestErrorsReport';
import { writeTestResultsToSheet } from './output/writeTestResultsToSheet';
import { parseAnswerSheet } from './parsing/parseAnswerSheet';
import { parseDocumentAnswers } from './parsing/parseDocumentAnswers';
import { parseDocumentQuestions } from './parsing/parseDocumentQuestions';
import { parseQuestionSheet } from './parsing/parseQuestionSheet';
import { generateQuestionsSheet } from './test-generation/generateQuestionsSheet';
import { generateTestForm } from './test-generation/generateTestForm';

function checkAns(): TestResult[] {
  const questions = parseQuestionSheet();
  const testResults = parseAnswerSheet(questions);

  checkTestResults(testResults);
  calculateTestsStats(testResults);

  return testResults;
}

/*  Функции для вызова из внешнего проекта */

function generateForm() {
  const activeSheet = SpreadsheetApp.getActive();
  const formName = activeSheet.getName();
  const ssFile = DriveApp.getFileById(activeSheet.getId());

  const folders = ssFile.getParents();
  const parentFolderId = folders.hasNext() ? folders.next().getId() : undefined;

  const questions = parseQuestionSheet();

  generateTestForm(questions, formName, parentFolderId);
}

function writeCheckedToSheet() {
  const testResults = checkAns();
  const errorReports = getTestErrorsReport(testResults);
  writeTestResultsToSheet(errorReports);
}

function parseDocument(docId: string) {
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();

  const questions = parseDocumentQuestions(body);
  parseDocumentAnswers(body, questions);

  generateQuestionsSheet(questions);
}
