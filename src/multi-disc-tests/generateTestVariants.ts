import { CombinedQuiestion, combineQuestionsFromSheets } from '../features/questions/combineQuestionsFromSheets';
import { QuestionType, questionTypesMap } from '../models/Question';
import { generateQuestionsSheet } from '../test-generation/generateQuestionsSheet';
import { createSheet } from '../utils/sheetUtils';

// TODO
// Сделать выбор директории
// Сделать размер варианта внешним параметром

export function generateTestVariants() {
  const settings = parseVariantsSettings();

  let questions = combineQuestionsFromSheets(settings);

  questions = questions.sort(() => Math.random() - 0.5);

  const VAR_SIZE = 31;
  const varAmounts = Math.ceil(questions.length / VAR_SIZE);

  for (let i = 0; i < varAmounts; i++) {
    const slice = questions.slice(i * VAR_SIZE, (i + 1) * VAR_SIZE);
    createVariantSheet(slice);
  }
}

function createVariantSheet(quests: CombinedQuiestion[]) {
  const sheet = createSheet({ dirId: '1YGVOqTe9xSXxV546-lkdtc-YJeQ2hI-i' });
  generateQuestionsSheet(quests, sheet.getId());

  console.log(`==============================`);
  quests.forEach((q, idx) => {
    console.log(JSON.stringify({ i: idx + 1, t: q.sheetTitle, n: q.number }));
  });
}

interface VariantsSetting {
  sheetId: string;
  sheetTitle: string;
  questTypes?: QuestionType[];
}

function parseVariantsSettings(): VariantsSetting[] {
  const VARIANTS_DOCS_SH_NAME = 'VariantsDocs';
  const sheet = SpreadsheetApp.getActive().getSheetByName(VARIANTS_DOCS_SH_NAME);
  const [titlesRow, ...rows] = sheet!.getDataRange().getValues();
  const settings: VariantsSetting[] = [];

  rows.forEach((row) => {
    const [sheetId, sheetTitle, questTypesStr] = row;
    const setting: VariantsSetting = {
      sheetId,
      sheetTitle,
    };
    if (questTypesStr) {
      setting.questTypes = questTypesStr.split(';').map((x) => questionTypesMap[x.trim()]);
    }
    settings.push(setting);
  });

  return settings;
}
