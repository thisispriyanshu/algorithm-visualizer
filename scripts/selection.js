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

async function selectionSort(array) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  var i, j, min_idx;
  for (i = 0; i < array.length - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < array.length; j++) {
      if ((array[j] < array[min_idx])) {
        min_idx = j;
        for (let k = 0; k < bars.length; k++) {
          if ((k !== i && k !== min_idx)) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
      }
    }
    let temp = array[i];
    array[i] = array[min_idx];
    array[min_idx] = temp;
    bars[i].style.height = Math.min(array[i] * heightFactor, 450) + "px";
    bars[i].style.width = 30 + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[i].innerText = array[i];
    bars[i].style.margin = 2 + "px";
    bars[min_idx].style.height = Math.min(array[min_idx] * heightFactor, 450) + "px";
    bars[min_idx].style.width = 30 + "px";
    bars[min_idx].style.backgroundColor = "lightgreen";
    bars[min_idx].innerText = array[min_idx];
    bars[min_idx].style.margin = 2 + "px";
    await sleep(100000 / speedFactor);
  }
  return array;
}
sort_btn.addEventListener("click", function () {
  let sorted_array = selectionSort(unsorted_array);
  console.log(sorted_array);
}
);

