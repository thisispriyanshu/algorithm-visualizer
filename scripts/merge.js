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

async function merge(arr, l, m, r) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);
  for (var i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (var j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];

  var i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    }
    else {
      arr[k] = R[j];
      j++;
    }
    bars[k].style.height = Math.min(arr[k] * heightFactor, 450) + "px";
    bars[k].style.width = 30 + "px";
    bars[k].style.backgroundColor = "yellow";
    bars[k].innerText = arr[k];
    k++;
    await sleep(10000 / speedFactor);
  }
  while (i < n1) {
    arr[k] = L[i];
    i++;
    bars[k].style.height = Math.min(arr[k] * heightFactor, 450) + "px";
    bars[k].style.width = 30 + "px";
    bars[k].style.backgroundColor = "yellow";
    bars[k].innerText = arr[k];
    k++;
    await sleep(10000 / speedFactor);
  }
  while (j < n2) {
    arr[k] = R[j];
    j++;
    bars[k].style.height = Math.min(arr[k] * heightFactor, 450) + "px";
    bars[k].style.width = 30 + "px";
    bars[k].style.backgroundColor = "yellow";
    bars[k].innerText = arr[k];
    k++;
    await sleep(10000 / speedFactor);
  }
}

async function mergeSort(array, l, r) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  if (l >= r)
    return array;
  var m = l + parseInt((r - l) / 2);
  let tempLeft = mergeSort(array, l, m);
  let tempRight = mergeSort(array, m + 1, r);
  merge(array, l, m, r);
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
    await sleep(10000 / speedFactor);
  }
  return array;
}

sort_btn.addEventListener("click", function () {
  alert("Currently it is not working properly. Click OK to proceed");
  let sorted_array = mergeSort(unsorted_array, 0, unsorted_array.length - 1);
  console.log(sorted_array);
}
);

