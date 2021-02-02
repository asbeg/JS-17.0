'use strict';

const money = prompt('Ваш месячный доход?', '12000'),
 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                           'Taxi, School, Courses').toLowerCase().split(', '),
 deposit = confirm('Есть ли у вас депозит в банке?'),
 income = "Freelance",
 mission = 80000,

 expenses1 = prompt('Введите обязательную статью расходов?', 'School'),
 amount1 = prompt('Во сколько это обойдется?', '500'),
 expenses2 = prompt('Введите обязательную статью расходов?', 'Taxi'),
 amount2 = prompt('Во сколько это обойдется?', '1000');

let result = 0,
    accumulatedMonth = 0;

const showTypeOf = function (data) {
    console.log(data, typeof(data));
};

const getStatusIncome = function (){
    if (budgetDay >= 1200){
        return('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200){
        return('У вас средний уровень дохода');
    }else if (budgetDay  <= 600 && budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if (budgetDay <= 0){
        return('Что то пошло не так');
    }
};

const getExpensesMonth = function() {
    return result = +amount1 + +amount2;
};

const getAccumulatedMonth = function() {
    return accumulatedMonth = +money - +result;
};

const budgetDay = Math.floor(getAccumulatedMonth(accumulatedMonth)/30);

const getTargetMonth = function () {
  return Math.ceil(mission/accumulatedMonth);
};

showTypeOf(typeof money);
showTypeOf(typeof income);
showTypeOf(typeof deposit);

console.log("Расходы за месяц: ", getExpensesMonth());
console.log(addExpenses);
console.log("Цель будет достигнута за: " + getTargetMonth() + " месяцев");
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome());
