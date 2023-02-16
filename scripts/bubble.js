let randomize_array = document.getElementById("random_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container")
let mini = 1;
let maxi = 20;
let numOfBars = 10;
let unsorted_array = new Array(numOfBars);
let speedFactor = document.getElementById("speed_factor").value;
let heightFactor = document.getElementById("height_factor").value;
// let submitInputArray = document.getElementById("submit_input_array");
// let inputArray = document.getElementById("input_array").value;
// let resumeButton = document.getElementById("resume_button");
// let stopButton = document.getElementById("stop_button");
// let resetButton = document.getElementById("reset_button");
let stop=false; 

function randomN(mini, maxi) {
  return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

function createRandomArray() {
  for (let index = 0; index < numOfBars; index++) {
    unsorted_array[index] = randomN(mini, maxi);
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   // if(randomize_array.onclick){
    
//   createRandomArray();
//   renderBars(unsorted_array);
//   // }
//   // else
//   // renderBars(inputArray);
// });

function renderBars(array) {
  heightFactor = document.getElementById("height_factor").value;
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.background="white";
    bar.style.margin=2+"px";
    bar.innerText=array[i];
    bar.style.width=20+"px";
    bar.style.height = Math.min(array[i] * heightFactor,450) + "px";
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

// submitInputArray.addEventListener("click",function () {
//   bars_container.innerHTML="";
//   renderBars(submitInputArray);
//   console.log(inputArray)  
// });

// resumeButton.addEventListener("click", function(){
//    stop=true;
// });

// stopButton.addEventListener("click",function(){
//   stop=false;
// });

// resetButton.addEventListener("click",function(){
//   let temp_array=unsorted_array;
//   //  reload();
//   //  await(10)
//    renderBars(temp_array);
// });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  heightFactor = document.getElementById("height_factor").value;
  speedFactor = document.getElementById("speed_factor").value;
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if ((array[j] > array[j + 1])) {
        for (let k = 0; k < bars.length; k++) {
          if ((k !== j && k !== j + 1)) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = Math.min(array[j] * heightFactor, 450) + "px";
        bars[j].style.width = 30 + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j].innerText = array[j];
        bars[j].style.margin = 2 + "px";
        bars[j + 1].style.height = Math.min(array[j + 1] * heightFactor, 450) + "px";
        bars[j + 1].style.width = 30 + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        bars[j + 1].innerText = array[j + 1];
        bars[j].style.margin = 2 + "px";
        await sleep(10000 / speedFactor);
      }
    }
    await sleep(10000 / speedFactor);
  }
  return array;
}
sort_btn.addEventListener("click", function () {
  // let sorted_array;
  // if(randomize_array.onclick= function(){
  let sorted_array = bubbleSort(unsorted_array);
    // return sorted_array;
  // });
  // else
  // sorted_array=bubbleSort(inputArray);
  console.log(sorted_array);
}
);

