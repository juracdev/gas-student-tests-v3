interface CreateDocOptions {
  title?: string;
  dirId?: string;
}

export function createDoc(opts: CreateDocOptions = {}): GoogleAppsScript.Document.Document {
  const title = opts.title || `Doc-${(Math.random() + 1).toString(36).substring(7)}`;
  const doc = DocumentApp.create(title);

  if (opts.dirId) {
    const file = DriveApp.getFileById(doc.getId());
    var folder = DriveApp.getFolderById(opts.dirId);
    file.moveTo(folder);
  }

  return doc;
}
