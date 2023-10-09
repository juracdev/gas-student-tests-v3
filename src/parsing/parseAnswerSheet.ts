import { CONSTANTS } from '../constants';
import { Answer } from '../models/Answer';
import { GridAnswers, Question, QuestionType } from '../models/Question';
import { TestResult } from '../models/TestResult';
import { clearStringSpaces, upperFirstLetter } from '../utils/stringUtils';

export function parseAnswerSheet(questions: Question[], sheetId?: string): TestResult[] {
  const testResults: TestResult[] = [];
  const ss = sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive();
  const ansSheet = ss.getSheetByName(CONSTANTS.SHEET_ANSWER_NAME);

  const [titlesRow, ...rows] = ansSheet!.getDataRange().getValues();
  const questTitles = titlesRow.slice(CONSTANTS.COLS_BEFORE_ANSWERS);

  rows.forEach((row) => {
    const [timestamp, lastname, firstname, ...ansRow] = row;

    const testResult: TestResult = {
      testTitle: ss.getName(),
      studentFirstname: upperFirstLetter(firstname),
      studentLastname: upperFirstLetter(lastname),
      answers: [],
      passedAt: new Date(timestamp),
    };

    questions.forEach((q) => {
      const reg = new RegExp(`^${q.number}.`);
      const columnIdx = questTitles.findIndex((h: string) => h.match(reg));
      const answerCell: string = ansRow[columnIdx];

      const answer: Answer = { quest: q };

      if (q.type === QuestionType.text) {
        answer.givenText = clearStringSpaces(answerCell);
      }

      if (q.type === QuestionType.choice || q.type === QuestionType.multiChoice) {
        const givenChoicesIdx: number[] = [];
        const regStr = `(\\s|^)[${CONSTANTS.CHOICE_VARS_NUMERATORS.join('')}]\\)`;
        const regExp = new RegExp(regStr, 'g');
        const match = answerCell.trim().match(regExp);
        if (!match) throw new Error(`Не найден нумератор в строке "${answerCell}"`);
        const givenNumerators = match.map((x) => x.trim().replace(')', ''));
        const givenIndxs = givenNumerators.map((givenNum) =>
          CONSTANTS.CHOICE_VARS_NUMERATORS.findIndex((num) => num === givenNum)
        );
        givenChoicesIdx.push(...givenIndxs);

        answer.givenChoiceAnswersIdx = givenChoicesIdx;
      }

      if (q.type === QuestionType.grid) {
        const gridSize = q.gridLeftVariants!.length;
        const gridTitles = questTitles.slice(columnIdx, columnIdx + gridSize);
        const gridAnsCells = ansRow.slice(columnIdx, columnIdx + gridSize);
        answer.givenGridAnswers = parseGridAnswers(q.gridLeftVariants!, q.gridRightVariants!, gridTitles, gridAnsCells);
      }

      testResult.answers.push(answer);
    });

    testResults.push(testResult);
  });

  return testResults;
}

function parseGridAnswers(
  gridLeftVariants: string[],
  gridRightVariants: string[],
  titlesCells: string[],
  ansCells: string[]
): GridAnswers {
  const result: GridAnswers = {};
  gridLeftVariants.forEach((gridVarLeft, gridVarLeftIdx) => {
    const cellsIndex = titlesCells.findIndex((x) => x.indexOf(gridVarLeft) > -1);
    const gridVarRightIdx = gridRightVariants.findIndex((x) => ansCells[cellsIndex].indexOf(x) > -1);
    result[gridVarLeftIdx] = gridVarRightIdx;
  });

  return result;
}
