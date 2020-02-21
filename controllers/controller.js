"use strict";
var rockets;
var divRocketsPanel = document.getElementById('rocketPanel');
divRocketsPanel.style.display = "none";
var divAllRockets = document.getElementById('allRockets');
var rocketsCount = 0;
var rocket1 = new Rocket("32WESSDS", 3, [10, 30, 80, 0, 0, 0]);
var rocket2 = new Rocket("LDSFJA32", 6, [30, 40, 40, 50, 30, 10]);
var arrayRockets = [rocket1, rocket2];
addCode(rocket1);
addCode(rocket2);
function addRocket() {
    var nameRocket = document.getElementById('nameRocket').value;
    var numThrusters = parseInt(document.getElementById('numThrusters').value);
    var maxPowerInputs = document.getElementsByClassName('maxPowerInputs');
    if (checkPower(maxPowerInputs, numThrusters)) {
        var maxPower = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < numThrusters; i++) {
            maxPower[i] = parseInt(maxPowerInputs[i].value);
        }
        var rocketX = new Rocket(nameRocket, numThrusters, maxPower);
        arrayRockets.push(rocketX);
        addCode(rocketX);
    }
}
function addCode(rocket) {
    rocketsCount++;
    divRocketsPanel.id = "Coet" + rocketsCount;
    var rocketCloned = divRocketsPanel.cloneNode(true);
    rocketCloned.style.display = "block";
    if (rocket.name == "" || rocket.name == null) {
        rocketCloned.childNodes[1].childNodes[1].childNodes[1].textContent = "Coet sense nom " + rocketsCount;
    }
    else {
        rocketCloned.childNodes[1].childNodes[1].childNodes[1].textContent = rocket.name;
    }
    rocketCloned.childNodes[1].childNodes[3].childNodes[3].id = "inc" + rocketsCount;
    rocketCloned.childNodes[1].childNodes[3].childNodes[1].id = "dec" + rocketsCount;
    for (var i = 1; i < 12; i = i + 2) {
        var numProp = (i + 1) / 2;
        if (i < rocket.thrusters * 2)
            rocketCloned.childNodes[3].childNodes[i].textContent = "Propulsor " + numProp;
        var progressBar = rocketCloned.childNodes[5].childNodes[i].childNodes[1].childNodes[1];
        if (rocket.maxPower[(i - 1) / 2] != 0) {
            colorProgressBar(10, progressBar);
        }
        else {
            colorProgressBar(0, progressBar);
        }
    }
    divAllRockets.appendChild(rocketCloned);
}
function disablePower(numThrustersSelect) {
    var maxPowerInputs = document.getElementsByClassName('maxPowerInputs');
    for (var i = 5; i >= numThrustersSelect; i--) {
        maxPowerInputs[i].disabled = true;
        maxPowerInputs[i].value = "";
    }
    for (var i = 0; i < numThrustersSelect; i++) {
        maxPowerInputs[i].disabled = false;
    }
}
function checkPower(maxPowerInputs, numThrusters) {
    var correct = true;
    var power = 0;
    for (var i = 0; i < numThrusters; i++) {
        if (maxPowerInputs[i].value == "") {
            correct = false;
            alert('Hi ha alguna potència sense informar');
        }
        else if (isNaN(parseInt(maxPowerInputs[i].value)) == true) {
            correct = false;
            alert('La potència ha de ser un número.');
        }
        else {
            power = parseInt(maxPowerInputs[i].value);
            if (power > 80) {
                correct = false;
                alert('La potència no pot ser major que 80.');
            }
            else if (power % 10 != 0) {
                correct = false;
                alert('La potència ha de ser múltiple de 10.');
            }
            else if (power < 10) {
                correct = false;
                alert('La potencia ha de ser com a mínim 10.');
            }
        }
    }
    return correct;
}
function colorProgressBar(power, progressBar) {
    switch (power) {
        case 0:
            progressBar.parentNode.style.display = "none";
            break;
        case 10:
            progressBar.textContent = "10";
            progressBar.style.width = "12.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-info";
            break;
        case 20:
            progressBar.textContent = "20";
            progressBar.style.width = "25%";
            progressBar.className = "progress-bar progress-bar-striped bg-info";
            break;
        case 30:
            progressBar.textContent = "30";
            progressBar.style.width = "37.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-success";
            break;
        case 40:
            progressBar.textContent = "40";
            progressBar.textContent = "0";
            progressBar.style.width = "50%";
            progressBar.className = "progress-bar progress-bar-striped bg-success";
            break;
        case 50:
            progressBar.textContent = "50";
            progressBar.style.width = "62.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-warning";
            break;
        case 60:
            progressBar.textContent = "60";
            progressBar.style.width = "75%";
            progressBar.className = "progress-bar progress-bar-striped bg-warning";
            break;
        case 70:
            progressBar.textContent = "70";
            progressBar.style.width = "87.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-danger";
            break;
        case 80:
            progressBar.textContent = "80";
            progressBar.style.width = "100%";
            progressBar.className = "progress-bar progress-bar-striped bg-danger";
            break;
        default:
            alert("S'ha superat el maxim de potència, el propulsor ha explotat!");
            break;
    }
}
function increasePower(button) {
    console.log(button);
    var idButton = button.id;
    var numRocket = parseInt(idButton.charAt(3));
    for (var i = 1; i < 7; i++) {
        var progressBar = button.parentNode.parentNode.parentNode.childNodes[5].childNodes[i * 2 - 1].childNodes[1].childNodes[1];
        //let divThrusters:HTMLDivElement = button.parentNode.parentNode.parentNode.childNodes[5].childNodes[i*2-1];
        var powerThruster = progressBar.textContent;
        if (arrayRockets[numRocket - 1].maxPower[i - 1] != powerThruster) {
            colorProgressBar(50, progressBar);
        }
    }
}
function decreasePower(e) {
}
