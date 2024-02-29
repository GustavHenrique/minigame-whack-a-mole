const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameSpeed: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 30,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert('Game Over! Your final score is ' + state.values.result);
        state.values.result = 0;
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
        square.classList.remove('broken-window');
    });

    const randomSquare = state.view.squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function playSound(audioName = 'hitHurt') {
    const audio = new Audio(`./src/audios/${audioName}.wav`);
    audio.volume = 0.1;
    audio.play();
}

function addListenerHitBox() {

    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                square.classList.remove('enemy');
                square.classList.add('broken-window');
                state.values.hitPosition = null;
                playSound('hitHurt');
            }
        });
    });

}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();