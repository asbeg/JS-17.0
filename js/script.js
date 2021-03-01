'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }


    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addToDo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            }
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem = (elem) => {
        this.todoData.forEach((el) => {
            if (elem.key === el.key) {
                this.todoData.delete(el.key);
                elem.parentNode.removeChild(elem);
                localStorage.clear();
                this.render();
            }
        });

    }

    completedItem = (elem) => {
        this.todoData.forEach((el) => {
            if (elem.key === el.key) {
                el.completed = !el.completed;
                this.render();
            }
        });
    }

    handler = () => {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', (event) => {
            const target = event.target;
            let elem = target.parentNode.parentNode;
            if (target.matches('.todo-complete')) {
                this.completedItem(elem);
            } else if (target.matches('.todo-remove')) {
                this.deleteItem(elem);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addToDo.bind(this));
        this.render();
        this.handler();
    }

}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();