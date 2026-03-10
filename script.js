// ===============================
// ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦЫ
// ===============================

const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const volume = document.getElementById("volume");


// ===============================
// СОСТОЯНИЕ ПЛЕЕРА
// ===============================

let isPlaying = false;


// ===============================
// AUDIO ENGINE
// ===============================

const audio = new Audio();
audio.preload = "auto";
audio.volume = volume.value / 100;


// ===============================
// КОЛИЧЕСТВО ФАЙЛОВ
// ===============================

// указываешь только количество

const TRACK_COUNT = 3;
const JINGLE_COUNT = 2;


// ===============================
// АВТОСОЗДАНИЕ СПИСКОВ ФАЙЛОВ
// ===============================

const tracks = [];
const jingles = [];

for(let i=1;i<=TRACK_COUNT;i++){

let number = String(i).padStart(3,"0");

tracks.push(`audio/tracks/cyrr_track_${number}.mp3`);

}

for(let i=1;i<=JINGLE_COUNT;i++){

let number = String(i).padStart(3,"0");

jingles.push(`audio/jingles/cyrr_jingle_${number}.mp3`);

}


// ===============================
// AUTO DJ ЛОГИКА
// ===============================

let tracksPlayed = 0;
let tracksUntilJingle = getRandomTracksCount();

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
// СЛЕДУЮЩИЙ ЭЛЕМЕНТ
// ===============================

function playNext(){

let source;

if(tracksPlayed >= tracksUntilJingle){

source = getRandomJingle();

tracksPlayed = 0;

tracksUntilJingle = getRandomTracksCount();

}else{

source = getRandomTrack();

tracksPlayed++;

}

audio.src = source;

audio.play();

}


// ===============================
// PLAY / PAUSE
// ===============================

playButton.addEventListener("click",function(){

if(isPlaying){

audio.pause();
playButton.textContent="▶";
isPlaying=false;

}else{

if(!audio.src){

playNext();

}else{

audio.play();

}

playButton.textContent="||";
isPlaying=true;

}

});


// ===============================
// NEXT
// ===============================

nextButton.addEventListener("click",function(){

playNext();

});


// ===============================
// АВТОПЕРЕКЛЮЧЕНИЕ
// ===============================

audio.addEventListener("ended",function(){

playNext();

});


// если ошибка файла

audio.addEventListener("error",function(){

playNext();

});


// ===============================
// ГРОМКОСТЬ
// ===============================

function updateVolumeBackground(){

const value=
(volume.value-volume.min)/
(volume.max-volume.min)*100;

volume.style.background=
`linear-gradient(to right,#4b0f5f 0%,#4b0f5f ${value}%,white ${value}%,white 100%)`;

}

volume.addEventListener("input",function(){

audio.volume=volume.value/100;
updateVolumeBackground();

});

updateVolumeBackground();
