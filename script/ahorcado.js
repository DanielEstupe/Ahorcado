var word = '';
var copyWord = '';
var step = 1;

function createNodes(){
    console.log('creando los espacios para las letras');
    var content = document.getElementById('showLetters');
    var numLetters = word.length;
    for(var i = 0; i < numLetters; i++){
        content.innerHTML += '<div class="letters"></div>';  
    }
}

function createFigure(){
    console.log('create figure');
    var figure = document.getElementById('ahorcado');
    figure = figure.getContext('2d');
    figure.beginPath();
    figure.moveTo(60, 148);
    figure.lineTo(180, 148);
    figure.moveTo(120, 148);
    figure.lineTo(120, 20);
    figure.lineTo(190, 20);
    figure.lineTo(190, 40);
    figure.stroke();
}

function showValidates(letter, index){
    console.log('mostrando las letras en el espacio que le corresponden');
    var box = document.querySelectorAll('.letters');
    
    index = index.split('');
    for(var i = 0; i < index.length; i++){
        box[index[i]].innerHTML = letter ;
    }
}

function drawAhorcado(step){
    console.log('dibujando el ahorcado, me quedan ' + (6-step) + ' oportunidades');
    var figure = document.getElementById('ahorcado');
    figure = figure.getContext('2d');
    figure.beginPath();
    switch(step){
        case 1:
            figure.arc(190,50,10,0,Math.PI*2, false);
            figure.stroke(); 
            break;
        case 2:
            figure.moveTo(190, 60);
            figure.lineTo(190, 90);
            figure.stroke();
            break;
        case 3:
            figure.moveTo(190, 70);
            figure.lineTo(165, 70);
            figure.stroke();
            break;
        case 4:
            figure.moveTo(190, 70);
            figure.lineTo(215, 70);
            figure.stroke();
            break;
        case 5:
            figure.moveTo(190, 90);
            figure.lineTo(165, 110);
            figure.stroke();
            break;
        case 6:
            figure.moveTo(190, 90);
            figure.lineTo(215, 110);
            figure.stroke();
            break;
    }
    
}


function setStatus(status){
    var $title = document.querySelector('#lose h2');
    
    if(status){        
        $title.innerHTML = 'Acertaste!!';
    }
    else{
        var textPlayer1 = document.getElementById('word');
        var showText = document.querySelector('#lose p');
        textPlayer1.innerHTML = ' ' + word;
        showText.style.display = 'inline';
        $title.innerHTML = 'Ahorcado';
	 }
        
}

function showFinish(){
    console.log('finish');
    var content = $('#lose');
    content.slideDown('slow');
    $('#lose h2').animate({
        fontSize: '3em'
    });
}

function quitWords(copy, num){
    var moment = '';
    for(var i = 0; i < num; i++){
        if(copyWord[i] != copy){
            moment += copyWord[i];
        }
    }
    copyWord = moment;
}

function toHeard(elEvento){
    console.log('escuchando el teclado');
    var evento = elEvento || window.event;
    var us2 = evento.charCode || evento.keyCode;
    var us1 = word.split('');
    
    us2 = String.fromCharCode(us2);
    
    var indexValidate = '';
    for(var i = 0; i < us1.length; i++){
        if(us2 == us1[i]){
            indexValidate += [i];
            quitWords(us2, copyWord.length);
        }
    }
    
    if(indexValidate.length >= 1){
        showValidates(us2, indexValidate);
    }
    else{
        drawAhorcado(step);
        step++;
    }
    
    if(step > 6 || (copyWord.length == 0)){
        document.removeEventListener('keypress', toHeard, true);
        if(step > 6){
            setStatus(0);
        }
        else{
            setStatus(1);
        }
        showFinish();
    }
}

function beginPlayer2(){
    var inputSelect = document.getElementById('letter');
    inputSelect.removeEventListener('keypress', heardInput, false);
    word = $('#letter').val();
    word = word.toLowerCase();
    copyWord = word;
    if(word.length > 0){
        $('#player_1').slideUp();
        $('#player_2').slideDown();
        createNodes();
        document.addEventListener('keypress', toHeard, true);
    }
    else{
        word = '';
    }
}

function heardInput(theEvent){
    var enter = 13;
    var $event = theEvent || window.event;
    var code = $event.charCode || $event.keyCode;
    
    if((code == enter) && ($('#letter').val() != 0)){
        beginPlayer2();
    }
}

window.onload = function(){
    console.log('begin game');
    createFigure();
    var play = document.getElementById('play');
    play.addEventListener('click', beginPlayer2, false);
    var inputSelect = document.getElementById('letter');
    inputSelect.addEventListener('keypress', heardInput, false);
}



        