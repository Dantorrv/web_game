const gameArea = document.getElementById("gameArea");
const bucket = document.getElementById("bucket");
const object = document.getElementById("object");
const scoreDisplay = document.getElementById("score");

let score = 0;
let objectSpeed = 3;
let objectInterval;
let objectX = Math.random() * (gameArea.offsetWidth - 20); // Random starting X position for the object

// Set up the bucket position
bucket.style.left = (gameArea.offsetWidth / 2 - bucket.offsetWidth / 2) + "px";

// Move the bucket left and right with arrow keys
document.addEventListener("keydown", (event) => {
  const bucketLeft = parseInt(bucket.style.left);

  if (event.key === "ArrowLeft" && bucketLeft > 0) {
    bucket.style.left = bucketLeft - 10 + "px";
  }
  if (event.key === "ArrowRight" && bucketLeft < gameArea.offsetWidth - bucket.offsetWidth) {
    bucket.style.left = bucketLeft + 10 + "px";
  }
});

// Function to start falling object
function startFallingObject() {
  object.style.left = objectX + "px";
  object.style.top = "-20px";
  
  // Animate the object falling
  objectInterval = setInterval(() => {
    const objectTop = parseInt(object.style.top);
    object.style.top = objectTop + objectSpeed + "px";

    // Check if object hits the bottom without being caught
    if (objectTop > gameArea.offsetHeight - 20) {
      alert("Game Over! Final Score: " + score);
      resetGame();
    }

    // Check for collision with the bucket
    const bucketLeft = parseInt(bucket.style.left);
    const objectLeft = parseInt(object.style.left);
    const objectRight = objectLeft + object.offsetWidth;

    if (
      objectTop >= gameArea.offsetHeight - bucket.offsetHeight - object.offsetHeight &&
      objectLeft < bucketLeft + bucket.offsetWidth &&
      objectRight > bucketLeft
    ) {
      score++;
      scoreDisplay.innerText = "Score: " + score;
      objectX = Math.random() * (gameArea.offsetWidth - 20); // Reset object position
      clearInterval(objectInterval);
      startFallingObject(); // Start a new falling object
    }
  }, 20);
}

// Function to reset game
function resetGame() {
  clearInterval(objectInterval);
  score = 0;
  scoreDisplay.innerText = "Score: 0";
  objectSpeed = 3;
  startFallingObject();
}

// Start the game
startFallingObject();