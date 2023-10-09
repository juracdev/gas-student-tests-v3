import { CheckedResult } from './CheckedResult';
import { ManualCheckResult } from './ManualCheck';
import { GridAnswers, Question } from './Question';

export interface Answer {
  quest: Question;
  checkedResult?: CheckedResult;
  manualCheckedResult?: ManualCheckResult;

  /*  text */
  givenText?: string;

  /*  ch & multiCh */
  givenChoiceAnswersIdx?: number[];

  /* grid */
  givenGridAnswers?: GridAnswers;
}
