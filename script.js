// получаем кнопку Play
const playButton = document.getElementById("playButton");

// состояние плеера
let isPlaying = false;

// обработчик нажатия
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
