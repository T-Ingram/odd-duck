//Global Variables
let selectedImages = [];
const imagesToDisplay = 3;
let roundsDisplayed = 25;
generatedImages = [];

//Constructor 
class Image {

  constructor(name, path) {
    // Arguments
    this.name = name;
    this.path = path;   
    this.timesClicked = 0;
    this.timesShown = 0;
    generatedImages.push(this);
  }
}

const bag = new Image('Bag', './img/bag.jpg');
const banana = new Image('Banana', './img/banana.jpg');
const bathroom = new Image('Bathroom', './img/bathroom.jpg');
const boots = new Image('Boots', './img/boots.jpg');
const breakfast = new Image('Breakfast', './img/breakfast.jpg');
const bubblegum = new Image('Bubblegum', './img/bubblegum.jpg');
const chair = new Image('Chair', './img/chair.jpg');
const cthulhu = new Image('Cthulhu', './img/cthulhu.jpg');
const dogDuck = new Image('Dog-duck', './img/dog-duck.jpg');
const dragon = new Image('Dragon', './img/dragon.jpg');
const pen = new Image('Pen', './img/pen.jpg');
const petSweep = new Image('Pet-sweep', './img/pet-sweep.jpg');
const scissors = new Image('Scissors', './img/scissors.jpg');
const shark = new Image('Shark', './img/shark.jpg');
const sweep = new Image('Sweep', './img/sweep.png');
const tauntaun = new Image('Tauntaun', './img/tauntaun.jpg');
const unicorn = new Image('Unicorn', './img/unicorn.jpg');
const waterCan = new Image('Water-can', './img/water-can.jpg');
const wineGlass = new Image('Wine-glass', './img/wine-glass.jpg');

let previousImages = [];

function getRandomImages() {
  let newImages = [];

  while (newImages.length < imagesToDisplay) {
    const randomIndex = Math.floor(Math.random() * generatedImages.length);
    const randomImage = generatedImages[randomIndex];

    if (!previousImages.includes(randomImage) && !newImages.includes(randomImage)) {
      newImages.push(randomImage);
      randomImage.timesShown++; 
    }
  }

  previousImages = newImages.slice();
  return newImages;
}

const resultsSection = document.getElementById('results');
const imageSection = document.getElementById('images');

imageSection.addEventListener('click', eventListenerFunction)

function eventListenerFunction(event) {
  if (event.target.classList.contains('product-image')) {
    handleImageClick(event);
  }
}

function displayImages() {
  const uniqueImages = getRandomImages();
  imageSection.innerHTML = '';

  uniqueImages.forEach(product => {
    const imgElement = document.createElement('img');
    let path = product.path;
    imgElement.src = path;
    imgElement.alt = product.name;
    imgElement.classList.add('product-image');
    imageSection.appendChild(imgElement);
  });
}

function handleImageClick(event) {
  event.preventDefault();

  const targetName = event.target.alt;
  const foundObject = generatedImages.find(obj => obj.name === targetName);
  // console.log(selectedImages);
  console.log(generatedImages);
  // console.log(foundObject);

  if (roundsDisplayed > 0) {
      foundObject.timesClicked++;
      roundsDisplayed--; // Decreasing the click limit by 1
      console.log(`Remaining clicks: ${roundsDisplayed}`);
  } else {

      disableClicks();
  }
  selectedImages = [];
  displayImages();
}

// Function to save data to local storage
function saveToLocalStorage() {
  JSON.stringify(selectedImages)
  localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
  console.log('code has gotten this far!');
}

function disableClicks() {
  console.log('Click limit reached. Further clicks disabled.');
  imageSection.removeEventListener('click', eventListenerFunction);
  viewResults();
}

// Function to retrieve data from local storage
function retrieveFromLocalStorage() {
  const storedData = localStorage.getItem('selectedImages');
  if (storedData) {
    const parsedData =JSON.parse(storedData);
    generatedImages = parsedData.map(item => new Image(item.name, item.path));
  }
}

// Call retrieveFromLocalStorage when the page loads
window.addEventListener('DOMContentLoaded', () => {
  retrieveFromLocalStorage(); // Retrieve data from local storage when the page loads
  displayImages(); // Display images using the retrieved data
});

function viewResults() {
  const resultData = generatedImages.map(product => {
    return {
      name: product.name,
      clicks: product.timesClicked,
      views: product.timesShown
    };
  });

  const productNames = resultData.map(product => product.name);
  const clicksData = resultData.map(product => product.clicks);
  const viewsData = resultData.map(product => product.views);

  const ctx = document.getElementById('canvas').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: 'Clicks',
          data: clicksData,
          backgroundColor: 'rgba(255, 99, 132)',
          borderColor: 'transparent',
          borderWidth: 4
        },
        {
          label: 'Views',
          data: viewsData,
          backgroundColor: 'rgba(54, 162, 235)',
          borderColor: 'transparent',
          borderWidth: 4
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function disableClicks() {
  console.log('Click limit reached. Further clicks disabled.');
  imageSection.removeEventListener('click', eventListenerFunction);

  const viewResultsBtn = document.createElement('button');
  viewResultsBtn.textContent = 'View Results';
  viewResultsBtn.addEventListener('click', function() {
    viewResults();
    viewResultsBtn.style.display = 'none'; 
  });
  
  resultsSection.appendChild(viewResultsBtn);
  resultsSection.appendChild(document.createElement('br'));
}

displayImages();
