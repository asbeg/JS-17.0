(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var t,n,o,r,a,c,u,l,s,i,d,m,v,f,p,y,h,g,S,q,L,b,E;(function(e){var t,n=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),r=document.querySelector("#timer-seconds");function a(e){return e>0&&e<10?"0"+e:e}t=setInterval((function(){var e,c,u,l=(e=(new Date("24 February 2021").getTime()-(new Date).getTime())/1e3,c=Math.floor(e%60),u=Math.floor(e/60%60),{timeRemaining:e,hours:Math.floor(e/60/60),minutes:u,seconds:c});n.textContent=a(l.hours),o.textContent=a(l.minutes),r.textContent=a(l.seconds),l.timeRemaining<0&&(clearInterval(t),n.textContent="00",o.textContent="00",r.textContent="00")}),1e3)})(),document.body.addEventListener("click",(function(e){var t=e.target;(t.closest(".menu")||!t.closest("menu")&&document.querySelector("menu").classList.contains("active-menu")||t.closest("menu")&&t.closest('[href^="#"]'))&&document.querySelector("menu").classList.toggle("active-menu")})),S=document.querySelector(".popup"),q=document.querySelectorAll(".popup-btn"),L=document.querySelector(".popup-content"),b={count:50,speed:5,startPos:200,endPos:0},E=function e(){b.startPos>b.endPos?b.count-=b.speed:b.count+=b.speed,L.style.transform="translateY(".concat(b.count,"px)"),(b.startPos>b.endPos?b.count>b.endPos:b.count<b.endPos)&&requestAnimationFrame(e)},q.forEach((function(e){e.addEventListener("click",(function(){S.style.display="block",screen.width>768&&(b.count=b.startPos,requestAnimationFrame(E))}))})),S.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?S.style.display="none":(t=t.closest(".popup-content"))||(S.style.display="none")})),y=document.querySelector(".service-header"),h=y.querySelectorAll(".service-header-tab"),g=document.querySelectorAll(".service-tab"),y.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&h.forEach((function(e,n){e===t&&function(e){for(var t=0;t<g.length;t++)e===t?(h[t].classList.add("active"),g[t].classList.remove("d-none")):(h[t].classList.remove("active"),g[t].classList.add("d-none"))}(n)}))})),f=document.querySelectorAll(".portfolio-item"),p=document.querySelector(".portfolio-dots"),f.forEach((function(){var e=document.createElement("li");e.classList.add("dot"),p.appendChild(e)})),p.children[0].classList.add("dot-active"),c=document.querySelectorAll(".portfolio-item"),u=document.querySelectorAll(".dot"),l=document.querySelector(".portfolio-content"),s=0,i=function(e,t,n){e[t].classList.remove(n)},d=function(e,t,n){e[t].classList.add(n)},m=function(){i(c,s,"portfolio-item-active"),i(u,s,"dot-active"),s=s<c.length-1?s+1:0,d(c,s,"portfolio-item-active"),d(u,s,"dot-active")},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2e3;a=setInterval(m,e)},l.addEventListener("click",(function(e){e.preventDefault();var t=e.target;t.matches(".portfolio-btn, .dot")&&(i(c,s,"portfolio-item-active"),i(u,s,"dot-active"),t.matches("#arrow-right")?s++:t.matches("#arrow-left")?s--:t.matches(".dot")&&u.forEach((function(e,n){e===t&&(s=n)})),s>=c.length&&(s=0),s<0&&(s=c.length-1),d(c,s,"portfolio-item-active"),d(u,s,"dot-active"))})),l.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(a)})),l.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&v()})),v(),o=document.querySelector(".command"),r=function(e){var t=e.target;if(t.classList.contains("command__photo")){var n=t.src;t.src=t.dataset.img,t.dataset.img=n}},o.addEventListener("mouseover",r),o.addEventListener("mouseout",r),document.querySelector(".calc-block").addEventListener("input",(function(e){var t=e.target;(t.matches(".calc-square")||t.matches(".calc-count")||t.matches(".calc-day"))&&(t.value=t.value.replace(/[^0-9]/g,""))})),document.addEventListener("input",(function(e){var t=e.target;return"user_name"===t.name?t.value=t.value.replace(/[^а-яё ]/gi,""):t.matches(".form-phone")?t.value=t.value.replace(/[^+\d]/g,""):t.matches(".mess")?t.value=t.value.replace(/[^а-яё ,.!?\d]/gi,""):t.classList.contains("form-email")?t.value=t.value.replace(/[^_@.!'~*A-Za-z\-]/g,""):void 0})),n=document.querySelectorAll("input"),document.addEventListener("blur",(function(e){n.forEach((function(){var t,n=e.target;if("user_name"===n.name||".mess"===n.name){n.value=n.value.replace(/[^а-яё ]/gi,""),n.value=n.value.replace(/\s+/g," "),n.value=n.value.replace(/\-+/g,"");var o=(t=n.value,t.replace(/(^|\s)\S/g,(function(e){return e.toUpperCase()}))).trim();return n.value=o}return n.matches(".form-phone")?(n.value=n.value.replace(/[^0-9\+]/g,""),n.value=n.value.replace(/\-+/g,"-"),n.value=n.value.replace(/\s+/g," "),n.value=n.value.replace(/^-+|-+$/,""),n.value.trim()):n.classList.contains(".form-email")?(n.value=n.value.replace(/[^_@.!~*A-Za-z\-]/g,""),n.value=n.value.replace(/\s+/g," "),n.value=n.value.replace(/\-+/g,"-"),n.value=n.value.replace(/^-+|-+$/,""),n.value.trim()):void 0}))}),!0),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),n=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),a=document.querySelector(".calc-count"),c=document.getElementById("total"),u=function(){var t=0,u=1,l=10,s=n.options[n.selectedIndex].value,i=+o.value;a.value>1&&(u+=(a.value-1)/10),r.value&&(r.value<5?l*=2:r.value<10&&(l*=1.5)),s&&i&&(t=e*s*i*u*l),function(){var e=t/100*10,n=0;if(+c.textContent!==t)var o=setInterval((function(){(n+=e)===t&&clearInterval(o),c.textContent=parseInt(n)}),50)}()};t.addEventListener("change",(function(e){var t=e.target;(t.matches(".calc-day")||t.matches(".calc-type")||t.matches(".calc-square")||t.matches(".calc-count"))&&u()}))}(100),(t=function(t){var n=document.getElementById(t),o=document.createElement("div"),r=function(e){o.textContent={load:{message:" Загрузка..."},error:{message:" Что-то пошло не так..."},success:{message:" Спасибо! Мы скоро с вами свяжемся!"}}[e].message,"success"!==e&&"error"!==e||(setTimeout((function(){o.textContent=""}),1e3),setTimeout((function(){document.querySelector(".popup").style.display="none"}),2e3))};o.style.cssText="font-size: 2rem; color: #fff",n.addEventListener("submit",(function(a){var c;a.preventDefault(),r("load"),n.appendChild(o),(c=Object.fromEntries(new FormData(n)),fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})).then((function(n){if(200!==n.status)throw new Error("Status network ".concat(request.status));r("success"),function(t){var n;(n=document.getElementById(t).elements,function(t){if(Array.isArray(t))return e(t)}(n)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(n)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(t,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return"button"!==e.tagName.toLowerCase()&&"button"!==e.type})).forEach((function(e){return e.value=""}))}(t)})).catch((function(e){r("error"),console.error(e)}))}))})("form1"),t("form2"),t("form3")})();