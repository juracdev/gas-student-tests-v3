/*  Собрать результаты тестов */

import { TestResult } from '../../../models/TestResult';
import { getTestResults } from '../getTestResults';

interface TestResultCombineOption {
  sheetId: string;
  sheetTitle: string;
}

export interface TestResultGroup {
  sheetId: string;
  sheetTitle: string;
  results: TestResult[];
}

const OPTIONS: TestResultCombineOption[] = [
  {
    sheetId: '1UdMjqZCMhxOImDv_w7braHDpKaFX22Xv_k3yAgqx2CQ',
    sheetTitle: 'тигп Вариант 1',
  },
  {
    sheetId: '1bpSxAo4McDm5XGQ1H9BwJSLKwieqaXudAvVY3C4KqwI',
    sheetTitle: 'тигп Вариант 2',
  },
];

export function combineTestResultsFromSheets(): TestResultGroup[] {
  const groups: TestResultGroup[] = [];

  OPTIONS.forEach(({ sheetId, sheetTitle }) => {
    const results = getTestResults(sheetId);

    if (results.length === 0) return;

    groups.push({ sheetId, sheetTitle, results });
  });

  return groups;
}
