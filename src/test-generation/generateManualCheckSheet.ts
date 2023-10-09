import { CONSTANTS } from '../constants';

export function generateManualCheckSheet(lastNames: string[]): void {
  const manualCheckSheet = SpreadsheetApp.getActive().insertSheet();
  const sheetName = `${CONSTANTS.SHEET_MANUAL_CHECK_RULES_NAME} ${(Math.random() + 1).toString(36).substring(7)}`;
  manualCheckSheet.setName(sheetName);

  manualCheckSheet.getRange('A1:B1').setValues([['Фамилия', 'Правила проверки']]);

  let currentRow = 2;

  const sortedNames = lastNames.sort();

  sortedNames.forEach((name) => {
    manualCheckSheet.getRange(currentRow, 1, 1, 1).setValue([name]);
    currentRow++;
  });
}
