// Business Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
 }

function wordCounter(text) {
    if (text.trim().length === 0) {
      return 0;
    }
    let wordCount = 0;
    const wordArray = text.trim().split(" ");
    wordArray.forEach(function(element) {
      if (!Number(element)) {
        wordCount++;
      }
    });
    return wordCount;
  }
  
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

 function findWordWithin(word, largerWord) {
  const convertedWord = word.toLowerCase();
  const convertedLargerWord = largerWord.toLowerCase();

  let wordIndex = convertedLargerWord.indexOf(convertedWord);
  
  if (wordIndex !== -1) {
    wordPosition = wordIndex ;

  } else {
    return -1;
  }

  wordArray = convertedLargerWord.split(" ");

  // return "<b>" + largerWord.slice(wordPosition, word.length)+ "</b>" + largerWord.slice(wordPosition + word.length) 
  // return largerWord.slice(0, wordPosition) + "<b>" + largerWord.slice(wordPosition) + "</b>" 
  return convertedLargerWord.slice(0, wordPosition) + "<b>" + convertedLargerWord.slice(wordPosition, wordPosition + convertedWord.length)+ "</b>" + convertedLargerWord.slice(wordPosition + convertedWord.length)


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
      return "";
    }
    let htmlString = "<p>";
    const wordsArray = removeFoulWords(text);
    const textArray = wordsArray.split(" ");
    textArray.forEach(function(element, index) {
      if (element.toLowerCase().includes(word.toLowerCase())) {
        // htmlString = htmlString.concat("<b>" + element + "</b>");
        htmlString = htmlString.concat(findWordWithin(word, element));
      } else {
        htmlString = htmlString.concat(element);
      }
      if (index !== (textArray.length - 1)) {
        htmlString = htmlString.concat(" ");
      }
    });
    return htmlString + "</p>";
  }

  

  function removePunctuation(str) {
    const punctuationMarks = ['.', ',' , ';', ':', '!', '?', '-', '_', '"', '(', ')', '[', ']', '{', '}', '<', '>', "'"];
  
    const characters = str.split('');
  
    const filteredCharacters = characters.filter(function(char) { return !punctuationMarks.includes(char)
     });
  
    const result = filteredCharacters.join('');
  
    return result;
  }
  
  // Most Used Words
  function commonWords (text) {
      if (text.trim().length === 0) {
        return 0;
      }
      const cleaned = removePunctuation(text);
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

    const mostCommonWords = getMostCommonWords(commonWordsList, 3);
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
      const mostUsedWords = sortCommonWords(commonWords(passage));
      const result = outputCommonWords (mostUsedWords);
      const wordCount = wordCounter(passage);
      const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
      $("#mostUsed").html(result);
      $("#total-count").html(wordCount);
      $("#selected-count").html(occurrencesOfWord);
      $("#bolded-passage").html(boldPassage(word, passage));
    });
  });

  