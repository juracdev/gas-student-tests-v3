import { CONSTANTS } from '../constants';
import { Question, QuestionType } from '../models/Question';
import { clearStringSpaces } from '../utils/stringUtils';

export function generateQuestionsSheet(quesions: Question[], sheetId?: string) {
  const questSheet = (sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive()).insertSheet();
  const sheetName = `Вопросы ${(Math.random() + 1).toString(36).substring(7)}`;
  questSheet.setName(sheetName);

  questSheet
    .getRange('A1:G1')
    .setValues([
      ['Номер', 'Тип вопроса', 'Вопрос', 'Правильный ответ', 'Варианты', 'Ключи', 'Проверять порядок ключей'],
    ]);

  let currentRow = 2;

  quesions.forEach((quest) => {
    const sheetRow = getSheetRow(quest);
    questSheet.getRange(currentRow, 1, 1, sheetRow.length).setValues([sheetRow]);
    currentRow++;
  });
}

function getSheetRow(quest: Question): (string | number)[] {
  const type = quest.type === QuestionType.text ? 'текст' : 'выбор';

  let variantsStr = '';

  if (quest.type === QuestionType.choice) {
    const reg = new RegExp(`${CONSTANTS.CHOICE_VARIANTS_DELIMITER}`, 'ig');
    variantsStr = quest
      .choiceVariants!.map((x) => clearStringSpaces(x.replace(reg, '')))
      .join(CONSTANTS.CHOICE_VARIANTS_DELIMITER);
  }

  const rightAnswer =
    quest.type === QuestionType.choice
      ? quest.choiceAnswersIdx!.map((x) => x + 1).join(CONSTANTS.CHOICE_ANSWERS_DELIMITER)
      : quest.correctAnsText!;

  const sheetRow = [quest.number, type, quest.questText, rightAnswer, variantsStr];

  if (quest.type === QuestionType.text) {
    let keys: string[];

    if (quest.keys && quest.keys.length > 0) {
      keys = quest.keys.map((key) =>
        key.values.length > 1 ? `[${key.values.join(` ${CONSTANTS.TEXT_KEY_VALUES_DELIMITER} `)}]` : key.values[0]
      );
    } else {
      keys = quest.correctAnsText!.split(' ').map((x) => x.trim().toLowerCase());
    }

    const keysStr = keys.join(`${CONSTANTS.TEXT_KEYS_DELIMITER} `);
    sheetRow.push(keysStr);

    if (quest.isKeysOrdered) {
      sheetRow.push(CONSTANTS.TEXT_IS_KEY_ORDERED_CELL_VALUE);
    }
  }

  return sheetRow;
}
