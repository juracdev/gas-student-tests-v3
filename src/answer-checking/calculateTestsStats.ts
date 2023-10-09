import { Answer } from '../models/Answer';
import { TestResult } from '../models/TestResult';

export function calculateTestsStats(testResults: TestResult[]): void {
  testResults.forEach((testResult) => {
    const totalAmount = testResult.answers.length;
    const incorrectAnsAmount = testResult.answers.filter(filterIncorrectAnswers).length;
    const correctAnsAmount = totalAmount - incorrectAnsAmount;
    const percentage = Number((correctAnsAmount / totalAmount).toFixed(3));

    testResult.stats = {
      incorrectAnsAmount,
      correctAnsAmount,
      percentage,
    };
  });
}

function filterIncorrectAnswers(ans: Answer) {
  return ans.manualCheckedResult ? ans.manualCheckedResult.isError : ans.checkedResult!.isError;
}
