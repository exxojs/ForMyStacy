const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'audio/Be My Baby.mp3',
        displayName: 'Be My Baby',
        cover: 'cover/beMyBaby.jpg',
        artist: 'Ariana Grande',
    },
    {
        path: 'audio/Sofia.mp3',
        displayName: 'Sofia',
        cover: 'cover/sofia.png',
        artist: 'Clairo',
    },
    {
        path: 'audio/1k.mp3',
        displayName: 'A Thousand Miles',
        cover: 'cover/1k.png',
        artist: 'Vanessa Carlton',
    },
    {
        path: 'audio/likeALoveSong.mp3',
        displayName: 'Love You Like A Love Song',
        cover: 'cover/sg.jpg',
        artist: 'Selena Gomez',
    },
    {
        path: 'audio/jete.mp3',
        displayName: 'Je te laisserai des mots',
        cover: 'cover/jet.jpg',
        artist: 'Patrick Watson',
    },
    {
        path: 'audio/yk.mp3',
        displayName: 'YK',
        cover: 'cover/yk.jpg',
        artist: 'Cean Jr',
    },
    {
        path: 'audio/lebron.mp3',
        displayName: 'ure my sunshine',
        cover: 'cover/sunshine.jpg',
        artist: 'Lebron James',
    },
    {
        path: 'audio/fallen.mp3',
        displayName: 'Fallen',
        cover: 'cover/fallen.jpg',
        artist: 'Lola Amour',
    },
    {
        path: 'audio/nonsense.mp3',
        displayName: 'Nonsense',
        cover: 'cover/nonsense.jpg',
        artist: 'Sabrina Carpenter',
    },
    {
        path: 'audio/likeThat.mp3',
        displayName: 'Like That',
        cover: 'cover/hotPink.png',
        artist: 'Doja Cat',
    },
    {
        path: 'audio/harleys.mp3',
        displayName: 'Harleys In Hawaii',
        cover: 'cover/harley.jpg',
        artist: 'Katy Perry',
    },
    {
        path: 'audio/agoraHills.mp3',
        displayName: 'Agora Hills',
        cover: 'cover/agoraHills.png',
        artist: 'Doja Cat',
    },
    {
        path: 'audio/pleaseMe.mp3',
        displayName: 'Please Me',
        cover: 'cover/pleaseMe.png',
        artist: 'Cardi B & Bruno Mars',
    },
    {
        path: 'audio/moonlight.mp3',
        displayName: 'Moonlight',
        cover: 'cover/moonlight.jpg',
        artist: 'Kali Uchis',
    },
    {
        path: 'audio/telepatia.mp3',
        displayName: 'telepatía',
        cover: 'cover/telepatia.jpeg',
        artist: 'Kali Uchis',
    },
    {
        path: 'audio/exes.mp3',
        displayName: 'exes',
        cover: 'cover/exes.png',
        artist: 'Tate McRae',
    },
    {
        path: 'audio/sureThing.mp3',
        displayName: 'you are my Sure Thing!',
        cover: 'cover/sureThing.jpg',
        artist: 'Miguel',
    },
    {
        path: 'audio/Feather.mp3',
        displayName: 'Feather',
        cover: 'cover/feather.png',
        artist: 'Sabrina Carpenter',
    },
    {
        path: 'audio/saveYourTears.mp3',
        displayName: 'Save Your Tears',
        cover: 'cover/save.webp',
        artist: 'The Weeknd & Ariana Grande',
    },
    {
        path: 'audio/nvmd.mp3',
        displayName: 'NVMD',
        cover: 'cover/nvmd.jpg',
        artist: 'Denise Julia',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);