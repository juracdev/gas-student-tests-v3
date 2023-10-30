import { generateQuestionsSheet } from '../test-generation/generateQuestionsSheet';
import { createSheet } from '../utils/sheetUtils';
import { CombinedQuiestion, combineQuestionsFromSourceSheets } from './combineQuestionsFromSourceSheets';
import { parseSourceSheetsSettings } from './parsing/parseSourceSheetsSettings';
import { parseVariantsSettings } from './parsing/parseVariantsSettings';

// TODO
// Сделать выбор директории
// Сделать размер варианта внешним параметром

export function generateTestVariants(varSize: number) {
  const settings = parseVariantsSettings();
  console.log(JSON.stringify(settings));

  // const settings = parseSourceSheetsSettings();

  // let questions = combineQuestionsFromSourceSheets(settings);

  // questions = questions.sort(() => Math.random() - 0.5);

  // const varAmounts = Math.ceil(questions.length / varSize);

  // for (let i = 0; i < varAmounts; i++) {
  //   const slice = questions.slice(i * varSize, (i + 1) * varSize);
  //   createVariantSheet(slice);
  // }
}

function createVariantSheet(quests: CombinedQuiestion[]) {
  const sheet = createSheet({ dirId: '1YGVOqTe9xSXxV546-lkdtc-YJeQ2hI-i' });
  generateQuestionsSheet(quests, sheet.getId());

  console.log(`==============================`);
  quests.forEach((q, idx) => {
    console.log(JSON.stringify({ i: idx + 1, t: q.sheetTitle, n: q.number }));
  });
}
