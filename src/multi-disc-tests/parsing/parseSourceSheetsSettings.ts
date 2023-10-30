import { QuestionType, questionTypesMap } from '../../models/Question';

export interface SourceSheetsSettings {
  sheetId: string;
  sheetTitle: string;
  questTypes?: QuestionType[];
}

export function parseSourceSheetsSettings(): SourceSheetsSettings[] {
  const SOURCES_SH_NAME = 'SourceSheetsSettings';
  const sheet = SpreadsheetApp.getActive().getSheetByName(SOURCES_SH_NAME);
  const [titlesRow, ...rows] = sheet!.getDataRange().getValues();
  const settings: SourceSheetsSettings[] = [];

  rows.forEach((row) => {
    const [sheetId, sheetTitle, questTypesStr] = row;
    const setting: SourceSheetsSettings = {
      sheetId,
      sheetTitle: sheetTitle.toLowerCase(),
    };
    if (questTypesStr) {
      setting.questTypes = questTypesStr.split(';').map((x) => questionTypesMap[x.trim()]);
    }
    settings.push(setting);
  });

  return settings;
}
