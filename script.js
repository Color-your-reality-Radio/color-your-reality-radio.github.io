// ===============================
// ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦЫ
// ===============================

// кнопка Play
const playButton = document.getElementById("playButton");

// кнопка Next
const nextButton = document.getElementById("nextButton");

// регулятор громкости
const volume = document.getElementById("volume");


// ===============================
// СОСТОЯНИЕ ПЛЕЕРА
// ===============================

let isPlaying = false;


// ===============================
// AUDIO ENGINE
// ===============================

// создаём аудио объект
const audio = new Audio();


// ===============================
// СПИСКИ ТРЕКОВ
// ===============================

// список музыкальных треков

const tracks = [

"audio/tracks/cyrr_track_01.mp3",
"audio/tracks/cyrr_track_02.mp3",
"audio/tracks/cyrr_track_03.mp3"

];


// список джинглов

const jingles = [

"audio/jingles/cyrr_jingle_01.mp3",
"audio/jingles/cyrr_jingle_02.mp3"

];


// ===============================
// AUTO DJ ЛОГИКА
// ===============================

// сколько треков уже сыграло
let tracksPlayed = 0;

// случайное число треков до джингла (3 или 4)
let tracksUntilJingle = getRandomTracksCount();


// функция случайного выбора 3 или 4

function getRandomTracksCount(){

return Math.floor(Math.random()*2)+3;

}


// ===============================
// ВЫБОР СЛУЧАЙНОГО ТРЕКА
// ===============================

let lastTrack = -1;

function getRandomTrack(){

let index;

do{

index = Math.floor(Math.random()*tracks.length);

}while(index === lastTrack);

lastTrack = index;

return tracks[index];

}


// ===============================
// ВЫБОР СЛУЧАЙНОГО ДЖИНГЛА
// ===============================

function getRandomJingle(){

const index = Math.floor(Math.random()*jingles.length);

return jingles[index];

}


// ===============================
// СЛЕДУЮЩИЙ ЭЛЕМЕНТ РАДИО
// ===============================

function playNext(){

let source;

if(tracksPlayed >= tracksUntilJingle){

// играем джингл

source = getRandomJingle();

tracksPlayed = 0;

tracksUntilJingle = getRandomTracksCount();

}else{

// играем музыкальный трек

source = getRandomTrack();

tracksPlayed++;

}

audio.src = source;

audio.play();

}


// ===============================
// PLAY / PAUSE
// ===============================

playButton.addEventListener("click", function () {

if (isPlaying) {

audio.pause();

playButton.textContent = "▶";

isPlaying = false;

} else {

if(!audio.src){

playNext();

}else{

audio.play();

}

playButton.textContent = "||";

isPlaying = true;

}

});


// ===============================
// NEXT КНОПКА
// ===============================

nextButton.addEventListener("click", function(){

playNext();

});


// ===============================
// АВТОПЕРЕКЛЮЧЕНИЕ ТРЕКОВ
// ===============================

audio.addEventListener("ended", function(){

playNext();

});


// ===============================
// ГРОМКОСТЬ
// ===============================

function updateVolumeBackground(){

const value =
(volume.value - volume.min) /
(volume.max - volume.min) * 100;

volume.style.background =
`linear-gradient(to right,#4b0f5f 0%,#4b0f5f ${value}%,white ${value}%,white 100%)`;

}


// движение ползунка

volume.addEventListener("input", function(){

audio.volume = volume.value/100;

updateVolumeBackground();

});


// при загрузке страницы

updateVolumeBackground();
