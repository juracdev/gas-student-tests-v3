export interface VariantSettings {
  [discName: string]: number;
}

export interface VariantsSettings {
  variantsAmount: number;
  discNames: string[];
  settings: {
    [testName: string]: VariantSettings;
  };
}

export function parseVariantsSettings(): VariantsSettings {
  const VARIANTS_SH_NAME = 'VariantsSettings';
  const sheet = SpreadsheetApp.getActive().getSheetByName(VARIANTS_SH_NAME);
  const rows = sheet!.getDataRange().getValues();

  /* глобальные настройки */
  const variantsAmount = Number(rows[1][0]);

  /* настройки вариантов */
  const variantsRows = rows.slice(4);

  const result: VariantsSettings = {
    variantsAmount,
    discNames: [],
    settings: {},
  };

  variantsRows.forEach(([testName, questsStr]) => {
    const variant = parseQuestStr(questsStr);
    result.settings[testName.trim()] = variant;

    Object.keys(variant).forEach((discName) => {
      if (!result.discNames.includes(discName)) {
        result.discNames.push(discName);
      }
    });
  });

  return result;
}

function parseQuestStr(questsStr: string): VariantSettings {
  const DISC_DELIMITER = ';';
  const AMOUNT_DELIMITER = '_';

  const discStrings = questsStr.split(DISC_DELIMITER);

  const result: VariantSettings = {};

  discStrings.forEach((str) => {
    const [discName, amount] = str.split(AMOUNT_DELIMITER);
    const key = discName.trim().toLowerCase();
    result[key] = Number(amount);
  });

  return result;
}
