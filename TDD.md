Describe: wordCounter()

Test: "It should return 1 if a passage has just one word."
Code:
const text = "hello";
wordCounter(text);
Expected Output: 1

Test: "It should return 2 if a passage has two words."
Code:
const text = "hello there";
wordCounter(text);
Expected Output: 2


function wordCounter(text) {
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(word) {
    wordCount++;
  });
  return wordCount;
}

 <!-- describe('word counter', () => { 
  test('should return 1 if a passage has just one word', () => { 
    const text = "hello"; 
    expect(wordCounter(text)).toEqual(1); 
  }); 
}); -->

Test: "It should return 0 for an empty string."
Code: wordCounter("");
Expected Output: 0

function wordCounter(text) {
  if (text.length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(word) {
    wordCount++;
  });
  return wordCount;
}


Test: "It should return 0 for a string that is only spaces."
Code: wordCounter("            ");
Expected Output: 0

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(word) {
    wordCount++;
  });
  return wordCount;
}


Test: "It should not count numbers as words."
Code: wordCounter("hi there 77 19");
Expected Output: 2


function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}





Describe: numberOfOccurrencesInText()
Test: "It should return 0 occurrences of a word for an empty string."
Code:
const text = "";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 0


// wordCounter() function omitted for brevity.

function numberOfOccurrencesInText(word, text) {
  return 0;
}

Test: "It should return 1 occurrence of a word when the word and the text are the same."
Code:
const text = "red";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 1

function numberOfOccurrencesInText(word, text) {
  if (word === text) {
    return 1;
  }
  return 0;
}

Test: "It should return 0 occurrences of a word when the word and the text are different."
Code:
const text = "red";
const word = "blue";
numberOfOccurrencesInText(word, text);
Expected Output: 0

Test: "It should return the number of occurrences of a word."
Code:
const text = "red blue red red red green";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 4

function numberOfOccurrencesInText(word, text) {
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (word === element) {
      wordCount++
    }
  });
  return wordCount;
}

Describe: numberOfOccurrencesInText()

Test: "It should return 0 occurrences of a word for an empty string."
Code:
const text = "";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 0

function numberOfOccurrencesInText(word, text) {
  if (text.trim().length === 0) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (word === element) {
      wordCount++;
    }
  });
  return wordCount;
}

Test: "It should return a word match regardless of case."
Code:
const text = "red RED Red green Green GREEN";
const word = "Red";
numberOfOccurrencesInText(word, text);
Expected Output: 3

function numberOfOccurrencesInText(word, text) {
  if (text.trim().length === 0) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (word.toLowerCase() === element.toLowerCase()) {
      wordCount++;
    }
  });
  return wordCount;
}

Test: "It should return a word match regardless of punctuation."
Code:
const text = "Red! Red. I like red, green, and yellow.";
const word = "Red";
numberOfOccurrencesInText(word, text);
Expected Output: 3

function numberOfOccurrencesInText(word, text) {
  if (text.trim().length === 0) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

Test: "If an empty string is passed in as a word, it should return 0."
Code:
const word = "";
const text = "red RED Red!";
wordCounter(word, text);
Expected Output: 0

function numberOfOccurrencesInText(word, text) {
  if ((text.trim().length === 0) || (word.trim().length === 0)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

Describe: boldPassage()

Test: "It should return a non-matching word in a p tag."
Code:
const word = "hello";
const text = "yo";
boldPassage(word, text);
Expected Output: "<p>yo</p>"

function boldPassage(word, text) {
  return "<p>" + text + "</p>";
}

Test: "It should return a matching word in a b tag."
Code:
const word = "hello";
const text = "hello";
boldPassage(word, text);
Expected Output: "<p><b>hello</b></p>"


function boldPassage(word, text) {
  if (word === text) {
    return "<p><b>" + text + "</b></p>";
  } else
  return "<p>" + text + "</p>";
}

Test: "It should wrap words that match in `b` tags but not words that don't."
Code:
const word = "hello";
const text = "hello there";
boldPassage(word, text);
Expected Output: "<p><b>hello</b> there</p>"

function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    htmlString = htmlString.concat(" ");
  });
  return htmlString + "</p>";
}

function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}



<!-- Up until this point, we've mainly done one - off projects a quick website to demonstrate a concept or a little practice in the console or with JSFiddle. Now, though, we'll be transitioning to more - sustained projects that we'll work on over the course of - a - section or even, in some cases over multiple sections -->