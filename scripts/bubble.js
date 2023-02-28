//Bubble Sort
let randomize_array = document.getElementById("random_btn"); 
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container")
let mini = 1;
let maxi = 20;
let numOfBars = 10;
let unsorted_array = new Array(numOfBars);
let speedFactor = document.getElementById("speed_factor").value;
let heightFactor = document.getElementById("height_factor").value;

//Function for creating random value
function randomN(mini, maxi) {
  return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

//Function for creating random array
function createRandomArray() {
  for (let index = 0; index < numOfBars; index++) {
    unsorted_array[index] = randomN(mini, maxi);
  }
}

//Function to render bars at the time of clicking random_array button
// This function creates white bars before sorting 
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

//Event listener to occur when random array button is clicked
randomize_array.addEventListener("click", function () {
  createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
  console.log(unsorted_array)
  console.log(speedFactor + " " + heightFactor);
});

//It is used to slow down the process and help in clear visualization of sorting
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Main function of bubble sort
async function bubbleSort(array) {
  heightFactor = document.getElementById("height_factor").value; //value of height factor
  speedFactor = document.getElementById("speed_factor").value; //value of speed factor
  let bars = document.getElementsByClassName("bar"); // creating div element - bar
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if ((array[j] > array[j + 1])) {
        for (let k = 0; k < bars.length; k++) {
          if ((k !== j && k !== j + 1)) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        //swapping array[j] to array[j+1]
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        //styling bars of array[j] and array[j+1]
        bars[j].style.height = Math.min(array[j] * heightFactor, 450) + "px";
        bars[j].style.width = 30 + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j].innerText = array[j];
        bars[j].style.margin = 2 + "px";
        bars[j + 1].style.height = Math.min(array[j + 1] * heightFactor, 450) + "px";
        bars[j + 1].style.width = 30 + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        bars[j + 1].innerText = array[j + 1];
        bars[j + 1].style.margin = 2 + "px";
        await sleep(10000 / speedFactor);
      }
    }
    await sleep(10000 / speedFactor);
  }
  return array;
}

//Event listener occur when sort button is clicked
sort_btn.addEventListener("click", function () {
  let sorted_array = bubbleSort(unsorted_array);
  console.log(sorted_array);
}
);

