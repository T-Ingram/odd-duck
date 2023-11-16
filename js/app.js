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

const bag = new Image('bag', 'img/bag.jpg');
const banana = new Image('banana', 'img/banana.jpg');
const bathroom = new Image('bathroom', 'img/bathroom.jpg');
const boots = new Image('boots', 'img/boots.jpg');
const breakfast = new Image('breakfast', 'img/breakfast.jpg');
const bubblegum = new Image('bubblegum', 'img/bubblegum.jpg');
const chair = new Image('chair', 'img/chair.jpg');
const cthulhu = new Image('cthulhu', 'img/cthulhu.jpg');
const dogDuck = new Image('dog-duck', 'img/dog-duck.jpg');
const dragon = new Image('dragon', 'img/dragon.jpg');
const pen = new Image('pen', 'img/pen.jpg');
const petSweep = new Image('pet-sweep', 'img/pet-sweep.jpg');
const scissors = new Image('scissors', 'img/scissors.jpg');
const shark = new Image('shark', 'img/shark.jpg');
const sweep = new Image('sweep', 'img/sweep.png');
const tauntaun = new Image('tauntaun', 'img/tauntaun.jpg');
const unicorn = new Image('unicorn', 'img/unicorn.jpg');
const waterCan = new Image('water-can', 'img/water-can.jpg');
const wineGlass = new Image('wine-glass', 'img/wine-glass.jpg');

function getRandomImages() {
  const selectedImages = [];

  while (selectedImages.length < 3) {
    const randomIndex = Math.floor(Math.random() * Image.generatedImages.length);
    const randomImage = Image.generatedImages[randomIndex];

    if (!selectedImages.includes(randomImage)) {
      selectedImages.push(randomImage);
      randomImage.timesShown++; // Increment timesShown when selected for display
    }
  }

  return selectedImages.map(image => image.path);
}

function displayImages(imagePaths) {
  const imageSection = document.getElementById('images');
  imageSection.innerHTML = '';

  imagePaths.forEach(path => {
    const imgElement = document.createElement('img');
    imgElement.src = path;
    imgElement.alt = 'Product Image';
    imgElement.classList.add('product-image');
    imgElement.addEventListener('click', handleImageClick);
    imageSection.appendChild(imgElement);

    const displayedImage = Image.generatedImages.find(image => image.path === path);
    if (displayedImage) {
      displayedImage.timesShown++;
      // Update timesClicked for newly displayed images based on previous clicks
      imgElement.setAttribute('data-clicked', displayedImage.timesClicked);
      console.log(`${displayedImage.name} - Times Clicked: ${displayedImage.timesClicked}`);
    }
  });
}

function handleImageClick(event) {
  event.preventDefault();

  const clickedImagePath = event.target.src;
  console.log('Clicked Image Path:', clickedImagePath); // Add this line for debugging

  // Check if the path exists in generatedImages
  console.log('Generated Images:', Image.generatedImages.map(image => image.path)); // Add this line for debugging
  Image.generatedImages.forEach(image => {
    console.log(`Clicked Path: ${clickedImagePath} | Image Path: ${image.path}`);
  });

  const clickedImage = Image.generatedImages.find(image => image.path === clickedImagePath);
  console.log('Clicked Image:', clickedImage); // Add this line for debugging

  if (clickedImage) {
    clickedImage.timesClicked++;
    // Log the timesClicked property of the clicked image
    console.log(`${clickedImage.name} - Times Clicked: ${clickedImage.timesClicked}`);
  }

  // For now, just log the clicked image object itself to verify it's being found correctly
  console.log('Clicked Image:', clickedImage);

  const randomImagePaths = getRandomImages();
  displayImages(randomImagePaths);
}

try {
  const imageSection = document.getElementById('images');
  imageSection.addEventListener('click', handleImageClick);
} catch (error) {
  console.error("Error adding event listener:", error);
}

const randomImagePaths = getRandomImages();
displayImages(randomImagePaths);