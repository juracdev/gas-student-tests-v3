import { generateQuestionsSheet } from '../test-generation/generateQuestionsSheet';
import { createSheet } from '../utils/sheetUtils';
import { CombinedQuiestion, combineQuestionsFromSourceSheets } from './combineQuestionsFromSourceSheets';
import { DiscQuestionsAmounts, VariantsSchemes, createVariantsSchemes } from './createVariantsSchemes';
import { DiscQuiestion, parseSourceSheetsQuestions } from './parsing/parseSourceSheetsQuestions';
import { parseSourceSheetsSettings } from './parsing/parseSourceSheetsSettings';
import { parseVariantsSettings } from './parsing/parseVariantsSettings';
import { VariantQuestions, populateVariantsShemes } from './populateVariantsShemes';

// TODO
// Сделать выбор директории
// Сделать размер варианта внешним параметром

export function generateTestVariants(varSize: number) {
  const variantSettings = parseVariantsSettings();
  console.log(JSON.stringify(variantSettings));

  const ssSettings = parseSourceSheetsSettings();
  const ssQuestions = parseSourceSheetsQuestions(ssSettings);

  const ssQuestionsAmounts: DiscQuestionsAmounts = Object.entries(ssQuestions).reduce((acc, [key, values]) => {
    acc[key] = values.length;
    return acc;
  }, {});

  const schemes = createVariantsSchemes(variantSettings, ssQuestionsAmounts);

  console.log(JSON.stringify(schemes));

  const variantQuestions = populateVariantsShemes(schemes, ssQuestions);

  createVariantsSheets(variantQuestions);
}

function createVariantsSheets(vartiantQuestionsArray: VariantQuestions[]): void {
  vartiantQuestionsArray.forEach((variantQuestion, variantIdx) => {
    Object.entries(variantQuestion).forEach(([testName, variant]) => {
      let testQuestions: DiscQuiestion[] = [];
      Object.values(variant).forEach((quests) => {
        testQuestions.push(...quests);
      });
      testQuestions = testQuestions.sort(() => Math.random() - 0.5);

      const sheetName = `${testName}. Вариант${variantIdx + 1}`;
      const sheet = createSheet({ dirId: '1hVw9I8Tvi_-twUsMbu0s0fyd07XfEvPp', title: sheetName });
      generateQuestionsSheet(testQuestions, sheet.getId());

      console.log(`=== ${sheetName} ===`);
      testQuestions.forEach((q, idx) => {
        console.log(JSON.stringify({ i: idx + 1, disc: q.discName, n: q.number }));
      });
    });
  });
}

function createVariantSheet(quests: CombinedQuiestion[]) {
  const sheet = createSheet({ dirId: '1YGVOqTe9xSXxV546-lkdtc-YJeQ2hI-i' });
  generateQuestionsSheet(quests, sheet.getId());

  console.log(`==============================`);
  quests.forEach((q, idx) => {
    console.log(JSON.stringify({ i: idx + 1, t: q.sheetTitle, n: q.number }));
  });
}
