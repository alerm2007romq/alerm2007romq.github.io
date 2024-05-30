//Initial References

//Questions Or Images
const questions = [
    {
      image: "https://i.postimg.cc/c1jQ3StC/Straightline.jpg",
      correct_option: "Straight line",
    },
    {
      image: "https://i.postimg.cc/Ss42Y69b/Triangle.jpg",
      correct_option: "Triangle",
    },
    {
      image: "https://i.postimg.cc/0Nk16rNH/1200px-Icono-Cuadrado.png",
      correct_option: "Square",
    },
    {
      image: "https://i.postimg.cc/8cr286ys/1200px-Icono-Rect-ngulo.png",
      correct_option: "Rectangle",
    },
    {
      image: "https://i.postimg.cc/gkyYrCDj/cross.png",
      correct_option: "Cross",
    },
    {
      image: "https://i.postimg.cc/cH8WW2Cs/star-shape-md.png",
      correct_option: "Star",
    },
    {
      image: "https://i.postimg.cc/0NXD6WvM/Circle-transparent.png",
      correct_option: "Circle",
    },
    {
      image: "https://i.postimg.cc/QCQFqS2q/Heart.jpg",
      correct_option: "Heart",
    },
    {
      image: "https://i.postimg.cc/QNQCw4zQ/arrow.jpg",
      correct_option: "Arrow",
    },
    {
      image: "https://i.postimg.cc/52Tf6LG9/cilinder.png",
      correct_option: "Cylinder",
    },
    {
      image: "https://i.postimg.cc/GtKc2N06/pyramid.png",
      correct_option: "Pyramid",
    },
    {
      image: "https://i.postimg.cc/3rvrQ40g/1200px-05-L-Pent-gono.png",
      correct_option: "Pentagon",
    },
    {
      image: "https://i.postimg.cc/52HFhNJT/Curvedline.jpg",
      correct_option: "Curved line",
    },
    {
      image: "https://i.postimg.cc/Vk6NSYkg/Cube.png",
      correct_option: "Cube",
    },
    {
      image: "https://i.postimg.cc/PrKxrLTN/Sphere-wireframe-10deg-6r.png",
      correct_option: "Shpere",
    },
    {
      image: "https://i.postimg.cc/XqSbYLB9/240px-06-L-Hex-gono.png",
      correct_option: "Hexagon",
    },
  ];
  
  //All options
  const optionsArray = [
    "Straight line",
    "Curved line",
    "Triangle",
    "Equilateral triangle",
    "Isosceles triangle",
    "Scalene triangle",
    "Right triangle",
    "Obtuse triangle",
    "Acute triangle",
    "Square",
    "Rectangle",
    "Rhombus",
    "Rhomboid",
    "Trapezium",
    "Trapezoid",
    "Parallelogram",
    "Deltoid",
    "Cross",
    "Star",
    "Pentagon",
    "Hexagon",
    "Heptagon",
    "Octagon",
    "Nonagon",
    "Decagon",
    "Circle",
    "Semi-circle",
    "Oval",
    "Ellipse",
    "Heart",
    "Cresxent",
    "Pie",
    "Arrow",
    "Ring",
    "Sphere",
    "Cube",
    "Cuboid",
    "Pyramid",
    "Cone",
    "Cylinder",
  ];
  const container = document.querySelector(".container");
  const gameContainer = document.querySelector(".game-container");
  const startButton = document.getElementById("start");
  const scoreContainer = document.querySelector(".score-container");
  const userScore = document.getElementById("user-score");
  let timer = document.getElementsByClassName("timer")[0];
  let nextBtn;
  let score, currentQuestion, finalQuestions;
  let countdown,
    count = 11;
  
  //Random value from array
  const randomValueGenerator = (array) =>
    array[Math.floor(Math.random() * array.length)];
  
  //Random shuffle array
  const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());
  
  //Start game
  const startGame = () => {
    //Select random 5 questions
    scoreContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    finalQuestions = populateQuestions();
    score = 0;
    currentQuestion = 0;
    //Generate card for first question
    cardGenerator(finalQuestions[currentQuestion]);
  };
  
  //Timer
  const timerDisplay = () => {
    countdown = setInterval(() => {
      count -= 1;
      timer.innerHTML = `<span>Time Left: </span>${count}s`;
      if (count == 0) {
        clearInterval(countdown);
        nextQuestion();
      }
    }, 1000);
  };
  
  //Create options
  const populateOptions = (correct_option) => {
    let arr = [];
    arr.push(correct_option);
    let optionsCount = 1;
    while (optionsCount < 4) {
      let randomvalue = randomValueGenerator(optionsArray);
      if (!arr.includes(randomvalue)) {
        arr.push(randomvalue);
        optionsCount += 1;
      }
    }
    return arr;
  };
  
  //Choose random questions
  const populateQuestions = () => {
    let questionsCount = 0;
    let chosenObjects = [];
    let questionsBatch = [];
    //5 Questions
    while (questionsCount < 5) {
      let randomvalue = randomValueGenerator(questions);
      let index = questions.indexOf(randomvalue);
      if (!chosenObjects.includes(index)) {
        questionsBatch.push(randomvalue);
        chosenObjects.push(index);
        questionsCount += 1;
      }
    }
    return questionsBatch;
  };
  
  //check selected answer
  const checker = (e) => {
    let userSolution = e.target.innerText;
    let options = document.querySelectorAll(".option");
    if (userSolution === finalQuestions[currentQuestion].correct_option) {
      e.target.classList.add("correct");
      score++;
    } else {
      e.target.classList.add("incorrect");
      options.forEach((element) => {
        if (element.innerText == finalQuestions[currentQuestion].correct_option) {
          element.classList.add("correct");
        }
      });
    }
  
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
      element.disabled = true;
    });
  };
  
  //Next question
  const nextQuestion = (e) => {
    //increment currentQuestion
    currentQuestion += 1;
    if (currentQuestion == finalQuestions.length) {
      gameContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      startButton.innerText = `Restart`;
      userScore.innerHTML =
        "Your score is " + score + " out of " + currentQuestion;
      clearInterval(countdown);
    } else {
      cardGenerator(finalQuestions[currentQuestion]);
    }
  };
  
  //Card UI
  const cardGenerator = (cardObject) => {
    const { image, correct_option } = cardObject;
    let options = randomShuffle(populateOptions(correct_option));
    container.innerHTML = `<div class="quiz">
    <p class="num">
    ${currentQuestion + 1}/5
    </p>
    <div class="questions">
      <img class="pokemon-image" src="${image}"/>
    </div>
      <div class="options">
      <button class="option" onclick="checker(event)">${options[0]}
      </button>
      <button class="option" onclick="checker(event)">${options[1]}
      </button>
      <button class="option" onclick="checker(event)">${options[2]}
      </button>
      <button class="option" onclick="checker(event)">${options[3]}
      </button>
      </div>
  
      <div class="nxt-btn-div">
          <button class="next-btn" onclick="nextQuestion(event)">Next</button>
      </div>
  
    </div>`;
    //For timer
    count = 11;
    clearInterval(countdown);
    //Display timer
    timerDisplay();
  };
  
  startButton.addEventListener("click", startGame);