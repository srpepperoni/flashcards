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