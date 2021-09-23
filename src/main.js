"use strict";

let textInput = document.querySelector(".textInput");
let lengthWOblank = document.querySelector(".lengthWOblank");
let lengthWblank = document.querySelector(".lengthWblank");
let words = document.querySelector(".words");
let readingTime = document.querySelector(".readingTime");
let wordCount = 0;

const slider = document.querySelector(".slider");
const cpmPara = document.querySelector(".cpm");
const cpmPara2 = document.querySelector(".cpm2");
const speedPara = document.querySelector(".speed");

let textInput2 = document.querySelector(".textInput2");

let readingTimeValue = 0;
let cpm = 0;
const radioBtn = document.getElementsByName("checking");

let seconds = 20;

let numberOfPPT = document.querySelector(".numberOfPPT");
let termOfPPT = document.querySelector(".termOfPPT");
let materialTime = document.querySelector(".materialTime");
let pptTime = 0;

const language = document.querySelector(".language");
language.addEventListener("change", () => {
  document.location.href = `https://presentationtime.netlify.app/${language.value}`;
});

const modalCloseBtn = document.querySelector(".modal__link--close");
const modal = document.querySelector(".modal__bg");

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// keyup과 input
// keyup은 right-click & paste일 때는 event되지 않는다.
// input은 모든 변화에 대하여 발생한다.

textInput.addEventListener("input", () => {
  // 예외처리. 글자가 있었다가 지워지면, 빈 array로 남게되어, 글자/단어가 1로 취급됨.
  if (textInput.value == "") {
    words.innerHTML = "0 개";
    lengthWblank.innerHTML = "0 자 / 0 Byte";
    lengthWOblank.innerHTML = "0 자 / 0 Byte";
  } else {
    // 글자수세기(공백포함)
    lengthWblank.innerHTML = `${textInput.value.length} 자 / ${byteCounter(
      textInput.value,
      1
    )} Byte`;

    // 글자수세기(공백미포함)
    // \s 는 줄바꿈, 공백 또는 탭과 같은 글자가 포함되어 있지 않은 문자를 말합니다.
    // + 는 1개 이상의 것을 의미합니다. 글자가 2개 연속있거나, 줄바꿈이 3개 연속있거나 하는 것들을 모두 가리킵니다.
    // 이를 / / 사이에 넣으면 정규식이 됩니다.
    // g 는 global 을 의미하고, textInput.value에 있는 모든 \s+ 를 말합니다.
    lengthWOblank.innerHTML = `${
      textInput.value.replace(/\s+/g, "").length
    } 자 / ${byteCounter(textInput.value.replace(/\s+/g, ""), 0)} Byte`;

    // 단어수세기
    countWords(textInput.value);
  }
  calPTtime();
});

let sliderContainer = document.querySelector(".sliderContainer");
let customizeContainer = document.querySelector(".customizeContainer");

radioBtn[0].onclick = function () {
  sliderContainer.style.backgroundColor = "var(--color-second)";
  customizeContainer.style.backgroundColor = "transparent";
  calPTtime();
};

radioBtn[1].onclick = function () {
  sliderContainer.style.backgroundColor = "transparent";
  customizeContainer.style.backgroundColor = "var(--color-second)";
  calPTtime();
};

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  calPTtime();
};
numberOfPPT.oninput = function () {
  calPTtime();
};
termOfPPT.oninput = function () {
  calPTtime();
};
materialTime.oninput = function () {
  calPTtime();
};
textInput2.oninput = function () {
  calPTtime();
};

