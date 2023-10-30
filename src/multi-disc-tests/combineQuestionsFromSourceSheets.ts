/*  Собрать вопросы из нескольких файлов таблиц */

import { Question } from '../models/Question';
import { parseQuestionSheet } from '../parsing/parseQuestionSheet';
import { SourceSheetsSettings } from './parsing/parseSourceSheetsSettings';

export type CombinedQuiestion = Question & { sheetTitle: string };

export function combineQuestionsFromSourceSheets(options: SourceSheetsSettings[]): CombinedQuiestion[] {
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
