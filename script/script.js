'use strict';

let money = 0;
console.log(typeof money);

const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = function () {
        do {
            money = parseInt(prompt('Месячный доход: '));
        } while (!isNumber(money));
    };

start();

const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Taxi, School, Courses').toLowerCase().split(', '),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = "Freelance",
    mission = 80000,

    showTypeOf = function (data) {
        console.log(data, typeof (data));
    },

    getStatusIncome = function () {
        if (budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (budgetDay > 600 && budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay <= 600 && budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    },

    getExpensesMonth = function () {
        let sum = 0,
            amount = 0,
            expenses = [];
        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов...');
            do {
                sum = prompt("Во сколько это обойдется");
            } while (!isNumber(sum));
            amount += +sum;
        }
        console.log("Расходы за месяц", amount);
        return amount;
    },

    getAccumulatedMonth = function () {
        return +money - getExpensesMonth();
    },

    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30),

    getTargetMonth = function () {
        const missionMonth = Math.ceil(mission / accumulatedMonth);
        if ((missionMonth < 0) || (!isNumber(missionMonth))) {
            return ('Цель не будет достигнута');
        } else
            return ('Цель будет достигнута за ' + missionMonth + ' месяцев');
    };
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses);
console.log(getTargetMonth());
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome());