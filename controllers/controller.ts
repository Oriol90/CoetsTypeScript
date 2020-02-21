var rockets:string[];
const divRocketsPanel = (<HTMLDivElement>document.getElementById('rocketPanel'));
divRocketsPanel.style.display = "none";
const divAllRockets = (<HTMLDivElement>document.getElementById('allRockets'));
var rocketsCount:number = 0;

let rocket1:Rocket = new Rocket("32WESSDS", 3, [10,30,80,0,0,0]);
let rocket2:Rocket = new Rocket("LDSFJA32", 6, [30,40,40,50,30,10]);
var arrayRockets:Rocket[] = [rocket1,rocket2];

addCode(rocket1);
addCode(rocket2);

function addRocket(){
    
    const nameRocket:string = (<HTMLInputElement>document.getElementById('nameRocket')).value;
    const numThrusters:number = parseInt((<HTMLSelectElement>document.getElementById('numThrusters')).value);
    const maxPowerInputs = (<HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('maxPowerInputs'));
    if(checkPower(maxPowerInputs, numThrusters)){
        let maxPower:number[] = [0,0,0,0,0,0];
        for (let i:number = 0; i<numThrusters; i++){
            maxPower[i] = parseInt(maxPowerInputs[i].value);
        }
        var rocketX = new Rocket(nameRocket, numThrusters, maxPower);
        arrayRockets.push(rocketX);
        addCode(rocketX);
    }
}

function addCode(rocket:Rocket){

    rocketsCount++;
    divRocketsPanel.id = "Coet" + rocketsCount;
    var rocketCloned = divRocketsPanel.cloneNode(true);
    (<HTMLDivElement>rocketCloned).style.display = "block";

    if(rocket.name == "" || rocket.name == null){
        (<HTMLLabelElement>rocketCloned.childNodes[1]).childNodes[1].childNodes[1].textContent = "Coet sense nom " + rocketsCount;
    }else{
        (<HTMLLabelElement>rocketCloned.childNodes[1]).childNodes[1].childNodes[1].textContent = rocket.name;
    }   

    (<HTMLButtonElement>rocketCloned.childNodes[1].childNodes[3].childNodes[3]).id = "inc" + rocketsCount;
    (<HTMLButtonElement>rocketCloned.childNodes[1].childNodes[3].childNodes[1]).id = "dec" + rocketsCount;

    for( let i:number = 1; i<12; i=i+2){
        let numProp:number = (i+1)/2;
        if(i < rocket.thrusters*2)
        (<HTMLLabelElement>rocketCloned.childNodes[3]).childNodes[i].textContent = "Propulsor " + numProp;

        let progressBar:HTMLProgressElement = (<HTMLProgressElement>rocketCloned.childNodes[5].childNodes[i].childNodes[1].childNodes[1]);
        if(rocket.maxPower[(i-1)/2] != 0){
            colorProgressBar(10, progressBar);
        }else{
            colorProgressBar(0, progressBar);
        }
        
    }
    divAllRockets.appendChild(rocketCloned);
}

function disablePower(numThrustersSelect:number){
    const maxPowerInputs = (<HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('maxPowerInputs'));
    for (let i:number = 5; i>=numThrustersSelect; i--){
        maxPowerInputs[i].disabled = true;
        maxPowerInputs[i].value = "";
    }
    for (let i:number = 0; i<numThrustersSelect; i++){
        maxPowerInputs[i].disabled = false;
    }
}

function checkPower(maxPowerInputs:HTMLCollectionOf<HTMLInputElement>, numThrusters:number){
    let correct:boolean = true;
    let power:number = 0;
    for(let i:number = 0; i<numThrusters; i++){
        if(maxPowerInputs[i].value == ""){
            correct = false;
            alert('Hi ha alguna potència sense informar');
        }
        else if(isNaN(parseInt(maxPowerInputs[i].value)) == true){
            correct = false;
            alert('La potència ha de ser un número.');
        }else{
            power = parseInt(maxPowerInputs[i].value);
            if(power > 80){
                correct = false;
                alert('La potència no pot ser major que 80.');
            }else if(power % 10 != 0){
                correct = false;
                alert('La potència ha de ser múltiple de 10.');
            }else if(power < 10){
                correct = false;
                alert('La potencia ha de ser com a mínim 10.')
            }
        }
    }
    return correct;
}

function colorProgressBar(power:number, progressBar:HTMLProgressElement){
    switch (power){

        case 0:
            (<HTMLDivElement>progressBar.parentNode).style.display = "none";
            break;
        case 10:
            progressBar.textContent = "10";
            progressBar.value = 10;
            progressBar.style.width = "12.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-info";
            break;
        case 20:
            progressBar.textContent = "20";
            progressBar.value = 20;
            progressBar.style.width = "25%";
            progressBar.className = "progress-bar progress-bar-striped bg-info";
            break;
        case 30:
            progressBar.textContent = "30";
            progressBar.value = 30;
            progressBar.style.width = "37.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-success";
            break;
        case 40:
            progressBar.textContent = "40";
            progressBar.value = 40;
            progressBar.style.width = "50%";
            progressBar.className = "progress-bar progress-bar-striped bg-success";
            break;
        case 50:
            progressBar.textContent = "50";
            progressBar.value = 50;
            progressBar.style.width = "62.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-warning";
            break;
        case 60:
            progressBar.textContent = "60";
            progressBar.value = 60;
            progressBar.style.width = "75%";
            progressBar.className = "progress-bar progress-bar-striped bg-warning";
            break;
        case 70:
            progressBar.textContent = "70";
            progressBar.value = 70;
            progressBar.style.width = "87.5%";
            progressBar.className = "progress-bar progress-bar-striped bg-danger";
            break;
        case 80:
            progressBar.textContent = "80";
            progressBar.value = 80;
            progressBar.style.width = "100%";
            progressBar.className = "progress-bar progress-bar-striped bg-danger";
            break;
        default:
            alert("S'ha superat el maxim de potència, el propulsor ha explotat!");
            break;
    }
}  

function increasePower(button:any){
    let idButton:string = button.id;
    let numRocket:number = parseInt(idButton.charAt(3));

    for(let i:number = 1; i<7; i++){
        let progressBar:HTMLProgressElement = button.parentNode.parentNode.parentNode.childNodes[5].childNodes[i*2-1].childNodes[1].childNodes[1];
        let powerThruster:number = progressBar.value;
        if(arrayRockets[numRocket-1].maxPower[i-1] != powerThruster && arrayRockets[numRocket-1].maxPower[i-1] != 0){
            colorProgressBar(powerThruster + 10, progressBar);
        }
    }
}

function decreasePower(button:any){
    let idButton:string = button.id;
    let numRocket:number = parseInt(idButton.charAt(3));
    for(let i:number = 1; i<7; i++){
        let progressBar:HTMLProgressElement = button.parentNode.parentNode.parentNode.childNodes[5].childNodes[i*2-1].childNodes[1].childNodes[1];
        let powerThruster:number = progressBar.value;
        if(powerThruster != 0 && powerThruster != 10){
            colorProgressBar(powerThruster - 10, progressBar);
        }
    }
}