let randomize_array = document.getElementById("random_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container")
let mini = 1;
let maxi = 20;
let numOfBars = 10;
let unsorted_array = new Array(numOfBars);
let speedFactor = document.getElementById("speed_factor").value;
let heightFactor = document.getElementById("height_factor").value;

function randomN(mini, maxi) {
  return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

function createRandomArray() {
  for (let index = 0; index < numOfBars; index++) {
    unsorted_array[index] = randomN(mini, maxi);
  }
}

function renderBars(array) {
  heightFactor = document.getElementById("height_factor").value;
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.background = "white";
    bar.style.margin = 2 + "px";
    bar.innerText = array[i];
    bar.style.width = 20 + "px";
    bar.style.height = Math.min(array[i] * heightFactor, 450) + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
  console.log(unsorted_array)
  console.log(speedFactor + " " + heightFactor);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = Math.min(array[i] * heightFactor, 450) + "px";
  bars[i].style.width = 30 + "px";
  bars[j].style.height = Math.min(array[j] * heightFactor, 450) + "px";
  bars[j].style.width = 30 + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(100000 / speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  bars[i].innerText = array[i];
  bars[j].innerText = array[j];
  return array;
}

async function heapify(array, n, i) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function heapSort(array) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep(100000 / speedFactor);
  }
  return array;
}
sort_btn.addEventListener("click", function () {
  let sorted_array = heapSort(unsorted_array);
  console.log(sorted_array);
}
);

