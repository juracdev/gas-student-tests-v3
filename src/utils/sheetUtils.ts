interface CreateSheetOptions {
  title?: string;
  dirId?: string;
}

export function createSheet(opts: CreateSheetOptions = {}): GoogleAppsScript.Spreadsheet.Spreadsheet {
  const title = opts.title || `Sheet-${(Math.random() + 1).toString(36).substring(7)}`;
  const sheet = SpreadsheetApp.create(title);

  if (opts.dirId) {
    const file = DriveApp.getFileById(sheet.getId());
    var folder = DriveApp.getFolderById(opts.dirId);
    file.moveTo(folder);
  }

  return sheet;
}
