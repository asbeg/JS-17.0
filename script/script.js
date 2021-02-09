'use strict'
/*let money = 0;

const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    hasNumber = function (str) {
        if (typeof str != 'string') return false
        return isNaN(str) && isNaN(parseFloat(str))
    },

    start = function () {
        do {
            money = parseInt(prompt('Месячный доход: ', '5000'));
        } while (!isNumber(money));
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function () {
        let itemIncome,
            cashIncome;

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Taxi');
            } while (!hasNumber(itemIncome));
            do {
                cashIncome = parseInt(prompt('Сколько в месяц вы на этом зарабатываете?', '10000'));
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let value, key;

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'Taxi, School, Courses');
        appData.addExpenses = (addExpenses ? addExpenses : '').toLowerCase().split(', ');
        let arLength = appData.addExpenses;
        for (let i = 0; i < arLength.length; i++) {
            appData.addExpenses[i] = arLength[i].trim();
        }

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            do {
                key = prompt('Введите обязательную статью расходов...');
            } while (!hasNumber(key));

            do {
                value = parseInt(prompt("Во сколько это обойдется?"));
            } while (!isNumber(value));
            appData.expenses[key] = value;
        }
    },

    // Расходы за месяц
    getExpensesMonth: function () {
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item];
        }
        return ("Сумма всех обязательных расходов: " + appData.expensesMonth);
    },

    //вычисляем бюджет
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    // расчет за ск. будет достигнута цель
    getTargetMonth: function () {
        const missionMonth = Math.ceil(appData.mission / appData.budgetMonth);
        if ((missionMonth < 0) || (!isNumber(missionMonth))) {
            return ('Цель не будет достигнута');
        } else
            return ('Цель будет достигнута за ' + missionMonth + ' месяцев');
    },

    //Уровень дохода
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = parseInt(prompt('Какой годовой процент?', '10'));
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = parseInt(prompt('Какая сумма заложенв?', '10000'));
            } while (!isNumber(appData.moneyDeposit));
        }
        return appData.percentDeposit, appData.moneyDeposit;
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
console.log(appData.getExpensesMonth());
appData.getBudget();
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.getInfoDeposit());
console.log(appData.calcSavedMoney());
console.log(appData.addExpenses);


//2 каждое слово с большой буквы
function upperCaseFirst() {
    let newStr = appData.addExpenses;
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].substring(1);
    }
    return newStr.join(', ');
}

console.log(upperCaseFirst());

// *** 13 ***

/!*
for (let key in appData) {
    let value = appData[key];
    console.log("Наша программа включает в себя данные: " + key + " = " + value);
}
*!/*/

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
