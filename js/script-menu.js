// Initial display when the page loads
// Function to start the quiz
function startQuiz() {
    var numAuthors = parseInt(document.getElementById('num-authors').value);
    var numCorrectOptions = parseInt(document.getElementById('num-correct').value);

    const selectElement = document.getElementById('chapter-select');
    const selectedChapters = [];

    for (let i = 0; i < selectElement.options.length; i++) {
      const option = selectElement.options[i];
      if (option.selected) {
        selectedChapters.push(option.value);
      }
    }
  
    window.location.href = `html/chapter-authors.html?chapters=${selectedChapters}&numAuthors=${numAuthors}&numCorrect=${numCorrectOptions}`;
}

// Get reference to the select element
const chapterSelect = document.getElementById('chapter-select');

// Loop through chaptersAndAuthors array and populate options
chaptersAndAuthors.forEach(chapter => {
  const option = document.createElement('option');
  option.value = chapter.chapter;
  option.textContent = `Chapter ${chapter.chapter}: ${chapter.title}`;
  chapterSelect.appendChild(option);
});

function toggleTheme() {
  var themeToggle = document.getElementById('theme-toggle');
  document.body.classList.toggle('dark-theme', themeToggle.checked);
}

function updateCorrectAnswersOptions() {
  const numAuthors = parseInt(document.getElementById('num-authors').value);
  const correctAnswersDropdown = document.getElementById('num-correct');
  correctAnswersDropdown.innerHTML = '';

  // Calculate the maximum and minimum number of correct answers based on the number of authors
  const maxCorrectAnswers = numAuthors - 1;
  const minCorrectAnswers = 1;

  // Add options to the correct answers dropdown
  for (let i = minCorrectAnswers; i <= maxCorrectAnswers; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    correctAnswersDropdown.appendChild(option);
  }
}

// Call the function initially to populate options based on default value
updateCorrectAnswersOptions();

// Listen for changes in the number of authors dropdown and update options accordingly
document.getElementById('num-authors').addEventListener('change', updateCorrectAnswersOptions);

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

applyTheme();