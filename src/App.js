import { useEffect, useState } from 'react';
import { useInput } from './hooks'
import THE_ALPHABET from './ALPHABET'
import './App.css';

function App() {

  const inputProps = useInput('');

  const [missingArray, setMissingArray] = useState([...THE_ALPHABET]);
  const [commonArray, setCommonArray] = useState([]);
  const [isPangram, setIsPangram] = useState(false);

  function makeArraysFromString(string) {
    let newWordsArray = string.split(' ');
    let newLettersArray = [];
    newWordsArray.forEach(word => {
      let tempArray = word.split('');
      tempArray.forEach(item => {
        const letter = item.toLowerCase();
        if (THE_ALPHABET.includes(letter)) {
          newLettersArray.push(letter)
        }
      })
    })
    return [newLettersArray, newWordsArray]
  }

  function getComparedArrays(comparisonArray, testArray) {
    let newMissingLetters = []
    let newCommonLetters = []
    comparisonArray.forEach(item => {
      if (!testArray.includes(item) && !newMissingLetters.includes(item)) {
        newMissingLetters.push(item)
      } else if (testArray.includes(item) && !newCommonLetters.includes(item)) {
        newCommonLetters.push(item)
      }
    })
    return [newCommonLetters, newMissingLetters];
  }
  
  useEffect(() => {
    if (!inputProps.value) return

    const [tempLettersArray] = makeArraysFromString(inputProps.value)
    const [tempCommonArray, tempMissingArray] = getComparedArrays(THE_ALPHABET, tempLettersArray)

    setCommonArray(tempCommonArray)
    setMissingArray(tempMissingArray)
  
  }, [inputProps.value])
  
  useEffect(() => {
    setIsPangram(commonArray.length >= THE_ALPHABET.length)
  }, [commonArray])

  return (
    <div className="App">
      <header>
        <h1>Pangram Tester</h1>
      </header>
      <section>
        <input type='text' {...inputProps} />
      </section>
      {inputProps.value && <section>
        <p>{`${inputProps.value} is ${isPangram ? 'a pangram!' : 'not a pangram.'}`}</p>
        {!isPangram && <p>{`It is missing the letters ${missingArray}`}</p>}
        {isPangram && <p>{`It contains all the letters of the alphabet.`}</p>}
      </section>}
    </div>
  );
}

export default App;
