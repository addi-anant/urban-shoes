import { useRef } from "react";
import { styled } from "styled-components";
import { colourAvailable, sizeAvailable } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/filtersAndSearchSlice";

const MultiSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const Header = styled.p`
  margin: 0px;
  color: #2a2a2a;
  font-weight: 700;
  padding-left: 2px;
  font-size: 18px;
  font-family: "Nunito", sans-serif;
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

const MultiSelectFilter = ({ heading, filter, setFilter }) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const size = useSelector((store) => store.filtersAndSearch.size);
  const colour = useSelector((store) => store.filtersAndSearch.colour);

  const dispatch = useDispatch();
  const handleFilter = (index, type, value) => {
    revealRefs.current[index].style.outline === ""
      ? (revealRefs.current[index].style.outline = "2px solid black")
      : (revealRefs.current[index].style.outline = "");

    if (filter[type].indexOf(value) === -1) {
      setFilter({
        ...filter,
        [type]: [...filter[type], value],
      });

      dispatch(
        search({
          [type]: [...filter[type], value],
        })
      );
    } else {
      const arr = filter[type].filter((val) => val !== value);
      setFilter({
        ...filter,
        [type]: arr,
      });

      dispatch(
        search({
          [type]: arr,
        })
      );
    }
  };

  return (
    <MultiSelectWrapper>
      <Header>{heading}</Header>
      {heading === "Colour" && (
        <ColourContainer>
          {colourAvailable.map((val, index) => (
            <Colour
              key={index}
              colour={val}
              ref={addToRef}
              onClick={() => handleFilter(index, "colour", val)}
              style={{
                outline: colour.includes(val) ? "2px solid black" : "",
              }}
            />
          ))}
        </ColourContainer>
      )}

      {heading === "Size" && (
        <SizeContainer>
          {sizeAvailable.map((val, index) => (
            <Size
              key={index}
              size={val}
              ref={addToRef}
              onClick={() => handleFilter(index, "size", val)}
              style={{
                outline: size.includes(val) ? "2px solid black" : "",
              }}>
              <SizeInfo>U.K {val}</SizeInfo>
            </Size>
          ))}
        </SizeContainer>
      )}
    </MultiSelectWrapper>
  );
};

export default MultiSelectFilter;
