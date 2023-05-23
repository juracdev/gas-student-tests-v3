import { CONSTANTS } from '../constants';
import { TestErrorsRepot } from './getTestErrorsReport';

export function writeTestResultsToSheet(reports: TestErrorsRepot[]) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let checkedSheet = ss.getSheetByName(CONSTANTS.SHEET_CHECKED_NAME)!;

  if (!checkedSheet) {
    ss.insertSheet(CONSTANTS.SHEET_CHECKED_NAME);
    checkedSheet = ss.getSheetByName(CONSTANTS.SHEET_CHECKED_NAME)!;
  }

  checkedSheet
    .getRange('A1:E1')
    .setValues([
      [
        'Имя',
        'Правильных ответов, %',
        'Подробнее о правильных',
        'Ошибки в вопросах с вариантами ответа',
        'Ошибки в вопросах с текстовым ответом',
      ],
    ]);

  checkedSheet.getRange('A2:E').clearContent().setBackground('white');

  const FIRST_ROW = 2;
  let currentRow = FIRST_ROW;

  reports.forEach((report) => {
    const { lastName, firstName, correctAnsAmount, incorrectAnsAmount, percentage, choiceErrors, textErrors } = report;
    const details = `${correctAnsAmount} правильных из ${correctAnsAmount + incorrectAnsAmount} ответов, ${percentage}`;
    const studentName = `${lastName} ${firstName}`;

    checkedSheet
      .getRange(currentRow, 1, 1, 5)
      .setValues([[studentName, percentage, details, choiceErrors.join('\n\n'), textErrors.join('\n\n')]]);
  });
}
