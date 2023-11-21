//Global Variables
let selectedImages = [];
const imagesToDisplay = 3;
let roundsDisplayed = 25;
generatedImages = [];

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
console.log(generatedImages);
function getRandomImages() {

  while (selectedImages.length < imagesToDisplay) {
    // console.log('inside a while loop')
    const randomIndex = Math.floor(Math.random() * generatedImages.length);
    const randomImage = generatedImages[randomIndex];

    if (!selectedImages.includes(randomImage)) {
      selectedImages.push(randomImage);
      randomImage.timesShown++; // Increment timesShown when selected for display
    }
  }
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
  getRandomImages();
  imageSection.innerHTML = '';
  // imageSection.addEventListener('click', handleImageClick);

  selectedImages.forEach(product => {
    const imgElement = document.createElement('img');
    let path = product.path;
    imgElement.src = path;
    imgElement.alt = product.name;
    imgElement.classList.add('product-image');
    // imgElement.addEventListener('click', handleImageClick);
    imageSection.appendChild(imgElement);
  });
}

function handleImageClick(event) {
  event.preventDefault();

  const targetName = event.target.alt;
  const foundObject = generatedImages.find(obj => obj.name === targetName);
  // console.log(selectedImages);
  console.log(generatedImages);
  console.log(foundObject);

  if (roundsDisplayed > 0) {
      foundObject.timesClicked++;
      roundsDisplayed--; // Decreasing the click limit by 1
      console.log(`Remaining clicks: ${roundsDisplayed}`);
  } else {

      disableClicks();
  }
  selectedImages = [];
  displayImages();
  console.log(foundObject.timesClicked);
}

function disableClicks() {
  console.log('Click limit reached. Further clicks disabled.');
  imageSection.removeEventListener('click', eventListenerFunction);
  viewResults();
}

function viewResults() {
  const resultData = generatedImages.map(product => {
    return {
      name: product.name,
      clicks: product.timesClicked,
      views: product.timesShown
    };
  });

  // Creating a list to display the results
  const ulElement = document.createElement('ul');
  resultData.forEach(product => {
    const liElement = document.createElement('li');
    liElement.textContent = `${product.name} had ${product.clicks} votes and was seen ${product.views} times.`;
    ulElement.appendChild(liElement);
  });

  // Appending the list to the results section
  resultsSection.appendChild(ulElement);
}

function disableClicks() {
  console.log('Click limit reached. Further clicks disabled.');
  imageSection.removeEventListener('click', eventListenerFunction);

  // Create the "View Results" button
  const viewResultsBtn = document.createElement('button');
  viewResultsBtn.textContent = 'View Results';
  viewResultsBtn.addEventListener('click', function() {
    viewResults();
    viewResultsBtn.style.display = 'none'; // Hide the button after displaying the results
  });
  
  // Append the button to the results section
  resultsSection.appendChild(viewResultsBtn);
  resultsSection.appendChild(document.createElement('br')); // Adding a line break for spacing
}

displayImages();
