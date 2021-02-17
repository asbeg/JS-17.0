'use strict';
/*
1) Привязать контекст вызова функции start к appData
2) В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
3) Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать,
после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую
навешиваем событие и выполнение метода reset
*/

let startBtn = document.getElementById('start'),
    incomeAdd = document.getElementsByTagName('button')[0], // + btn
    expensesAdd = document.getElementsByTagName('button')[1],// checkbox
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),//Возможный доход
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    periodSelect = document.querySelector('input[class=period-select]'),// range
    targetAmount = document.querySelector('input[class=target-amount]'),
    additionalExpensesItem = document.querySelector('input[class=additional_expenses-item]'),
    expenseTitle = document.querySelector('input[class=expenses-title]'),
    salaryAmount = document.querySelector('input[class=salary-amount]'),
    incomeTitle = document.querySelector('input[class=income-title]'),
    incomeAmount = document.querySelector('input[class=income-amount]'),
    depositAmount = document.querySelector('input[class=deposit-amount]'),
    depositPercent = document.querySelector('input[class=deposit-percent]'),
    cancelBtn = document.getElementById('cancel'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

/*const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    hasNumber = function (str) {
        if (typeof str != 'string') return false
        return isNaN(str) && isNaN(parseFloat(str))
    };*/

let appData = {
    addExpenses: [],
    addIncome: [],
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    deposit: false,
    expenses: {},
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    mission: 0,
    moneyDeposit: 0,
    period: 0,
    percentDeposit: 0,

    start: function () {

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();

        this.leftInputsBlock();
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';

    },

    leftInputsBlock: (disabled = true) => {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
        document.querySelectorAll('.data button').forEach(item => {
            item.disabled = disabled;
        });
        document.querySelector('#deposit-check').disabled = disabled;
    },

    //Метод reset должен всю программу возвращать в исходное состояние
    reset: function () {
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }
        appData.leftInputsBlock(false);
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.value = '';
        });
        periodSelect.value = document.querySelector('.period-amount').textContent = 1;
        cancelBtn.style.display = 'none';
        startBtn.style.display = 'block';
        depositCheck.checked = false;
        appData.success();
    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = upperCaseFirst(this.addExpenses);
        additionalIncomeValue.value = upperCaseFirst(this.addIncome);
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },

    // добав нов блок доп доход
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        const input = cloneIncomeItem.querySelectorAll('input');
        input.forEach((item) => {
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

    //добав.новый блок обяз.расходы
    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        const input = cloneExpensesItem.querySelectorAll('input');
        input.forEach((item) => {
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

    getExpenses: function () {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach((item) => {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== '') {
                this.income[incomeTitle] = +incomeAmount;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },

    // Расходы за месяц
    getExpensesMonth: function () {
        this.expensesMonth = 0;
        for (let item in this.expenses) {
            this.expensesMonth += +this.expenses[item];
        }
        return this.expensesMonth;
    },

    //вычисляем бюджет
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },

    // расчет за ск. будет достигнута цель
    getTargetMonth: function () {
        if (salaryAmount.value === '') {
            return targetMonthValue.value = '';
        }
        const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth < 0) {
            return ('Цель не будет достигнута');
        } else
            return missionMonth;
    },

    //Уровень дохода
    /*    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    },*/

    /*    getInfoDeposit: function () {
            if (this.deposit) {
                do {
                    this.percentDeposit = parseInt(prompt('Какой годовой процент?', '10'));
                } while (!isNumber(this.percentDeposit));
                do {
                    this.moneyDeposit = parseInt(prompt('Какая сумма заложенв?', '10000'));
                } while (!isNumber(this.moneyDeposit));
            }
            return this.percentDeposit, this.moneyDeposit;
        },*/

    // ** 4 ** RangeInput
    getPeriod: function (event) {
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    },

    success: function () {
        startBtn.disabled = salaryAmount.value.length === 0;
    },

    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
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


const funcStart = appData.start.bind(appData);

appData.success();
startBtn.addEventListener('click', funcStart);
cancelBtn.addEventListener('click', appData.reset);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.success);

let inputTitle = document.querySelectorAll('input[placeholder="Наименование"]');
inputTitle.forEach(input => appData.textValidate(input));

let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
inputSum.forEach(input => appData.numberValidate(input));

// каждое слово с большой буквы
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

