'use strict'

const money = prompt('Ваш месячный доход?', '12000');
const income = "Freelance";
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                           'Taxi, School, Courses');
const deposit = confirm('Есть ли у вас депозит в банке?');
const period = 6;
const mission = 80000;

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

const budgetMonth = +money - (+amount1 + +amount2);
const missionMonth = Math.ceil(mission/budgetMonth);
const budgetDay = Math.floor(budgetMonth/30);

if (budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200){
    console.log('У вас средний уровень дохода');
}else if (budgetDay  <= 600 && budgetDay > 0){
    console.log('К сожалению у вас уровень дохода ниже среднего');
}else if (budgetDay <= 0){
    console.log('Что то пошло не так');
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log("Период равен: " + period + " месяцев");
console.log("Цель заработать: " + mission + " рублей");
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log("дневной бюджет: " + budgetDay);
console.log("Бюджет на месяц: " + budgetMonth);
console.log("Цель будет достигнута за: " + missionMonth + " месяцев");