const startBtn = document.getElementById('start'),
    addIncome = document.getElementsByTagName('btn_plus income_add'),
    addExpenses = document.getElementsByTagName('btn_plus expenses_add'),
    depositCheck = document.querySelector('div.deposit input[id=deposit-check]'),
    incomeAdditional = document.querySelectorAll('additional_income-item'),

    budgetDay = document.getElementsByClassName('result-total budget_day-value'),
    expensesMonth = document.getElementsByClassName('result-total expenses_month-value'),
    resAdditionalIncome = document.getElementsByClassName('result-total additional_income-value'),
    resAdditionalExpenses = document.getElementsByClassName('result-total additional_expenses-value'),

    resIncomePeriod = document.getElementsByClassName('result-total income_period-value'),
    resTargetMonth = document.getElementsByClassName('result-total target_month-value'),

    targetTitle = document.getElementsByClassName('target-amount'),
    depositAmount = document.querySelector('div.deposit-calc input[class=deposit-amount]'),
    depositPercent = document.querySelector('div.deposit-calc input[class=deposit-percent]'),
    additionalExpenses = document.querySelector('div.additional_expenses input[class=additional_expenses-item]'),
    expensesAmount = document.querySelector('div.expenses-items input[class=expenses-amount]'),
    expenseTitle = document.querySelector('div.expenses input[class=expenses-title]'),
    periodSelect = document.querySelector('div.period input[class=period-select]'),
    salary = document.querySelector('div.salary input[class=salary-amount]'),
    incomeTitle = document.querySelector('div.income input[class=income-title]'),
    incomeAmount = document.querySelector('div.income input[class=income-amount]');

console.log(
    startBtn,
    addIncome,
    addExpenses,
    depositCheck,
    incomeAdditional,

    budgetDay,
    expensesMonth,
    resAdditionalIncome,
    resAdditionalExpenses,

    resIncomePeriod,
    resTargetMonth,

    targetTitle,
    depositAmount,
    depositPercent,
    additionalExpenses,
    expensesAmount,
    expenseTitle,
    periodSelect,
    salary,
    incomeTitle,
    incomeAmount
);
