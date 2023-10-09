export const CONSTANTS = {
  /*  Разделитель вариантов ответа для вопросов с выбором ответа */
  CHOICE_VARIANTS_DELIMITER: ';',

  /* Разделитель правильных ответов для вопросов с множественным выбором */
  CHOICE_ANSWERS_DELIMITER: ';',

  /*  Разделитель ключей для текстовых вопросов */
  TEXT_KEYS_DELIMITER: ';',
  /*  Разделитель значений одного ключа для текстовых вопросов */
  TEXT_KEY_VALUES_DELIMITER: '&',

  /*  Значение в таблице вопросов, указывающее на необходимость проверки порядка ключей */
  TEXT_IS_KEY_ORDERED_CELL_VALUE: 'да',

  GRID_ANSWER_PAIR_LINK: '-',
  GRID_ANSWER_PAIR_DELIMITER: ';',

  /*  Разделитель между условиями в таблице ручной проверки*/
  MANUAL_CHECK_RULES_DELIMITER: ';',

  /* Используется для распознавания вариантов ответа, НЕ МЕНЯТЬ  */
  CHOICE_VARS_NUMERATORS: ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'],

  SHEET_ANSWER_NAME: 'Ответы на форму',
  SHEET_CHECKED_NAME: 'Проверенные',
  SHEET_MANUAL_CHECK_RULES_NAME: 'Ручная проверка',

  /*  Кол-во колонок слева от колонок с вопросами (время, имя, фамилия) */
  COLS_BEFORE_ANSWERS: 3,
};
