console.log("Welcome to Spotify");

document.addEventListener("DOMContentLoaded", () => {

    let songIndex = 0;
    let audioElement = new Audio("songs/1.mp3");
    let masterPlay = document.getElementById("masterPlay");
    let progressBar = document.getElementById("ProgressBar");
    let gif = document.querySelector(".songInfo img");
    let songItemPlay = document.getElementsByClassName("songListPlay");
    let next = document.getElementById("next");
    let previous = document.getElementById("previous");
    let songInfoText = document.querySelector("#songInfo");
    let volumeSlider = document.getElementById("volume");

    let currentTimeEl = document.getElementById("currentTime");
    let totalTimeEl = document.getElementById("totalTime");

    let songs = [
        {songName: "Meri Zindagi Hai Tu", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
        {songName: "Dooron-Dooron", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
        {songName: "Ijazat", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
        {songName: "Dil Diyan Gallan", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},
        {songName: "Tera Mera Hai Pyar Amar", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
        {songName: "Jaan Nisaar OST", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"}
    ];

    // MASTER PLAY
    masterPlay.addEventListener("click", () => {
        if(audioElement.paused){
            audioElement.play();
            masterPlay.classList.replace("fa-circle-play","fa-circle-pause");
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.replace("fa-circle-pause","fa-circle-play");
            gif.style.opacity = 0;
        }
    });

    // LOAD METADATA (TOTAL TIME)
    audioElement.addEventListener("loadedmetadata", () => {
        progressBar.value = 0;

        let totalMin = Math.floor(audioElement.duration / 60);
        let totalSec = Math.floor(audioElement.duration % 60);
        if(totalSec < 10) totalSec = "0" + totalSec;

        totalTimeEl.innerText = `${totalMin}:${totalSec}`;
    });

    // TIME UPDATE + PROGRESS BAR
    audioElement.addEventListener("timeupdate", () => {
        if (!isNaN(audioElement.duration)) {
            let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            progressBar.value = progress;
        }

        let curMin = Math.floor(audioElement.currentTime / 60);
        let curSec = Math.floor(audioElement.currentTime % 60);
        if(curSec < 10) curSec = "0" + curSec;

        currentTimeEl.innerText = `${curMin}:${curSec}`;
    });

    // SEEK
    progressBar.addEventListener("input", () => {
        if (!isNaN(audioElement.duration)) {
            audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
        }
    });

    // RESET BUTTONS
    const makeAllPlays = () => {
    Array.from(songItemPlay).forEach((element) => {
        let icon = element.querySelector("i");
        icon.classList.remove("fa-circle-pause");
        icon.classList.add("fa-circle-play");
    });

    let items = document.getElementsByClassName("songItem");
    Array.from(items).forEach((item) => {
        item.style.backgroundColor = "antiquewhite";
    });
};

    // PLAY SONG FUNCTION
    function playSong(index){
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update song name
    songInfoText.innerText = songs[index].songName;

    makeAllPlays();

    // Highlight current song
    let items = document.getElementsByClassName("songItem");
    items[index].style.backgroundColor = "lightgreen";

    masterPlay.classList.replace("fa-circle-play","fa-circle-pause");
    gif.style.opacity = 1;
}

    // SMALL PLAY BUTTONS
    Array.from(songItemPlay).forEach((element, i) => {
        element.addEventListener("click", () => {
            songIndex = i;
            playSong(songIndex);

            let icon = element.querySelector("i");
            icon.classList.remove("fa-circle-play");
            icon.classList.add("fa-circle-pause");
        });
    });

    // NEXT BUTTON
    next.addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;
        playSong(songIndex);
    });

    // PREVIOUS BUTTON
    previous.addEventListener("click", () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        playSong(songIndex);
    });

    // VOLUME
    audioElement.volume = 0.5;
    volumeSlider.addEventListener("input", () => {
        audioElement.volume = volumeSlider.value;
    });

});