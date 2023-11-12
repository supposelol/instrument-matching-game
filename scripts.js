// Array of instrument names
const instruments = ['drums', 'violin', 'guitar']; 

// Variable to store the currently playing sound
let currentAudio;

// Function to play a random sound
function playRandomSound() {
    const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];
    const audio = new Audio(`sounds/${randomInstrument}.mp3`); 
    audio.play();
    return audio;
}

// Function to display images and play sound
function displayImages() {
    // Stop the currently playing sound, if any
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Play a new sound
    currentAudio = playRandomSound();

    const playedInstrument = getInstrumentFromAudio(currentAudio);

    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    instruments.forEach(instrument => {
        const img = document.createElement('img');
        img.src = `images/${instrument}.jpg`; 
        img.alt = instrument;
        img.addEventListener('click', () => checkAnswer(instrument, playedInstrument));
        imageContainer.appendChild(img);
    });
}

// Function to get the instrument name from the audio file
function getInstrumentFromAudio(audio) {
    const audioSrc = audio.src;
    const instrumentName = audioSrc.split('/').pop().split('.')[0];
    return instrumentName;
}

// Function to restart the game
function restartGame() {
    displayImages();
}

// Function to check if the clicked image matches the played sound
function checkAnswer(selectedInstrument, playedInstrument) {
    if (selectedInstrument === playedInstrument) {
        alert('Correct! You matched the sound and the instrument. Restarting the game.');
        location.reload();
    } else {
        alert('Incorrect. Try again!');
    }
}

// Event listener for the play button
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', displayImages);
