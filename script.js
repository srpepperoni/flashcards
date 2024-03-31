var booksAndAuthors = [
    { book: "Book 1", author: "Author 1" },
    { book: "Book 2", author: "Author 2" },
    { book: "Book 3", author: "Author 3" },
    { book: "Book 4", author: "Author 4" },
    { book: "Book 5", author: "Author 5" },
    { book: "Book 6", author: "Author 6" },
    { book: "Book 7", author: "Author 7" },
    { book: "Book 8", author: "Author 8" },
    { book: "Book 9", author: "Author 9" },
    { book: "Book 10", author: "Author 10" },
    { book: "Book 11", author: "Author 11" },
    { book: "Book 12", author: "Author 12" },
    { book: "Book 13", author: "Author 13" }
    // Add more books and authors as needed
  ];
  
  var currentBookIndex;
  
  function getRandomBook() {
    return booksAndAuthors[Math.floor(Math.random() * booksAndAuthors.length)];
  }

  function displayBookAndAuthors() {
    var bookAndAuthor = getRandomBook();
    var bookTitleElement = document.getElementById('book-title');
    var authorOptions = document.querySelectorAll('.author-option');
  
    bookTitleElement.textContent = bookAndAuthor.book;
    currentBookIndex = booksAndAuthors.indexOf(bookAndAuthor);
  
    var shuffledAuthors = booksAndAuthors.slice(); // Copy array
    shuffledAuthors.splice(shuffledAuthors.indexOf(bookAndAuthor), 1)
    shuffledAuthors.sort(() => Math.random() - 0.5); // Shuffle options
  
    var authorOptionsData = [];
    authorOptionsData.push({ author: bookAndAuthor.author, isCorrect: true });
  
    for (var i = 0; i < authorOptions.length - 1; i++) {
        authorOptionsData.push({ author: shuffledAuthors[i].author, isCorrect: false });
    }

    authorOptionsData.sort(() => Math.random() - 0.5); // Shuffle options
  
    // Display author options
    for (var j = 0; j < authorOptions.length; j++) {
      authorOptions[j].textContent = authorOptionsData[j].author;
      authorOptions[j].classList.remove('correct');
    }
  
    return authorOptionsData;
  }

  var correctAnswerSelected = false;

function checkAnswer(clickedElement) {
  if (!correctAnswerSelected) {
    var selectedAuthor = clickedElement.textContent;
    var correctAuthor = booksAndAuthors[currentBookIndex].author;

    if (selectedAuthor === correctAuthor) {
      clickedElement.classList.add('correct');
      correctAnswerSelected = true;

      // Disable click event on other options
      var authorOptions = document.querySelectorAll('.author-option');
      authorOptions.forEach(function(option) {
        if (!option.classList.contains('correct')) {
          option.onclick = null;
        }
      });

      // Disable hover effect on other options
      var styles = document.createElement('style');
      styles.innerHTML = '.author-option:not(.correct):hover { background-color: #e9e9e9; cursor: default; }';
      document.head.appendChild(styles);

      // Enable next button
      document.getElementById('next-button').disabled = false;
    } else {
      alert('Incorrect!');
    }
  }
}

function nextWord() {
  correctAnswerSelected = false; // Reset flag
  // Remove existing styles
  var existingStyles = document.querySelector('style');
  if (existingStyles) {
    existingStyles.remove();
  }
  // Enable click events on author options
  var authorOptions = document.querySelectorAll('.author-option');
  authorOptions.forEach(function(option) {
    option.onclick = function() {
      checkAnswer(this);
    };
  });
  // Reset author options
  displayBookAndAuthors();
  // Disable next button again
  document.getElementById('next-button').disabled = true;
}
  
  
  // Initial display when the page loads
  displayBookAndAuthors();
  