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
        const handlerMenu = () => {
            const target = event.target;
            console.log(target);
            const displayMenu = () => {
                document.querySelector('menu').classList.toggle('active-menu');
            };

            if (target.closest('.menu') ||
                (!target.closest('menu') &&
                    document.querySelector('menu').classList.contains('active-menu'))) {
                displayMenu();
            } else if (target.closest('menu') && target.closest('[href^="#"]')) {
                displayMenu();
            }
        };
        document.body.addEventListener('click', handlerMenu);
    };

    toggleMenu();

    //popup okno(оставить заявку)
    /*    const togglePopup = () =>{
            const popup = document.querySelector('.popup'),
                popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose=document.querySelector('.popup-close');

            popupBtn.forEach((elem) =>{
               elem.addEventListener('click', () =>{
                 popup.style.display = 'block';
               });

                popupClose.addEventListener('click', ()=>{
                    popup.style.display = 'none';
                });
            });
        };togglePopup();*/
    const animatedTogglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupData = {
                count: 50,
                speed: 5,
                startPos: 200,
                endPos: 0
            };

        const showPopup = () => {

            popupData.startPos > popupData.endPos ?
                popupData.count -= popupData.speed :
                popupData.count += popupData.speed;
            popupContent.style.transform = `translateY(${popupData.count}px)`;

            let condition = popupData.startPos > popupData.endPos ?
                popupData.count > popupData.endPos :
                popupData.count < popupData.endPos;

            if (condition) requestAnimationFrame(showPopup);
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

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    animatedTogglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();


});

