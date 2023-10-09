import { CONSTANTS } from '../constants';
import { ManualCheckStudentRules, ManualCheckTestRules } from '../models/ManualCheck';

export function parseManualCheckSheet(sheetId?: string): ManualCheckTestRules {
  const testRules: ManualCheckTestRules = {};

  const ss = sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive();
  const rulesSheet = ss.getSheetByName(CONSTANTS.SHEET_MANUAL_CHECK_RULES_NAME);

  if (!rulesSheet) return testRules;

  const [titlesRow, ...rows] = rulesSheet!.getDataRange().getValues();

  rows.forEach((row) => {
    const [studentLastName, rulesString] = row;
    const studentRules = parseRulesString(rulesString);
    testRules[studentLastName] = studentRules;
  });

  return testRules;
}

/* Пример rulesString:
    2+; 7-; 13+
*/
function parseRulesString(rulesString: string): ManualCheckStudentRules {
  const result: ManualCheckStudentRules = {};
  const rulesSubstrings = rulesString.split(CONSTANTS.MANUAL_CHECK_RULES_DELIMITER);

  rulesSubstrings.forEach((ruleStr) => {
    const match = ruleStr.match(/\d+/);
    if (!match) return;
    const qNum = Number(match[0]);
    result[qNum] = { isError: getRuleValue(ruleStr) };
  });

  return result;
}

function getRuleValue(ruleStr): boolean {
  return !/\+/.test(ruleStr);
}
