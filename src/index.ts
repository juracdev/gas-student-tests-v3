import { combineTestResultsFromSheets } from './features/test-results/combined-results/combineTestResultsFromSheets';
import { getTestResults } from './features/test-results/getTestResults';
import { generateTestVariants } from './multi-disc-tests/generateTestVariants';
import { getTestErrorsReport } from './output/getTestErrorsReport';
import { writeTestResultsToDoc } from './output/writeTestResultsToDoc';
import { writeTestResultsToSheet } from './output/writeTestResultsToSheet';
import { parseDocumentAnswers } from './parsing/parseDocumentAnswers';
import { parseDocumentQAWithTableFormat } from './parsing/parseDocumentQAWithTableFormat';
import { parseDocumentQuestions } from './parsing/parseDocumentQuestions';
import { parseManualCheckSheet } from './parsing/parseManualCheckSheet';
import { parseQuestionSheet } from './parsing/parseQuestionSheet';
import { generateManualCheckSheet } from './test-generation/generateManualCheckSheet';
import { generateQuestionsSheet } from './test-generation/generateQuestionsSheet';
import { generateTestForm } from './test-generation/generateTestForm';
import { createDoc } from './utils/docUtils';

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

function generateManualCheckRules() {
  const testResults = getTestResults();
  const lastNames = testResults.map((tr) => tr.studentLastname);
  generateManualCheckSheet(lastNames);
}

function writeCheckedToSheet() {
  const testResults = getTestResults();
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

function parseDocumentWithTableFormat(docId: string) {
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();

  const questions = parseDocumentQAWithTableFormat(body);
  generateQuestionsSheet(questions);
}

function parseManualCheckRules() {
  const rules = parseManualCheckSheet();
  console.log(JSON.stringify(rules));
}

function createVariants(varSize: number) {
  generateTestVariants(varSize);
}

function combineResults() {
  combineTestResultsFromSheets();
}

function writeCheckedToDoc() {
  const testResults = getTestResults();
  const errorReports = getTestErrorsReport(testResults);

  const activeSheet = SpreadsheetApp.getActive();
  const ssFile = DriveApp.getFileById(activeSheet.getId());

  const folders = ssFile.getParents();
  const parentFolderId = folders.hasNext() ? folders.next().getId() : undefined;

  errorReports.forEach((er) => {
    const date = er.passedAt;
    const doc = createDoc({
      title: `${er.lastName} ${er.testTitle} (${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()})`,
      dirId: parentFolderId,
    });
    const body = doc.getBody();
    writeTestResultsToDoc([er], body);
  });
}
