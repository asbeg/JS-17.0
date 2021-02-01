'use strict';

const money = prompt('Ваш месячный доход?', '12000'),
 income = "Freelance",
 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                           'Taxi, School, Courses').toLowerCase().split(', '),
 deposit = confirm('Есть ли у вас депозит в банке?'),
 period = 6,
 mission = 80000,

 expenses1 = prompt('Введите обязательную статью расходов?'),
 amount1 = prompt('Во сколько это обойдется?'),
 expenses2 = prompt('Введите обязательную статью расходов?'),
 amount2 = prompt('Во сколько это обойдется?'),

 budgetMonth = +money - (+amount1 + +amount2),
 missionMonth = Math.ceil(mission/budgetMonth),
 budgetDay = Math.floor(budgetMonth/30);

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
console.log(addExpenses);
console.log("дневной бюджет: " + budgetDay);
console.log("Бюджет на месяц: " + budgetMonth);
console.log("Цель будет достигнута за: " + missionMonth + " месяцев");