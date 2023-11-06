import { VariantsSettings } from './parsing/parseVariantsSettings';

export interface VariantScheme {
  [discName: string]: number[];
}

export interface VariantsSchemes {
  [testName: string]: VariantScheme;
}

export interface DiscQuestionsAmounts {
  [discName: string]: number;
}

export function createVariantsSchemes(
  settings: VariantsSettings,
  questionsAmounts: DiscQuestionsAmounts
): VariantsSchemes[] {
  const { variantsAmount, discNames, variants } = settings;
  const results: VariantsSchemes[] = [...new Array(variantsAmount)].map((_) => ({}));

  discNames.forEach((discName) => {
    const totalQuestsAmount = questionsAmounts[discName];
    for (let i = 0; i < variantsAmount; i++) {
      let avaliableQuestions = getNumbersArray(totalQuestsAmount);
      Object.entries(variants).forEach(([testName, variantSettings]) => {
        const result = results[i];
        if (!result[testName]) result[testName] = {};
        if (!result[testName][discName]) result[testName][discName] = [];
        const requiredAmount = variantSettings[discName];
        for (let j = 0; j < requiredAmount; j++) {
          const index = getRandomIntInclusive(0, avaliableQuestions.length - 1);
          const [selectedQuest] = avaliableQuestions.splice(index, 1);
          result[testName][discName].push(selectedQuest);

          if (avaliableQuestions.length === 0) {
            avaliableQuestions = getNumbersArray(totalQuestsAmount).filter(
              (x) => !result[testName][discName].includes(x)
            );
          }
        }
      });
    }
  });

  return results;
}

function getNumbersArray(amount: number): number[] {
  return [...new Array(amount)].map((_, idx) => idx + 1);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
