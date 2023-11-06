import { VariantsSchemes } from './createVariantsSchemes';
import { DiscQuiestion, SourceSheetsQuestions } from './parsing/parseSourceSheetsQuestions';

export interface VariantQuestions {
  [testName: string]: {
    [discName: string]: DiscQuiestion[];
  };
}

export function populateVariantsShemes(
  schemesArray: VariantsSchemes[],
  ssQuestions: SourceSheetsQuestions
): VariantQuestions[] {
  const results: VariantQuestions[] = [];

  schemesArray.forEach((schemes) => {
    const result: VariantQuestions = {};
    Object.entries(schemes).forEach(([testName, scheme]) => {
      result[testName] = {};
      Object.entries(scheme).forEach(([discName, questNumbers]) => {
        const discQuestions = ssQuestions[discName];
        const questions = questNumbers.map((num) => discQuestions.find((x) => x.number === num)!);
        result[testName][discName] = questions;
      });
    });
    results.push(result);
  });

  return results;
}
