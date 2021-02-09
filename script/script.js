const startBtn = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

    resultTotalBudgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
    resultTotalExpensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
    resultTotalAdditionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0],
    resultTotalAdditionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],

    resultTotalIncomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
    resultTotalTargetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],

    targetAmount = document.getElementsByClassName('target-amount')[0],
    depositAmount = document.querySelector('div.deposit-calc input[class=deposit-amount]'),
    depositPercent = document.querySelector('div.deposit-calc input[class=deposit-percent]'),
    additionalExpensesItem = document.querySelector('div.additional_expenses input[class=additional_expenses-item]'),
    expensesAmount = document.querySelector('div.expenses-items input[class=expenses-amount]'),
    expenseTitle = document.querySelector('div.expenses input[class=expenses-title]'),
    periodSelect = document.querySelector('div.period input[class=period-select]'),
    salaryAmount = document.querySelector('div.salary input[class=salary-amount]'),
    incomeTitle = document.querySelector('div.income input[class=income-title]'),
    incomeAmount = document.querySelector('div.income input[class=income-amount]');

console.log(startBtn);
console.log(btnPlusIncomeAdd);
console.log(btnPlusExpensesAdd);
console.log(depositCheck);
console.log(additionalIncomeItem);

console.log(resultTotalBudgetDayValue);
console.log(resultTotalExpensesMonthValue);
console.log(resultTotalAdditionalIncomeValue);
console.log(resultTotalAdditionalExpensesValue);

console.log(resultTotalIncomePeriodValue);
console.log(resultTotalTargetMonthValue);

console.log(targetAmount);
console.log(depositAmount);
console.log(depositPercent);
console.log(additionalExpensesItem);
console.log(expensesAmount);
console.log(expenseTitle);
console.log(periodSelect);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
