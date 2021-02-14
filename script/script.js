let startBtn = document.getElementById('start'),
    // + btn
    incomeAdd = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    // checkbox
    depositCheck = document.querySelector('#deposit-check'),
    //Возможный доход
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // e
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    // range
    periodSelect = document.querySelector('input[class=period-select]'),
    // f
    targetAmount = document.querySelector('input[class=target-amount]'),
    additionalExpensesItem = document.querySelector('input[class=additional_expenses-item]'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expenseTitle = document.querySelector('input[class=expenses-title]'),
    salaryAmount = document.querySelector('input[class=salary-amount]'),
    incomeTitle = document.querySelector('input[class=income-title]'),
    incomeAmount = document.querySelector('input[class=income-amount]'),
    depositAmount = document.querySelector('input[class=deposit-amount]'),
    depositPercent = document.querySelector('input[class=deposit-percent]'),
    incomeItems = document.querySelectorAll('.income-items');

const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    hasNumber = function (str) {
        if (typeof str != 'string') return false
        return isNaN(str) && isNaN(parseFloat(str))
    };

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 0,
    period: 0,
    budget: 0,
    incomeMonth: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function () {
        appData.budget = +salaryAmount.value;

        appData.success();

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.getPeriod();
        appData.showResult();
    },

    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = upperCaseFirst(appData.addExpenses);
        additionalIncomeValue.value = upperCaseFirst(appData.addIncome);
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', function (e) {
            return incomePeriodValue.value.innerHTML = budgetMonthValue.value * periodSelect.value;
        });
    },

    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        const input = cloneExpensesItem.querySelectorAll('input');

        input.forEach(function (item) {
            const textItem = cloneExpensesItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneExpensesItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                appData.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                appData.numberValidate(numItem);
            }
            item.value = '';
        });
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        const input = cloneIncomeItem.querySelectorAll('input');
        input.forEach(function (item) {
            const textItem = cloneIncomeItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneIncomeItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                appData.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                appData.numberValidate(numItem);
            }
            item.value = '';
        });
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = +incomeAmount;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    // Расходы за месяц
    getExpensesMonth: function () {
        for (let item in appData.expenses) {
            appData.expensesMonth += +appData.expenses[item];
        }
        return appData.expensesMonth;
    },

    //вычисляем бюджет
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    // расчет за ск. будет достигнута цель
    getTargetMonth: function () {
        if (salaryAmount.value === '') {
            return targetMonthValue.value = '';
        }
        const missionMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
        if ((missionMonth < 0) || (!isNumber(missionMonth))) {
            return ('Цель не будет достигнута');
        } else
            return missionMonth;
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

    // ** 4 ** RangeInput
    getPeriod: function () {
        let periodAmount = document.querySelector('.period-amount')
        periodAmount.innerHTML = periodSelect.value;
    },

    success: function () {
        startBtn.disabled = salaryAmount.value.length === 0;
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },

    textValidate: function (a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^?!, .а-яА-ЯёЁ]/, '');
        });
    },

    numberValidate: function (a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^0-9]/, '');
        });
    },
};

let inputTitle = document.querySelectorAll('input[placeholder="Наименование"]');
inputTitle.forEach(input => appData.textValidate(input));

let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
inputSum.forEach(input => appData.numberValidate(input));

appData.success();

startBtn.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);

salaryAmount.addEventListener('input', appData.success);

// ***  5  ***
periodSelect.addEventListener('input', appData.showResult);

//2 каждое слово с большой буквы
function upperCaseFirst(newStr) {
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase().trim() + newStr[i].substring(1).toLowerCase().trim();
    }
    return newStr.join(', ');
}

// *** 13 ***
/*
for (let key in appData) {
    let value = appData[key];
    console.log("Наша программа включает в себя данные: " + key + " = " + value);
}
*/