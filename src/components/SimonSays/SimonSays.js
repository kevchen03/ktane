import React from 'react';
import '../../styling/commonStyles.css';
import vowels0 from './rules/Vowel0.jpg';
import vowels1 from './rules/Vowel1.jpg';
import vowels2 from './rules/Vowel2.jpg';
import noVowels0 from './rules/NoVowel0.jpg';
import noVowels1 from './rules/NoVowel1.jpg';
import noVowels2 from './rules/NoVowel2.jpg';

const SimonSays = (props) => {
  /* rules[Number(hasVowel)][strikes] */
  const rules = [
    [noVowels0, noVowels1, noVowels2],
    [vowels0, vowels1, vowels2]
  ];

  return (
    <div className='containerStyle'>
      <h2 className='moduleHeader'>Simon Says</h2>
      <img style={{ maxWidth: "90%"}} src={rules[Number(props.serialProps.vowel)][props.strikes > 1 ? 2 : props.strikes]} alt="Simon Says Rule"/>
    </div>
  )
};

export default SimonSays;