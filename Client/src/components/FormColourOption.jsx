import { useRef } from "react";
import { styled } from "styled-components";
import { colourAvailable } from "../utils/constant";

const MultiSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const ColourContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 5px 0px 0px 4px;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
`;

const Colour = styled.span`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: #${(props) => props.colour};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const FormColourOption = ({ colour, handleForm }) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleOption = (index, value) => {
    revealRefs.current[index].style.outline === ""
      ? (revealRefs.current[index].style.outline = "2px solid black")
      : (revealRefs.current[index].style.outline = "");

    if (colour.indexOf(value) === -1) {
      handleForm("colourAvailable", [...colour, value]);
    } else {
      const arr = colour.filter((val) => val !== value);
      handleForm("colourAvailable", arr);
    }
  };

  return (
    <MultiSelectWrapper>
      <ColourContainer>
        {colourAvailable.map((val, index) => (
          <Colour
            key={index}
            colour={val}
            ref={addToRef}
            onClick={() => handleOption(index, val)}
            // style={{
            //   outline: colour?.includes(val) ? "2px solid black" : "", -> REQUIRED IN EDIT FORM.
            // }}
          />
        ))}
      </ColourContainer>
    </MultiSelectWrapper>
  );
};

export default FormColourOption;
