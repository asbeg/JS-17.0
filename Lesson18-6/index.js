let date = new Date(),
    nextDate = new Date("January 1, 2022"),
    dateNow = date.toLocaleTimeString('ru'),
    weekDay = date.toLocaleDateString('ru', {weekday: 'long'}),
    hour = date.toLocaleTimeString('en-US'),
    msPerDay = 24 * 60 * 60 * 1000,
    daysLeft = Math.round((nextDate.getTime()
        - date.getTime()) / msPerDay);

let p1 = document.querySelector('#p1'),
    p2 = document.querySelector('#p2').textContent = `Сегодня: ${weekDay}`;
    p3 = document.querySelector('#p3').textContent = `Текущее время: ${hour}`;
    p4 = document.querySelector('#p4').textContent = `До нового года осталось ${daysLeft} дней`;


function myDate() {
    if (dateNow > '00' && dateNow < '05') {
        p1.textContent = `Доброй ночи!`;
    } else if (dateNow > '05' && dateNow < '11') {
        p1.textContent = `Доброе утро!`;
    } else if (dateNow > '11' && dateNow < '17') {
        p1.textContent = `Добрый день!`;
    } else if (dateNow > '17') {
        p1.textContent = `Добрый вечер!`;
    }
}

myDate();