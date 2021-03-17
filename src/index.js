'use strict';

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import animatedTogglePopUp from "./modules/animatedTogglePopUp";
import tabs from "./modules/tabs";
import addDot from "./modules/addDot";
import slider from "./modules/slider";
import checkCalcInput from "./modules/checkCalcInput";
import changeImg from "./modules/changeImg";
import blockInputValid from "./modules/blockInputValid";
import blockInput from "./modules/blockInput";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

countTimer('24 February 2021');
toggleMenu();
animatedTogglePopUp();
tabs();
addDot();
slider();
changeImg();
checkCalcInput();
blockInput();
blockInputValid();
calc(100);
sendForm();