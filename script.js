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
        path: 'Be My Baby.mp3',
        displayName: 'Be My Baby',
        cover: 'beMyBaby.jpg',
        artist: 'Ariana Grande',
    },
    {
        path: 'Sofia.mp3',
        displayName: 'Sofia',
        cover: 'sofia.png',
        artist: 'Clairo',
    },
    {
        path: '1k.mp3',
        displayName: 'A Thousand Miles',
        cover: '1k.png',
        artist: 'Vanessa Carlton',
    },
    {
        path: 'likeALoveSong.mp3',
        displayName: 'Love You Like A Love Song',
        cover: 'sg.jpg',
        artist: 'Selena Gomez',
    },
    {
        path: 'jete.mp3',
        displayName: 'Je te laisserai des mots',
        cover: 'jet.jpg',
        artist: 'Patrick Watson',
    },
    {
        path: 'yk.mp3',
        displayName: 'YK',
        cover: 'yk.jpg',
        artist: 'Cean Jr',
    },
    {
        path: 'lebron.mp3',
        displayName: 'ure my sunshine',
        cover: 'sunshine.jpg',
        artist: 'Lebron James',
    },
    {
        path: 'fallen.mp3',
        displayName: 'Fallen',
        cover: 'fallen.jpg',
        artist: 'Lola Amour',
    },
    {
        path: 'nonsense.mp3',
        displayName: 'Nonsense',
        cover: 'nonsense.jpg',
        artist: 'Sabrina Carpenter',
    },
    {
        path: 'likeThat.mp3',
        displayName: 'Like That',
        cover: 'hotPink.png',
        artist: 'Doja Cat',
    },
    {
        path: 'harleys.mp3',
        displayName: 'Harleys In Hawaii',
        cover: '/harley.jpg',
        artist: 'Katy Perry',
    },
    {
        path: 'agoraHills.mp3',
        displayName: 'Agora Hills',
        cover: 'agoraHills.png',
        artist: 'Doja Cat',
    },
    {
        path: 'pleaseMe.mp3',
        displayName: 'Please Me',
        cover: 'pleaseMe.png',
        artist: 'Cardi B & Bruno Mars',
    },
    {
        path: 'moonlight.mp3',
        displayName: 'Moonlight',
        cover: 'moonlight.jpg',
        artist: 'Kali Uchis',
    },
    {
        path: 'telepatia.mp3',
        displayName: 'telepatía',
        cover: 'telepatia.jpeg',
        artist: 'Kali Uchis',
    },
    {
        path: 'exes.mp3',
        displayName: 'exes',
        cover: 'exes.png',
        artist: 'Tate McRae',
    },
    {
        path: 'sureThing.mp3',
        displayName: 'you are my Sure Thing!',
        cover: 'sureThing.jpg',
        artist: 'Miguel',
    },
    {
        path: 'Feather.mp3',
        displayName: 'Feather',
        cover: 'feather.png',
        artist: 'Sabrina Carpenter',

        path: 'saveYourTears.mp3',
        displayName: 'Save Your Tears',
        cover: 'save.webp',
        artist: 'The Weeknd & Ariana Grande',
    },
    {
        path: 'nvmd.mp3',
        displayName: 'NVMD',
        cover: 'nvmd.jpg',
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
