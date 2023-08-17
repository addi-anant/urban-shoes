import { useRef } from "react";
import { styled } from "styled-components";
import { colourAvailable, sizeAvailable } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/filtersAndSearchSlice";

const MultiSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const SizeContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 5px 2px 0px 2px;
  grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
`;

const Size = styled.span`
  height: 50px;
  cursor: pointer;
  outline: 1px solid lightgray;
  border-radius: 2px;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const SizeInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const FormSizeOption = ({ size, handleForm }) => {
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

    if (size.indexOf(value) === -1) {
      handleForm("sizeAvailable", [...size, value]);
    } else {
      const arr = size.filter((val) => val !== value);
      handleForm("sizeAvailable", arr);
    }
  };

  return (
    <MultiSelectWrapper>
      <SizeContainer>
        {sizeAvailable.map((val, index) => (
          <Size
            key={index}
            size={val}
            ref={addToRef}
            onClick={() => handleOption(index, val)}
            // style={{
            //   outline: size.includes(val) ? "2px solid black" : "", -> REQUIRED IN EDIT.
            // }}
          >
            <SizeInfo>U.K {val}</SizeInfo>
          </Size>
        ))}
      </SizeContainer>
    </MultiSelectWrapper>
  );
};

export default FormSizeOption;
