import { Answer } from '../models/Answer';
import { ManualCheckStudentRules, ManualCheckTestRules } from '../models/ManualCheck';
import { QuestionType } from '../models/Question';
import { TestResult } from '../models/TestResult';
import { checkChoiceAnswer } from './checkChoiceAnswer';
import { checkGridAnswer } from './checkGridAnswer';
import { checkTextAnswer } from './checkTextAnswer';

export function checkTestResults(testResults: TestResult[], manualTestRules: ManualCheckTestRules) {
  testResults.forEach((testResult) => {
    const manualStudentRules = manualTestRules[testResult.studentLastname] || {};
    checkAnswers(testResult.answers, manualStudentRules);
  });
}

function checkAnswers(answers: Answer[], manualCheckRules: ManualCheckStudentRules): void {
  answers.forEach((ans) => {
    if (ans.quest.type === QuestionType.text) {
      ans.checkedResult = checkTextAnswer(ans);
    }

    if (ans.quest.type === QuestionType.choice || ans.quest.type === QuestionType.multiChoice) {
      ans.checkedResult = checkChoiceAnswer(ans);
    }

    if (ans.quest.type === QuestionType.grid) {
      ans.checkedResult = checkGridAnswer(ans);
    }

    /*  Manual checking */
    const qNum = ans.quest.number;
    if (qNum in manualCheckRules) {
      const manualRule = manualCheckRules[qNum];
      ans.manualCheckedResult = { isError: manualRule.isError };
    }
  });
}
