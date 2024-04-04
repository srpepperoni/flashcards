// main.js
let questionCounter = 1;
let wrongAnswers = 0;

function validateOptions() {
  const optionsSelected = authorOptions.getElementsByClassName('selected').length;

  if (optionsSelected == numCorrectAnswers) {
    var options = document.querySelectorAll('.author-option');
    var mistakes = 0;

    options.forEach(option => {
      if (correctAuthors.includes(option.textContent)) {
        option.classList.add('correct');
      } else {
        if (option.classList.contains('selected')) {
          option.classList.add('incorrect');
          mistakes++;
        }
      }
    });

    if (mistakes > 0) {
      wrongAnswers++;
    }

    enableNextButton();
  }
}

function backToMenu() {
  questionCounter = 1;
  window.location.href = `../index.html`;
}

function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.contains('dark-theme');

  if (isDarkMode) {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

function applyTheme() {
  const theme = localStorage.getItem('theme');
  const body = document.body;

  if (theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}

document.getElementById('next-chapter-button').addEventListener('click', () => {
  questionCounter++;
  updateCounter();
});

function updateCounter() {
  const counterElement = document.getElementById('counter');
  counterElement.textContent = `Questions made: ${questionCounter}`;
}

function displayChapterAndAuthors() {

  if (questionCounter > 9) {
    alert("You made " + wrongAnswers + " wrong answers");
    backToMenu();
  }

  generateAuthorOption()

  var chapterData = getRandomChapter();
  var chapterTitleElement = document.getElementById('chapter-title');
  var authorOptions = document.querySelectorAll('.author-option');

  chapterTitleElement.textContent = "Chapter " + chapterData.chapter + ": " + chapterData.title;

  correctAuthors = chapterData.authors.map(author => author.name);
  correctAuthors.sort(() => Math.random() - 0.5);
  var correctAuthorsToShow = correctAuthors.slice(0, numCorrectAnswers);

  var uniqueAuthors = getAllUniqueAuthors(chaptersAndAuthors);

  var remainingAuthors = uniqueAuthors.filter(author => !correctAuthors.includes(author));
  var shuffledRemainingAuthors = remainingAuthors.slice();
  shuffledRemainingAuthors.sort(() => Math.random() - 0.5);
  shuffledRemainingAuthors = shuffledRemainingAuthors.slice(0, (authorOptions.length - numCorrectAnswers))

  var finalAuthors = correctAuthorsToShow.concat(shuffledRemainingAuthors)

  finalAuthors.sort(() => Math.random() - 0.5);

  for (var i = 0; i < authorOptions.length; i++) {
    authorOptions[i].textContent = finalAuthors[i];
    authorOptions[i].classList.remove('selected', 'correct', 'incorrect');
  }

  disableNextButton();
}

displayChapterAndAuthors();
applyTheme();