console.log("Welcome to Spotify");

document.addEventListener("DOMContentLoaded", () => {

    let audioElement = new Audio("songs/1.mp3");
    let masterPlay = document.getElementById("masterPlay");

    // MASTER PLAY BUTTON (big center one)
    masterPlay.addEventListener("click", () => {

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        } 
        else {
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }

    });

});

let songs = [
    {songName: "Meri Zindagi Hai Tu", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Dooron-Dooron", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Ijazat", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Dil Diyan Gallan", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Tera Mera Hai Pyar Amar", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Jaan Nisaar OST", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},


]