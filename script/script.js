'use strict';
/*
2) Если пользователь выбрал вариант "Другой" в списке банков, показать скрытый блок "Процент"
3) При подсчете учитывать процент который ввел пользователь.
4) Если пользователь ввел не число или число вне диапазона от 0 до 100, то выведите ошибку в виде
alert ("Введите корректное значение в поле проценты") и запретите нажатие кнопки "Расcчитать"
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
    depositBank = document.querySelector('.deposit-bank'),
    cancelBtn = document.getElementById('cancel');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.addExpenses = [];
        this.addIncome = [];
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.deposit = false;
        this.expenses = {};
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.moneyDeposit = 0;
        this.percentDeposit = 0;
    };

    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();

        this.leftInputsBlock();
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    };

    leftInputsBlock = (disabled = true) => {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
        document.querySelectorAll('.data button').forEach(item => {
            item.disabled = disabled;
        });
        document.querySelector('#deposit-check').disabled = disabled;
        document.querySelector(".deposit-bank").disabled = disabled;
    };

    reset() {
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }
        this.leftInputsBlock(false);
        document.querySelectorAll('input[type=text]').forEach(function (item) {
            item.value = '';
        });
        periodSelect.value = document.querySelector('.period-amount').textContent = 1;
        cancelBtn.style.display = 'none';
        startBtn.style.display = 'block';
        depositPercent.style.display = 'none';
        depositCheck.checked = false;
        this.addExpenses = [];
        this.addIncome = [];
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.deposit = false;
        this.expenses = {};
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.moneyDeposit = 0;
        this.percentDeposit = 0;
        this.depositHandler();
        this.success();
    };

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.upperCaseFirst(this.addExpenses);
        additionalIncomeValue.value = this.upperCaseFirst(this.addIncome);
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    };

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        const input = cloneIncomeItem.querySelectorAll('input');
        input.forEach((item) => {
            const textItem = cloneIncomeItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneIncomeItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                this.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                this.numberValidate(numItem);
            }
            item.value = '';
        });
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    };

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        const input = cloneExpensesItem.querySelectorAll('input');
        input.forEach((item) => {
            const textItem = cloneExpensesItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneExpensesItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                this.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                this.numberValidate(numItem);
            }
            item.value = '';
        });
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    };

    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    };

    getIncome() {
        incomeItems.forEach((item) => {
            const incomeTitle = item.querySelector('.income-title').value;
            const incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== '') {
                this.income[incomeTitle] = +incomeAmount;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    };

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });
    };

    getExpensesMonth() {
        this.expensesMonth = 0;
        for (let item in this.expenses) {
            this.expensesMonth += +this.expenses[item];
        }
        return this.expensesMonth;
    };

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    };

    getTargetMonth() {
        if (salaryAmount.value === '') {
            return targetMonthValue.value = '';
        }
        const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth < 0) {
            return ('Цель не будет достигнута');
        } else
            return missionMonth;
    };

    /*    getStatusIncome () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    };
     */

    getPeriod(event) {
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = this.calcSavedMoney();
    };

    success() {
        startBtn.disabled = salaryAmount.value.length === 0;
    };

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };

    textValidate(a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^?!, .а-яА-ЯёЁ]/, '');
        });
    };

    numberValidate(a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^0-9]/, '');
        });
    };

// каждое слово с большой буквы
    upperCaseFirst(newStr) {
        for (let i = 0; i < newStr.length; i++) {
            newStr[i] = newStr[i].charAt(0).toUpperCase().trim() + newStr[i].substring(1).toLowerCase().trim();
        }
        return newStr.join(', ');
    };

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value; //prozent
            this.moneyDeposit = depositAmount.value; // summa
        }
    };

    changePercent() {
        const valueSelect = this.value;
            if (valueSelect === 'other') {
                depositPercent.style.display = 'inline-block';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
    };

    checkPercent() {
        const target = event.target;
        let value = target.value.trim();

        const checkValue = () => {
            const condition = /^[\d.]+$/;
            let valid = true;
            if (target.placeholder === 'Процент') {
                valid = (+target.value.trim() > 0) && (+target.value.trim() < 101);
            }
            if (!condition.test(target.value.trim()) && target.value.trim() || !valid) {
                alert('Введите корректное значение в поле проценты! (число от 1 до 100)');
                target.value = value;
            }
            target.removeEventListener('change', checkValue);
        };
        target.addEventListener('change', checkValue);
    };

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {

        this.success();
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
        incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.getPeriod.bind(this));
        salaryAmount.addEventListener('input', this.success.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('focus', this.checkPercent.bind(this));

        const inputTitle = document.querySelectorAll('input[placeholder="Наименование"]');
        inputTitle.forEach(input => this.textValidate(input));

        const inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
        inputSum.forEach(input => this.numberValidate(input));
    }
}

const appData = new AppData();
appData.eventListeners();