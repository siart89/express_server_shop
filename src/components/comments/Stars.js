import React, { useState } from 'react';
import { StarLabel, StarInp, StarsWrapper } from './styles';


const Stars = () => {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  return (

    <StarsWrapper>
      <StarLabel
        htmlFor="one"
        className="one"
        one={one}
        two={two}
        three={three}
        four={four}
        five={five}
        onMouseEnter={() => setOne(true)}
        onMouseLeave={() => setOne(false)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="two"
        className="two"
        two={two}
        three={three}
        four={four}
        five={five}
        onMouseEnter={() => setTwo(true)}
        onMouseLeave={() => setTwo(false)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="three"
        className="three"
        three={three}
        four={four}
        five={five}
        onMouseEnter={() => setThree(true)}
        onMouseLeave={() => setThree(false)}
      >
        ★
      </StarLabel>

      <StarLabel
        htmlFor="four"
        className="four"
        four={four}
        five={five}
        onMouseEnter={() => setFour(true)}
        onMouseLeave={() => setFour(false)}
      >
        ★
      </StarLabel>
      <StarLabel
        htmlFor="five"
        className="five"
        five={five}
        onMouseEnter={() => setFive(true)}
        onMouseLeave={() => setFive(false)}
      >
        ★
      </StarLabel>

      <div>
        <StarInp type="radio" name="star" value="1" id="one" />
        <StarInp type="radio" name="star" value="2" id="two" />
        <StarInp type="radio" name="star" value="3" id="three" />
        <StarInp type="radio" name="star" value="4" id="four" />
        <StarInp type="radio" name="star" value="5" id="five" />
      </div>
    </StarsWrapper>

  );
};

export default Stars;
