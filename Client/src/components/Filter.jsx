import { styled } from "styled-components";
import CheckboxFilter from "./CheckboxFilter";
import React, { useEffect, useState } from "react";
import MultiSelectFilter from "./MultiSelectFilter";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/filtersAndSearchSlice";
import { brand, gender, price, type } from "../utils/constant";

const Wrapper = styled.div`
  top: 0px;
  width: ${(props) => (props.component === "modal" ? "100%" : "250px")};
  overflow: ${(props) => (props.component === "modal" ? "hidden" : "scroll")};
  position: ${(props) => (props.component === "modal" ? "relative" : "sticky")};
  height: ${(props) =>
    props.component === "modal" ? "max-content" : "calc(100vh)"};
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Filter = ({ component }) => {
  const dispatch = useDispatch();
  const filtersAndSearch = useSelector((store) => store.filtersAndSearch);

  /* State to maintain Filter Information: */
  const [filter, setFilter] = useState({
    brand: [],
    gender: [],
    type: [],
    colour: [],
    size: [],
  });

  /* Handler For Filter: */
  const handleFilter = (event) => {
    if (event.target.name === "cost") {
      dispatch(
        search({
          [event.target.name]: parseInt(event.target.value),
        })
      );

      return;
    }

    if (event.target.checked) {
      setFilter({
        ...filter,
        [event.target.name]: [...filter[event.target.name], event.target.value],
      });

      dispatch(
        search({
          [event.target.name]: [
            ...filter[event.target.name],
            event.target.value,
          ],
        })
      );
    } else {
      const arr = filter[event.target.name].filter(
        (val) => val != event.target.value
      );

      setFilter({ ...filter, [event.target.name]: arr });

      dispatch(
        search({
          [event.target.name]: arr,
        })
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilter({ ...filtersAndSearch });
  }, []);

  return (
    <Wrapper component={component}>
      {/* Brand: */}
      <CheckboxFilter
        title={"Brand"}
        name={"brand"}
        arr={brand}
        handleFilter={handleFilter}
      />

      {/* Gender: */}
      <CheckboxFilter
        title={"Gender"}
        name={"gender"}
        arr={gender}
        handleFilter={handleFilter}
      />

      {/* Cost: */}
      <CheckboxFilter
        title={"Cost"}
        name={"cost"}
        arr={price}
        handleFilter={handleFilter}
      />

      {/* Type: */}
      <CheckboxFilter
        title={"Type"}
        name={"type"}
        arr={type}
        handleFilter={handleFilter}
      />

      {/* Colour: */}
      <MultiSelectFilter
        heading="Colour"
        filter={filter}
        setFilter={setFilter}
      />

      {/* Size */}
      <MultiSelectFilter heading="Size" filter={filter} setFilter={setFilter} />
    </Wrapper>
  );
};

export default Filter;
