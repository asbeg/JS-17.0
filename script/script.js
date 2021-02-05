'use strict';

let money = 0;

const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
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
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function () {
        let value;

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'Taxi, School, Courses').toLowerCase().split(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            const key = prompt('Введите обязательную статью расходов...');
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
};

appData.asking();
console.log(appData.getExpensesMonth());
appData.getBudget();
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

// *** 13 ***
for (let key in appData) {
    let value = appData[key];
    console.log("Наша программа включает в себя данные: " + key + " = " + value);
}
