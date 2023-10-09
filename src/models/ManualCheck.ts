/*  Результаты ручной проверки */
export interface ManualCheckResult {
  isError: boolean;
}

/*  Правила ручной проверки (полученные из таблицы) */
export interface ManualCheckRule {
  isError: boolean;
}

export interface ManualCheckStudentRules {
  [questNumber: number]: ManualCheckRule;
}

export interface ManualCheckTestRules {
  [studentLastname: string]: ManualCheckStudentRules;
}
