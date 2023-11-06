import { Question } from '../../models/Question';
import { parseQuestionSheet } from '../../parsing/parseQuestionSheet';
import { SourceSheetsSettings } from './parseSourceSheetsSettings';

export type DiscQuiestion = Question & { discName: string };

export interface SourceSheetsQuestions {
  [discName: string]: DiscQuiestion[];
}

export function parseSourceSheetsQuestions(settings: SourceSheetsSettings[]): SourceSheetsQuestions {
  const result: SourceSheetsQuestions = {};

  settings.forEach(({ sheetId, discName, questTypes }) => {
    let questions = parseQuestionSheet(sheetId);

    if (questTypes && questTypes.length > 0) {
      questions = questions.filter((q) => questTypes.includes(q.type));
    }

    const discQuestions: DiscQuiestion[] = questions.map((x) => ({ ...x, discName }));
    result[discName] = discQuestions;
  });

  return result;
}
