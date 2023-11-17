//Global Variables
let selectedImages = [];
const imagesToDisplay = 3;
const roundsDisplayed = 25;

class Image {
  static generatedImages = [];

  constructor(name, path) {
    // Arguments
    this.name = name;
    this.path = path;
    this.timesViewed = 0;
    this.timesClicked = 0;
    Image.generatedImages.push(this);
    

    // Default variable tied to instances
    this.timesShown = 0;
  }
}

const bag = new Image('bag', '/img/bag.jpg');
const banana = new Image('banana', '/img/banana.jpg');
const bathroom = new Image('bathroom', '/img/bathroom.jpg');
const boots = new Image('boots', '/img/boots.jpg');
const breakfast = new Image('breakfast', '/img/breakfast.jpg');
const bubblegum = new Image('bubblegum', '/img/bubblegum.jpg');
const chair = new Image('chair', '/img/chair.jpg');
const cthulhu = new Image('cthulhu', '/img/cthulhu.jpg');
const dogDuck = new Image('dog-duck', '/img/dog-duck.jpg');
const dragon = new Image('dragon', '/img/dragon.jpg');
const pen = new Image('pen', '/img/pen.jpg');
const petSweep = new Image('pet-sweep', '/img/pet-sweep.jpg');
const scissors = new Image('scissors', '/img/scissors.jpg');
const shark = new Image('shark', '/img/shark.jpg');
const sweep = new Image('sweep', '/img/sweep.png');
const tauntaun = new Image('tauntaun', '/img/tauntaun.jpg');
const unicorn = new Image('unicorn', '/img/unicorn.jpg');
const waterCan = new Image('water-can', '/img/water-can.jpg');
const wineGlass = new Image('wine-glass', '/img/wine-glass.jpg');

function getRandomImages() {

  while (selectedImages.length < imagesToDisplay) {
    const randomIndex = Math.floor(Math.random() * Image.generatedImages.length);
    const randomImage = Image.generatedImages[randomIndex];

    if (!selectedImages.includes(randomImage)) {
      selectedImages.push(randomImage);
      randomImage.timesShown++; // Increment timesShown when selected for display
    }
  }
}

function displayImages() {
  getRandomImages();
  const imageSection = document.getElementById('images');
  imageSection.innerHTML = '';

  selectedImages.forEach(product => {
    const imgElement = document.createElement('img');
    let path = product.path;
    imgElement.src = path;
    imgElement.alt = product.name;
    imgElement.classList.add('product-image');
    imgElement.addEventListener('click', handleImageClick);
    imageSection.appendChild(imgElement);
  });
}

function handleImageClick(event) {
  event.preventDefault();
  const targetName = event.target.alt;
  const foundObject = selectedImages.find(obj => obj.name === targetName);
  
  if (roundsDisplayed > 0) {
      foundObject.timesClicked++;
      roundsDisplayed--; // Decreasing the click limit by 1
      console.log(`Remaining clicks: ${roundsDisplayed}`);
      
      if (roundsDisplayed === 0) {
          // Disable further clicks
          console.log('Click limit reached. Further clicks disabled.');
          disableClicks();
      }
  } else {
      console.log('Click limit reached. Further clicks disabled.');
      disableClicks();
  }
  
  selectedImages = [];
  displayImages();
  console.log(foundObject.timesClicked);
}
function disableClicks() {
  const images = document.querySelectorAll('.product-image'); //The problem lies here. Replace with image class name.
  images.forEach(image => {
      image.removeEventListener('click', handleImageClick);
  });
}

displayImages();