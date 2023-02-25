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

async function swap(array, leftIndex, rightIndex, bars) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  var temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
  bars[leftIndex].style.height = Math.min(array[leftIndex] * heightFactor, 450) + "px";
  bars[leftIndex].style.width = 30 + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  bars[leftIndex].innerText = array[leftIndex];
  bars[rightIndex].style.height = Math.min(array[rightIndex] * heightFactor, 450) + "px";
  bars[rightIndex].style.width = 30 + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  bars[rightIndex].innerText = array[rightIndex];
  await sleep(100000 / speedFactor);
}

async function partition(array, left, right) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = array[pivotIndex];
  bars[pivotIndex].style.backgroundColor = "red";
  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }
  var i, j;
  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(array, i, j, bars); //swapping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(array, left, right) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  var index;
  if (array.length > 1) {
    index = await partition(array, left, right);
    if (left < index - 1) {
      await quickSort(array, left, index - 1);
    }
    if (index < right) {
      await quickSort(array, index, right);
    }
  }
  for (let index = 0; index < bars.length; index++) {
    bars[index].style.backgroundColor = "aqua";
  }
  return array;
}

sort_btn.addEventListener("click", function () {
  let sorted_array = quickSort(unsorted_array, 0, unsorted_array.length - 1);
  console.log(sorted_array);
}
);

