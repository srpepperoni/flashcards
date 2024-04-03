var currentChapterIndex;
var correctAuthors;
var authorOptions = document.getElementById('author-options');
var optionsEnabled = true;

function getRandomChapter() {
  return chaptersAndAuthors[Math.floor(Math.random() * chaptersAndAuthors.length)];
}

function getAllUniqueAuthors(chaptersAndAuthors) {
  return chaptersAndAuthors.reduce((uniqueAuthors, chapter) => {
    chapter.authors.forEach(author => {
      if (!uniqueAuthors.includes(author.name)) {
        uniqueAuthors.push(author.name);
      }
    });
    return uniqueAuthors;
  }, []);
}

function displayChapterAndAuthors() {
  var chapterData = getRandomChapter();
  var chapterTitleElement = document.getElementById('chapter-title');
  var authorOptions = document.querySelectorAll('.author-option');

  chapterTitleElement.textContent = "Chapter " + chapterData.chapter + ": " + chapterData.title;
  currentChapterIndex = chaptersAndAuthors.indexOf(chapterData);

  correctAuthors = chapterData.authors.map(author => author.name);

  var uniqueAuthors = getAllUniqueAuthors(chaptersAndAuthors);

  var shuffledAuthors = uniqueAuthors.slice();
  shuffledAuthors.sort(() => Math.random() - 0.5);

  for (var i = 0; i < authorOptions.length; i++) {
    authorOptions[i].textContent = shuffledAuthors[i];
    authorOptions[i].classList.remove('selected', 'correct', 'incorrect');
  }

  disableNextButton();
}

authorOptions.addEventListener('click', function(event) {
  if (event.target.classList.contains('author-option') && optionsEnabled) {
    event.target.classList.toggle('selected');
  }
});

function validateOptions() {
  var options = document.querySelectorAll('.author-option');
  options.forEach(option => {
    if (correctAuthors.includes(option.textContent)) {
      option.classList.add('correct');
    } else {
      if (option.classList.contains('selected')) {
        option.classList.add('incorrect');
      }
    }
  });

  enableNextButton();
}

function toggleTheme() {
  var themeToggle = document.getElementById('theme-toggle');
  document.body.classList.toggle('dark-theme', themeToggle.checked);
}

function disableNextButton() {
  var nextButton = document.getElementById('next-chapter-button');
  nextButton.disabled = true;
  optionsEnabled = true;
}

function enableNextButton() {
  var nextButton = document.getElementById('next-chapter-button');
  nextButton.disabled = false;
  optionsEnabled = false;
}

displayChapterAndAuthors();
