//utils.js
var correctAuthors;
var authorOptions = document.getElementById('author-options');
var optionsEnabled = true;
var numCorrectAnswers = getNumberOfCorrectAnswersFromURI();

// Reads click events on authors divs and mark as yellow (selected)
authorOptions.addEventListener('click', function(event) {
    const optionsSelected = authorOptions.getElementsByClassName('selected').length;

    if (event.target.classList.contains('author-option') && optionsEnabled) {
        if (optionsSelected < numCorrectAnswers) {
           event.target.classList.toggle('selected');
        } else {
            if (event.target.classList.contains('selected')) {
                event.target.classList.toggle('selected');
            }
        }
    }
});

function getNumberOfAuthorsFromURI() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('numAuthors');
}

function getNumberOfCorrectAnswersFromURI() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('numCorrect');
}

function getNumberOfChaptersFromURI() {
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get('chapters');

    if (paramValue) {
        return paramValue.split(',').map(value => parseInt(value.trim(),10));
    } else {
        return [];
    }
}

function getRandomChapter() {
    const selectedChapters = getNumberOfChaptersFromURI()

    if (selectedChapters.length === 0) {
        return chaptersAndAuthors[Math.floor(Math.random() * chaptersAndAuthors.length)];
    } else if (selectedChapters.includes(0)) {
        return chaptersAndAuthors[Math.floor(Math.random() * chaptersAndAuthors.length)];
    } else {
        const copyChaptersAndAuthors = chaptersAndAuthors.slice();
        const filteredChapters = copyChaptersAndAuthors.filter(chapter => selectedChapters.includes(chapter.chapter));
        return filteredChapters[Math.floor(Math.random() * filteredChapters.length)];
    }
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
  
function removeAllChildElements(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function generateAuthorOption() {
    var numberOfOptions = getNumberOfAuthorsFromURI()
    const authorOptions = document.getElementById('author-options');
    // Clean html elements before to refill with new options
    removeAllChildElements(authorOptions);

    for (i=0;i<numberOfOptions;i++){
        const option = document.createElement('div');
        option.classList.add('author-option')
        authorOptions.appendChild(option);
    }
}