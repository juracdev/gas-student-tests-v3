import { TestErrorsRepot } from './getTestErrorsReport';

export function writeTestResultsToDoc(reports: TestErrorsRepot[], body: GoogleAppsScript.Document.Body) {
  body.setAttributes({
    [DocumentApp.Attribute.FONT_FAMILY]: 'Roboto',
  });

  reports.forEach((r) => {
    body.appendParagraph(`${r.firstName} ${r.lastName}`).setAttributes({
      [DocumentApp.Attribute.BOLD]: true,
    });

    const date = r.passedAt;
    const dateStr = `Время прохождения теста: ${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    body.appendParagraph(dateStr).setAttributes({
      [DocumentApp.Attribute.BOLD]: false,
    });

    body
      .appendParagraph(
        `Правильных ответов ${r.correctAnsAmount} из ${r.correctAnsAmount + r.incorrectAnsAmount} (${Math.ceil(
          r.percentage * 100
        )}%)\n`
      )
      .setAttributes({
        [DocumentApp.Attribute.BOLD]: false,
      });

    if (r.choiceErrors.length > 0) {
      body.appendParagraph('Ошибки в вопросах с вариантами ответа').setAttributes({
        [DocumentApp.Attribute.BOLD]: true,
        [DocumentApp.Attribute.UNDERLINE]: true,
      });

      r.choiceErrors.forEach((err) => {
        body.appendParagraph(`${err}\n`).setAttributes({
          [DocumentApp.Attribute.BOLD]: false,
          [DocumentApp.Attribute.UNDERLINE]: false,
        });
      });
    }

    if (r.textErrors.length > 0) {
      body.appendParagraph('Ошибки в вопросах с текстовым ответом').setAttributes({
        [DocumentApp.Attribute.BOLD]: true,
        [DocumentApp.Attribute.UNDERLINE]: true,
      });

      r.textErrors.forEach((err) => {
        body.appendParagraph(`${err}\n`).setAttributes({
          [DocumentApp.Attribute.BOLD]: false,
          [DocumentApp.Attribute.UNDERLINE]: false,
        });
      });
    }
  });
}
