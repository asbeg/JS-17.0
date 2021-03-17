function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        idInterval;

    // вычисляет дату до дедлайна
    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        return {timeRemaining, hours, minutes, seconds};
    }

    function addZero(n) {
        return (n > 0 && n < 10) ? '0' + n : n;
    }

    function updateClock() {
        let time = getTimeRemaining();

        timerHours.textContent = addZero(time.hours);
        timerMinutes.textContent = addZero(time.minutes);
        timerSeconds.textContent = addZero(time.seconds);

        if (time.timeRemaining < 0) {
            clearInterval(idInterval);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }

    idInterval = setInterval(updateClock, 1000);
};

export default countTimer;