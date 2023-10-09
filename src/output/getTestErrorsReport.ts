import { CONSTANTS } from '../constants';
import { Answer } from '../models/Answer';
import { QuestionType } from '../models/Question';
import { TestResult } from '../models/TestResult';

export interface TestErrorsRepot {
  testTitle: string;
  firstName: string;
  lastName: string;
  passedAt: Date;
  percentage: number;
  correctAnsAmount: number;
  incorrectAnsAmount: number;
  choiceErrors: string[];
  textErrors: string[];
}

export function getTestErrorsReport(testResults: TestResult[]): TestErrorsRepot[] {
  const reports: TestErrorsRepot[] = [];

  testResults.forEach((tr) => {
    const ansGroups = splitAnswersByGroups(tr.answers);
    const { correctAnsAmount, incorrectAnsAmount, percentage } = tr.stats!;

    const choiceErrors = ansGroups.choiceErrors.map(stringifyError);
    const textErrors = ansGroups.textErrors.map(stringifyError);

    const report: TestErrorsRepot = {
      testTitle: tr.testTitle,
      lastName: tr.studentLastname,
      firstName: tr.studentFirstname,
      passedAt: tr.passedAt,
      correctAnsAmount,
      incorrectAnsAmount,
      percentage,
      textErrors,
      choiceErrors,
    };

    reports.push(report);
  });

  return reports;
}

interface AnswersGroups {
  /*  choice, multiChoice, grid */
  choiceErrors: Answer[];
  /*  text */
  textErrors: Answer[];
}

function splitAnswersByGroups(answers: Answer[]): AnswersGroups {
  const result: AnswersGroups = {
    choiceErrors: [],
    textErrors: [],
  };

  answers.forEach((ans) => {
    const isError = ans.manualCheckedResult ? ans.manualCheckedResult.isError : ans.checkedResult!.isError;
    if (!isError) return;

    if (ans.quest.type === QuestionType.text) {
      result.textErrors.push(ans);
    } else {
      result.choiceErrors.push(ans);
    }
  });

  return result;
}

function stringifyTextKeys(keys: string[]): string {
  if (keys.length === 0) return '';
  return keys.length === 1 ? keys[0] : `[${keys.join(' & ')}]`;
}

function stringifyError(ans: Answer): string {
  const quest = ans.quest;
  let result = `Вопрос №${quest.number}. ${quest.questText}\n`;

  if (ans.quest.type === QuestionType.choice || ans.quest.type === QuestionType.multiChoice) {
    result += stringifyChoice(ans);
  }

  if (ans.quest.type === QuestionType.text) {
    result += stringifyText(ans);
  }

  // TODO добавить строку для сетки

  return result;
}

function stringifyChoice(ans: Answer): string {
  const quest = ans.quest;
  let result = '';

  const variants = quest.choiceVariants!;
  const correctIdxs = quest.choiceAnswersIdx!;
  const givenIdxs = ans.givenChoiceAnswersIdx!;
  const correctText = correctIdxs.map((idx) => `${CONSTANTS.CHOICE_VARS_NUMERATORS[idx]}) ${variants[idx]}`).join('; ');
  const givenText = givenIdxs.map((idx) => `${CONSTANTS.CHOICE_VARS_NUMERATORS[idx]}) ${variants[idx]}`).join('; ');
  result += `Правильный ответ: ${correctText}\nДан ответ: ${givenText}`;

  if (ans.manualCheckedResult) {
    result += '\nОтмечен неправильным при ручной проверке.';
  }

  return result;
}

function stringifyText(ans: Answer): string {
  const quest = ans.quest;
  let result = `Правильный ответ: ${quest.correctAnsText}\nДан ответ: ${ans.givenText}`;

  if (ans.manualCheckedResult) {
    result += '\nОтмечен неправильным при ручной проверке.';
  } else {
    const foundKeys = ans.checkedResult!.foundKeys!.map((key) => stringifyTextKeys(key.values)).join('; ');
    const unfoundKeys = ans.checkedResult!.unfoundKeys!.map((key) => stringifyTextKeys(key.values)).join('; ');
    result += `\nНайденные ключи: ${foundKeys}\nОтсутствующие ключи: ${unfoundKeys}`;
    if (ans.checkedResult!.isCorrectOrder === false) {
      result += '\nПорядок ключей неправильный!';
    }
  }

  return result;
}
