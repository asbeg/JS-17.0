//ждет загрузки только дом дерева, не всей стр.
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

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
            //  day = Math.floor(timeRemaining / 60 / 60 / 24);


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
    }

    countTimer('24 February 2021');

    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    const animatedTogglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            popupData = {
                count: 200,
                speed: 3,
                startPos: 200,
                endPos: 0
            };

        const showPopup = () => {

            popupData.startPos > popupData.endPos ?
                popupData.count -= popupData.speed :
                popupData.count += popupData.speed;
            popupContent.style.transform = `translateY(${popupData.count}px)`;

            if (popupData.startPos > popupData.endPos ?
                popupData.count > popupData.endPos :
                popupData.count < popupData.endPos) {
                requestAnimationFrame(showPopup);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popupData.count = popupData.startPos;
                    requestAnimationFrame(showPopup);
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    animatedTogglePopUp();
});

