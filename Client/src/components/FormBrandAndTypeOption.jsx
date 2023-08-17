import { useRef } from "react";
import { styled } from "styled-components";

const MultiSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 5px 2px 0px 2px;
  grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
`;

const InfoWrapper = styled.span`
  height: 50px;
  cursor: pointer;
  outline: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: #${(props) => props.color};
  &:nth-child(${(props) => props.child}) {
    outline: 2px solid black;
  }
`;

const Info = styled.div`
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

const FormBrandAndTypeOption = ({ type, typeArr, formArr, handleForm }) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleOption = (index, type, value) => {
    revealRefs.current[index].style.outline === ""
      ? (revealRefs.current[index].style.outline = "2px solid black")
      : (revealRefs.current[index].style.outline = "");

    if (formArr.indexOf(value) === -1) {
      handleForm(type, [...formArr, value]);
    } else {
      const arr = formArr.filter((val) => val !== value);
      handleForm(type, arr);
    }
  };

  return (
    <MultiSelectWrapper>
      <Container>
        {typeArr?.map((val, index) => (
          <InfoWrapper
            key={index}
            ref={addToRef}
            onClick={() => handleOption(index, type, val)}>
            <Info>{val}</Info>
          </InfoWrapper>
        ))}
      </Container>
    </MultiSelectWrapper>
  );
};

export default FormBrandAndTypeOption;
