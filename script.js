// получаем кнопку Play
const playButton = document.getElementById("playButton");

// получаем регулятор громкости
const volume = document.getElementById("volume");

// состояние плеера
let isPlaying = false;


// обработчик нажатия PLAY / PAUSE

playButton.addEventListener("click", function () {

    if (isPlaying) {

        // если играло → ставим паузу
        playButton.textContent = "▶";
        isPlaying = false;

    } else {

        // если было на паузе → запускаем
        playButton.textContent = "||";
        isPlaying = true;

    }

});


// функция обновления цвета громкости

function updateVolumeBackground(){

const value =
(volume.value - volume.min) /
(volume.max - volume.min) * 100;

volume.style.background =
`linear-gradient(to right,#4b0f5f 0%,#4b0f5f ${value}%,white ${value}%,white 100%)`;

}


// обновляем при движении ползунка

volume.addEventListener("input", updateVolumeBackground);


// обновляем при загрузке страницы

updateVolumeBackground();