function calPTtime() {
  if (radioBtn[0].checked) {
    cpm = slider.value;
    cpmPara.innerHTML = `${slider.value} CPM (Character/Minute)`;
    if (textInput.value == "") {
      cpmPara2.innerHTML = "";
    } else {
      cpmPara2.innerHTML = ` (${slider.value} CPM)`;
    }

    pptTime = 0;
  } else {
    if (textInput2.value == "") {
      readingTime.innerHTML = "Please, Customize";
      cpmPara2.innerHTML = "";
      return;
    }
    cpm = Math.round(
      (textInput2.value.trim().replace(/\s+/g, " ").length / seconds) * 60
    );
    cpmPara2.innerHTML = ` (${cpm} CPM)`;

    if (numberOfPPT.value == "" || numberOfPPT.value < 0) {
      numberOfPPT.value = 0;
    }
    if (termOfPPT.value == "" || termOfPPT.value < 0) {
      termOfPPT.value = 0;
    }
    if (materialTime.value == "" || materialTime.value < 0) {
      materialTime.value = 0;
    }
    if (numberOfPPT.value <= 1) {
      pptTime = parseFloat(materialTime.value);
    } else {
      pptTime =
        (parseFloat(numberOfPPT.value) - 1) * parseFloat(termOfPPT.value) +
        parseFloat(materialTime.value);
    }
  }
  readingTimeValue =
    pptTime + (textInput.value.trim().replace(/\s+/g, " ").length / cpm) * 60;
  if (readingTimeValue <= 60) {
    readingTime.innerHTML = `${Math.round(readingTimeValue)}초`;
  } else {
    readingTime.innerHTML = `${Math.floor(
      readingTimeValue / 60
    )}분 ${Math.round(
      readingTimeValue - Math.floor(readingTimeValue / 60) * 60
    )}초`;
  }
}

// stop watch
var stTime = 0;
var endTime = 0;
var timerStart;
var min;
var sec;
var milisec;
var startBtn = document.getElementById("testStartBtn");
var stopBtn = document.getElementById("testStopBtn");
// var recordList = document.getElementById('testRecordList')

startBtn.addEventListener("click", function () {
  if (!stTime) {
    stTime = Date.now(); // 최초 START
  } else if (this.innerText === "RESTART") {
    stopBtn.innerText = "STOP";
    this.innerText = "START";
    stTime += Date.now() - endTime; // RESTART
  } else if (this.innerText === "START") {
    return;
  }

  timerStart = setInterval(function () {
    var nowTime = new Date(Date.now() - stTime);
    min = addZero(nowTime.getMinutes());
    sec = addZero(nowTime.getSeconds());
    milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));
    document.getElementById("postTestMin").innerText = min;
    document.getElementById("postTestSec").innerText = sec;
    document.getElementById("postTestMilisec").innerText = milisec;
  }, 1);
});

stopBtn.addEventListener("click", function () {
  if (timerStart) {
    clearInterval(timerStart); // STOP

    if (this.innerText == "STOP") {
      endTime = Date.now();
      this.innerText = "RESET";
      startBtn.innerText = "RESTART";
    } else {
      // RESET
      stTime = 0;
      min = 0;
      sec = 0;
      milisec = 0;
      document.getElementById("postTestMin").innerText = "00";
      document.getElementById("postTestSec").innerText = "00";
      document.getElementById("postTestMilisec").innerText = "00";
      startBtn.innerText = "START";
      this.innerText = "STOP";
      timerStart = null;
    }
  }
});

function addZero(num) {
  return num < 10 ? "0" + num : "" + num;
}

// 단어수세기 함수
function countWords(text) {
  wordCount = 0;
  let arr = text.trim().split(/\s+/);

  for (let i = 0; i < arr.length; i++) {
    if (isWord(arr[i])) {
      wordCount++;
    }
  }
  words.innerHTML = `${wordCount} 개`;
}

// 띄어쓰기 단위로 구성된 배열이 단어인지 검사하는 함수
function isWord(str) {
  let alphaNumericFound = false;
  for (let i = 0; i < str.length; i++) {
    if (/[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(str[i])) {
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

function byteCounter(text, blank = 0) {
  // blank === 0 -> 공백 미포함  ,  blank !== 1 -> 공백 포함
  let byte = 0;
  if (blank == 0) {
    text = text.replace(/\s+/g, "");
  }

  for (let i = 0; i < text.length; i++) {
    // if (/[ㄱ-ㅎㅏ-ㅣ가-힣一-龥ぁ-ゔァ-ヴー々〆〤]/.test(text[i])) {
    //     byte = byte+2
    // } else {
    //     byte++
    // }
    // 한자, 일본어, 한글는 2글자 나머지는 1글자로 하는 법

    // 공백, 영어, 숫자, 키보드에 있는 특수문자는 1글자, 나머지는 2글자로 하는법
    // 키보드에 없는 특수문자는 2바이트가 넘기 때문에 좀 더 정확한 방법
    // 하지만, emoji, 기타 특수문자, 타언어 등이 포함되면 다른 결과가 나올 수 있다.
    if (/[\sa-zA-Z0-9`~!@#$%^&*()_+-={}\[\];':",./<>?]/.test(text[i])) {
      byte++;
    } else {
      byte = byte + 2;
    }
  }
  return byte;
}
