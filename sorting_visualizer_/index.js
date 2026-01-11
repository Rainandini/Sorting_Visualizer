import { sleep } from "./helpers/util.js";
import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";

let nBars = 10;

let numbersBars = document.getElementById("numbersBars");
const stage = document.getElementById("stage");
const selectAlgorithm = document.getElementById("selectAlgorithm");
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");

let bars = [];
let barsDivs = [];

const sortingAlgorithms = new SortingAlgorithms({});

const start = () => {
  stage.innerHTML = "";
  bars = [];
  barsDivs = [];

  stage.style.width = `${nBars * 30}px`;

  const stageHeight = stage.clientHeight;

  // Step 1: generate values
  const values = Array(nBars)
    .fill(0)
    .map(() => Math.floor(Math.random() * 100) + 1);

  const maxValue = Math.max(...values);

  // Step 2: map values to scaled heights
  bars = values.map((value, index) => ({
    width: 20,
    value,
    height: (value / maxValue) * stageHeight,
    position: index,
  }));

  // Step 3: render bars
  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("bar");
    bar.style.width = `${bars[i].width}px`;
    bar.style.height = `${bars[i].height}px`;
    bar.style.left = `${5 + i * 30}px`;
    bar.style.bottom = "0px";

    barsDivs.push(bar);
    stage.appendChild(bar);
  }
};

start();

async function swapBars(barsDivs, i, j) {
  barsDivs[i].style.left = `${5 + j * 30}px`;
  barsDivs[j].style.left = `${5 + i * 30}px`;

  barsDivs[i].classList.add("activate");
  barsDivs[j].classList.add("activate");

  await sleep(300);

  barsDivs[i].classList.remove("activate");
  barsDivs[j].classList.remove("activate");

  let temp = barsDivs[i];
  barsDivs[i] = barsDivs[j];
  barsDivs[j] = temp;
}

const algorithms = [
  sortingAlgorithms.bubbleSort,
  sortingAlgorithms.selectionSort,
  sortingAlgorithms.quickSort,
];

const solve = async () => {
  const array = structuredClone(bars.map((el) => el.value));

  const swaps = algorithms[selectAlgorithm.selectedIndex](array);

  for (let i = 0; i < swaps.length; i++) {
    if (swaps[i].firstPostion !== swaps[i].lastPosition) {
      await swapBars(
        barsDivs,
        swaps[i].firstPostion,
        swaps[i].lastPosition
      );
    }
  }
};

generateBtn.addEventListener("click", () => {
  nBars = parseInt(numbersBars.value, 10);
  start();
});

solveBtn.addEventListener("click", () => {
  solve();
});
