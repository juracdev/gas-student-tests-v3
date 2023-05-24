/*  Собрать вопросы из нескольких файлов таблиц */

import { Question, QuestionType } from '../../models/Question';
import { parseQuestionSheet } from '../../parsing/parseQuestionSheet';

interface CombinedSheetOptions {
  sheetId: string;
  sheetTitle: string;
  questTypes?: QuestionType[];
}

export type CombinedQuiestion = Question & { sheetTitle: string };

export function combineQuestionsFromSheets(options: CombinedSheetOptions[]): CombinedQuiestion[] {
  const result: CombinedQuiestion[] = [];

  options.forEach(({ sheetId, sheetTitle, questTypes }) => {
    let questions = parseQuestionSheet(sheetId);

    if (questTypes && questTypes.length > 0) {
      questions = questions.filter((q) => questTypes.includes(q.type));
    }

    const sheetQuestions: CombinedQuiestion[] = questions.map((x) => ({ ...x, sheetTitle }));
    result.push(...sheetQuestions);
  });

  return result;
}
