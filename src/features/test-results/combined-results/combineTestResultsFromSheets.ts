/*  Собрать результаты тестов */

import { TestResult } from '../../../models/TestResult';
import { getTestResults } from '../getTestResults';

interface TestResultCombineOption {
  groupName: string;
  sheetId: string;
  sheetTitle: string;
}

export interface TestResultGroups {
  [groupName: string]: TestResultGroup[];
}

export interface TestResultGroup {
  sheetId: string;
  sheetTitle: string;
  results: TestResult[];
}

const OPTIONS: TestResultCombineOption[] = [
  {
    groupName: 'тигп',
    sheetId: '1UdMjqZCMhxOImDv_w7braHDpKaFX22Xv_k3yAgqx2CQ',
    sheetTitle: 'тигп Вариант 1',
  },
  {
    groupName: 'тигп',
    sheetId: '1bpSxAo4McDm5XGQ1H9BwJSLKwieqaXudAvVY3C4KqwI',
    sheetTitle: 'тигп Вариант 2',
  },
];

export function combineTestResultsFromSheets(): TestResultGroups {
  const groups: TestResultGroups = {};

  OPTIONS.forEach(({ groupName, sheetId, sheetTitle }) => {
    const results = getTestResults(sheetId);

    if (results.length === 0) return;

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push({ sheetId, sheetTitle, results });
  });

  return groups;
}
