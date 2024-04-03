var chaptersAndAuthors = [
  {
    chapter: 1,
    title: "Title 1",
    authors: [
      { name: "Author One", concept: "Concept Author One" },
      { name: "Author Two", concept: "Concept Author Two" },
      { name: "Author Three", concept: "Concept Author Three" },
      { name: "Author Four", concept: "Concept Author Four" },
      { name: "Author Five", concept: "Concept Author Five" },
      { name: "Author Six", concept: "Concept Author Six" },
      { name: "Author Seven", concept: "Concept Author Seven" }
    ]
  },
  {
    chapter: 2,
    title: "Title 2",
    authors: [
      { name: "Author Eight", concept: "Concept Author Eight" },
      { name: "Author Nine", concept: "Concept Author Nine" },
      { name: "Author Ten", concept: "Concept Author Ten" },
      { name: "Author Eleven", concept: "Concept Author Eleven" },
      { name: "Author Twelve", concept: "Concept Author Twelve" },
      { name: "Author Threeteen", concept: "Concept Author Threeteen" },
      { name: "Author Fourteen", concept: "Concept Author Fourteen" }
    ]
  },
  {
    chapter: 3,
    title: "Title 3",
    authors: [
      { name: "Author One", concept: "Concept Author One" },
      { name: "Author Two", concept: "Concept Author Two" },
      { name: "Author Three", concept: "Concept Author Three" },
      { name: "Author Four", concept: "Concept Author Four" },
      { name: "Author Nine", concept: "Concept Author Nine" },
      { name: "Author Ten", concept: "Concept Author Ten" },
      { name: "Author Eleven", concept: "Concept Author Eleven" },
      { name: "Author Twelve", concept: "Concept Author Twelve" }
    ]
  },
  {
    chapter: 4,
    title: "Title 4",
    authors: [
      { name: "Author Ten", concept: "Concept Author Ten" },
      { name: "Author Eleven", concept: "Concept Author Eleven" },
      { name: "Author Twelve", concept: "Concept Author Twelve" },
      { name: "Author Four", concept: "Concept Author Four" },
      { name: "Author Five", concept: "Concept Author Five" },
      { name: "Author Six", concept: "Concept Author Six" },
      { name: "Author Seven", concept: "Concept Author Seven" }
    ]
  }
];

var currentChapterIndex;
var correctAuthors;

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

  correctAuthors = chapterData.authors.map(author => author.name); // Store correct authors for validation

  // Extract unique author names
  var uniqueAuthors = getAllUniqueAuthors(chaptersAndAuthors);

  // Fill author options with unique authors and shuffle
  var shuffledAuthors = uniqueAuthors.slice(); // Copy array
  shuffledAuthors.sort(() => Math.random() - 0.5); // Shuffle options

  for (var i = 0; i < authorOptions.length; i++) {
    authorOptions[i].textContent = shuffledAuthors[i];
    authorOptions[i].classList.remove('selected', 'correct', 'incorrect');
  }
}

function toggleSelection(clickedElement) {
  clickedElement.classList.toggle('selected');
}

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
}

function toggleTheme() {
  var themeToggle = document.getElementById('theme-toggle');
  //var container = document.getElementById('container');
  document.body.classList.toggle('dark-theme', themeToggle.checked);
  //container.classList.toggle('dark-theme', themeToggle.checked);
}




// Initial display when the page loads
displayChapterAndAuthors();
