const game = document.getElementById("game");
const itemGame = game.getElementsByTagName("img");
const btnStart = document.getElementById("btn-start");
const optionGame = document.getElementById("option-game");
const optionItems = Array.from(
  optionGame.getElementsByClassName("option-item-all")
);
const btnReset = document.getElementById("btn-reset");

const arrItem = [
  "./img/bau.png",
  "./img/ca.png",
  "./img/cua.png",
  "./img/ga.png",
  "./img/huou.png",
  "./img/tom.png",
];

let resultGame = [];
let resultOption = [];
let count = 3;
let isSpinning = false;

function randomItem() {
  const randomNumber = Math.floor(Math.random() * arrItem.length);
  return arrItem[randomNumber];
}

btnStart.addEventListener("click", function () {
  if (isSpinning) return;

  isSpinning = true;
  resultGame = [];

  btnStart.disabled = true;
  optionItems.forEach((element) => {
    element.style.pointerEvents = "none";
  });
  btnReset.disabled = true;

  const interval = setInterval(function () {
    for (let i = 0; i < itemGame.length; i++) {
      itemGame[i].src = randomItem();
    }
  }, 30);

  setTimeout(() => {
    clearInterval(interval);
    for (let i = 0; i < itemGame.length; i++) {
      itemGame[i].src = randomItem();
      resultGame.push(itemGame[i].src);
    }

    isSpinning = false;
    btnStart.disabled = false;
    optionItems.forEach((element) => {
      element.style.pointerEvents = "auto";
    });
    btnReset.disabled = false;

    if (checkWin()) {
      console.log("Bạn đã đoán đúng");
    } else {
      console.log("Bạn đã đoán sai");
    }
  }, 3000);
});

optionItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (isSpinning) return; // Ngăn người dùng chọn khi đang quay
    if (count != 0) {
      const imgElement = element.querySelector("img");
      resultOption.push(imgElement.src);
      count--;
      const countItemOption = element.querySelector("p");
      countItemOption.textContent = parseInt(countItemOption.textContent) + 1;
    } else {
      alert("Bạn chỉ có thể chọn 3 lần");
    }
  });
});

btnReset.addEventListener("click", () => {
  resultOption = [];
  count = 3;
  for (let i = 0; i < optionItems.length; i++) {
    const countItemOption = optionItems[i].querySelector("p");
    countItemOption.textContent = "0";
  }
});

function checkWin() {
  resultGame.sort();
  resultOption.sort();
  for (let i = 0; i < 3; i++) {
    if (resultGame[i] != resultOption[i]) return false;
  }
  return true;
}
