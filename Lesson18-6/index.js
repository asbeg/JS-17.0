let p1 = document.querySelector('#p1'),
    p2 = document.querySelector('#p2'),
    p3 = document.querySelector('#p3'),
    p4 = document.querySelector('#p4');

let date = new Date(),
    nextDate = new Date("January 1, 2022"),
    msPerDay = 24 * 60 * 60 * 1000,
    dateNow = date.toLocaleTimeString('ru'),
    weekDay = date.toLocaleDateString('ru', {weekday: 'long'}),
    hour = date.toLocaleTimeString('en-US'),
    daysLeft = Math.round((nextDate.getTime()
        - date.getTime()) / msPerDay);

function myDate() {
    if (dateNow > '00' && dateNow < '05') {
        p1.textContent = `Доброй ночи!`;
        p2.textContent = `Сегодня: ${weekDay}`;
        p3.textContent = `Текущее время: ${hour}`;
        p4.textContent = `До нового года осталось ${daysLeft} дней`;
    } else if (dateNow > '05' && dateNow < '11') {
        p1.textContent = `Доброе утро!`;
        p2.textContent = `Сегодня: ${weekDay}`;
        p3.textContent = `Текущее время: ${hour}`;
        p4.textContent = `До нового года осталось ${daysLeft} дней`;
    } else if (dateNow > '11' && dateNow < '17') {
        p1.textContent = `Добрый день!`;
        p2.textContent = `Сегодня: ${weekDay}`;
        p3.textContent = `Текущее время: ${hour}`;
        p4.textContent = `До нового года осталось ${daysLeft} дней`;
    } else if (dateNow > '17') {
        p1.textContent = `Добрый вечер!`;
        p2.textContent = `Сегодня: ${weekDay}`;
        p3.textContent = `Текущее время: ${hour}`;
        p4.textContent = `До нового года осталось ${daysLeft} дней`;
    }
}

myDate();