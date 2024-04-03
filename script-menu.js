// Initial display when the page loads
// Function to start the quiz
function startQuiz() {
    var selectedChapter = document.getElementById('chapter-select').value;
    var numAuthors = parseInt(document.getElementById('num-authors').value);
    var numCorrectOptions = parseInt(document.getElementById('num-correct').value);
  
    window.location.href = `chapter-authors.html?chapter=${selectedChapter}&numAuthors=${numAuthors}&numCorrect=${numCorrectOptions}`;
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