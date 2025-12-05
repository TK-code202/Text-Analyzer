// Utility Logic

function noInputtedWord() {
  for (let i=0; i < arguments.length; i++) {
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
}

  // function spaceEliminator (text) {
  //   const wordTray = text.split(" ");
  //   wordTray.forEach(function(element, index) {
  //     if(element === "") {
  //       wordTray.splice(index, 1);
  //     }
  //   });
  //   return wordTray.join(" ");
  // }

  function spaceEliminator (text) {
    const wordTray = text.split(" ");
    const newTray = wordTray.filter(function(element) {
      return element !== ""
  });
    return newTray.join(" ");
  }

  // The aim of the spaceEliminator function is to remove the spaces created in the text as a result of the removePunctuation function. It also removes spaces in cases where the text includes multiple space characters.

  // Update: a simpler approach is to use the regular expression: '/\s+/' as parameter in the split method. It takes care of all space characters even in the event of multiple occurences.

// Business Logic

 //Total Number of words

 function wordCounter(text) {
  if (noInputtedWord(text)) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = spaceEliminator(text).split(" ");
  // const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}
  
  // Selected Word Count
  function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
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

 function findWordWithinWord(word, largerWord) {
  const convertedWord = word.toLowerCase();
  const convertedLargerWord = largerWord.toLowerCase();

  let wordIndex = convertedLargerWord.indexOf(convertedWord);
  let wordPosition = 0;
  // .indexOf returns the index of the first letter of a word contained in a larger word/string.
  // if indexOf returns -1, it means the character is not contained in the string.
  if (wordIndex !== -1) {
    wordPosition = wordIndex ;
  } else {
    return -1;
  }

  wordArray = convertedLargerWord.split(" ");

  // return "<b>" + largerWord.slice(wordPosition, word.length)+ "</b>" + largerWord.slice(wordPosition + word.length) 
  // return largerWord.slice(0, wordPosition) + "<b>" + largerWord.slice(wordPosition) + "</b>" 
  return convertedLargerWord.slice(0, wordPosition) + "<b>" + convertedLargerWord.slice(wordPosition, wordPosition + convertedWord.length)+ "</b>" + convertedLargerWord.slice(wordPosition + convertedWord.length);


}
function removeFoulWords(text) {
  const sentence = text.split(" ");
  sentence.forEach(function(element) {
    if ((element.toLowerCase().includes("zoinks")) || (element.toLowerCase().includes("muppeteer")) || (element.toLowerCase().includes("biffaroni")) || (element.toLowerCase().includes("loopdaloop")) ) {
      const index = sentence.indexOf(element)

      if (index !== -1) {
        sentence[index] = "@%#!"
      }
    }
  });
  return sentence.join(" ");
}

  function boldPassage(word, text) {
    if (noInputtedWord(word, text)) {
      // return removeFoulWords(text);
      return text;
    }
    let htmlString = "<p>";
    const wordsArray = removeFoulWords(text);
    const textArray = wordsArray.split(" ");
    textArray.forEach(function(element, index) {
      if (element.toLowerCase().includes(word.toLowerCase())) {
        // htmlString = htmlString.concat("<b>" + element + "</b>");
        htmlString = htmlString.concat(findWordWithinWord(word, element));
      } else {
        htmlString = htmlString.concat(element);
      }
      if (index !== (textArray.length - 1)) {
        htmlString = htmlString.concat(" ");
      }
    });
    return htmlString + "</p>";
  }



  function removePunctuation(text) {
    const punctuationMarks = ['.', ',', ';', ':', '!', '?', '-', '_', '"', '(', ')', '[', ']', '{', '}', '<', '>', "'", "@", "#", "%"];
    const characters = text.split('');
  
    const filteredCharacters = characters.filter(function(char) { return !punctuationMarks.includes(char)
     });
  
    const textResult = filteredCharacters.join('');
  
    return spaceEliminator(textResult);
  }

  
  // Most Used Words
  function commonWords (text) {
      if (text.trim().length === 0) {
        return 0;
      }
      const cleaned = removePunctuation(removeFoulWords(text));
      const words = cleaned.toLowerCase().trim().split(" ");
      const occurences = words.reduce(function (allWords, word) {
    
        if (word in allWords) {
          allWords[word]++ 
        }
        else {
          allWords[word] = 1 
        }
        return allWords
    }, Object.create(null));
  
      return occurences;
    }


    
  function sortCommonWords (wordCounts) {
    const topResults = Object.entries(wordCounts).sort(function (a, b) {
      return b[1] - a[1];
        });
        return topResults
  }

  function getMostCommonWords(sortedWords, count) {
    return sortedWords.slice(0, count);
  }
  
  function outputCommonWords (commonWordsList) {

    const mostUsedWords = sortCommonWords(commonWords(commonWordsList));
    const mostCommonWords = getMostCommonWords(mostUsedWords, 3);
     const sorterdOrder = mostCommonWords.reduce(function(output, wordObj) {
        return output + '<p>' + wordObj[0] + ': ' + wordObj[1] + '</p>';
      }, '');
      return sorterdOrder;
  }



  
  
  // UI Logic

  $(document).ready(function(){
    $("form#word-counter").submit(function(event){
      event.preventDefault();
      const passage = $("#text-passage").val();
      const word = $("#word").val();
      const result = outputCommonWords(passage);
      const wordCount = wordCounter(passage);
      const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
      $("#mostUsed").html(result);
      $("#total-count").html(wordCount);
      $("#selected-count").html(occurrencesOfWord);
      $("#bolded-passage").html(boldPassage(word, passage));
    });
  });

  