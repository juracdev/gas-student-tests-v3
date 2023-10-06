import { Question, QuestionType } from '../models/Question';
import { clearStringSpaces } from '../utils/stringUtils';

const DEFAULT_Q_TYPE = QuestionType.text;

/* Парсит вопросы и ответы из таблицы */

export function parseDocumentQAWithTableFormat(body: GoogleAppsScript.Document.Body): Question[] {
  const tables = body.getTables();
  const table = tables[0];
  const numRows = table.getNumRows() - 1;

  const questions: Question[] = [];

  for (let i = 1; i <= numRows; i++) {
    const row = table.getRow(i);

    const questionText = clearStringSpaces(row.getCell(1).asText().getText());
    const answerText = clearStringSpaces(row.getCell(2).asText().getText());

    const question: Question = {
      number: i,
      type: DEFAULT_Q_TYPE,
      questText: questionText,
      correctAnsText: answerText,
    };

    questions.push(question);
  }

  return questions;
}
