'use strict';
//Chọn Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//khai báo ban đầu cho các Element
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let scores = [];
let currentScore;
let activePlayer; //biến ghi nhận người đang chơi
let playing; //biến trạng thái cho biết trò chơi đang diễn ra

//tạo funtion init có chức năng như nút reset

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; //biến ghi nhận người đang chơi
  playing = true; //biến trạng thái cho biết trò chơi đang diễn ra

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//funtion chuyển người chơi
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //trả current score của người đang chơi về 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //toggle cho phép thêm class nếu class chưa có, hoặc xóa class nếu class đang có sẵn
  player1El.classList.toggle('player--active');
};

//sự kiện tung xúc xắc --- btn--roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Tung xúc xắc một cách ngẫu nhiên
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Hiển thị xúc xắc
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Nếu xúc xắc 1: chuyển người chơi khác
    //nếu dice <> 1 thì sẽ ghi điểm xúc xắc vào số điểm hiện tại
    if (dice !== 1) {
      //Thêm điểm vào current
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //chuyển người chơi khi xúc xắc =1
      switchPlayer();
    }
  }
});

//lưu điểm người chơi khi bấm vào nút hold
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. cộng điểm hiện tại vào điểm người chơi
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Nếu điểm >= 100 thì kết thúc trò chơi
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--acive`);
    }
    //3. Nếu điểm <100 thì chuyển người chơi
    else {
      diceEl.classList.add('hidden');
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener('click', init);
