import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import Card from "./Card";
import { styled } from "styled-components";
import Filter from "./Filter";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Tune } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import FilterModal from "./FilterModal";
import { useEffect, useState } from "react";

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transition: all 500ms ease-in-out; */
`;

const Wrapper = styled.div`
  width: 94%;
  display: flex;
  position: relative;
  padding-top: 25px;

  ${laptop({
    paddingTop: "0px",
  })}

  ${tablet({
    paddingTop: "0px",
  })}

  ${mobileXL({
    paddingTop: "0px",
  })}

  ${mobile({
    paddingTop: "0px",
  })}
`;

const Container = styled.div`
  width: 100%;
  padding-left: 25px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  ${laptop({
    padding: "25px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  })}

  ${tablet({
    padding: "15px",
    gridGap: "15px;",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}

  ${mobileXL({
    padding: "10px",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  })}

  ${mobile({
    padding: "5px",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  })}
`;

const FilterWrapper = styled.div`
  padding: 0px 25px;
  display: flex;
  height: max-content;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  gap: 5px;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  padding: 8px 30px;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
  background-color: white;
  border: 1px solid lightgrey;
  font-family: "Nunito", sans-serif;
`;

const ProductList = () => {
  const info = {
    id: 1,
    title: "Nike Tech Hera",
    cost: "9 695.00",
    description:
      "The Tech Hera is here to fulfil all of your chunky sneaker wishes. The wavy lifted midsole and suede accents level up your look while keeping you comfortable. Its durable design holds up beautifully to everyday wear—which is perfect, because you'll definitely want to wear these every day.",
    photo: [
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/08f3e7fe-fdae-4a73-a551-64abeb1bbad6/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5b5c2d7e-1d57-4040-bbea-ed95dac979da/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1239f5af-af11-4356-aa39-1d474dee4fd0/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6e1ed3de-e9d9-4268-974f-0de85530e60c/tech-hera-shoes-JlV5km.png",
      "https://static.nike.com/a/images/t_default/d9c82563-fe46-4d96-af29-d5b6d8039fb2/tech-hera-shoes-JlV5km.png",
    ],
    tag: ["Women", "Sneaker", "Running"],
    sizeAvailable: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
    ],
    colourAvailable: [
      "D5FFE4",
      "EAC696",
      "D8D9DA",
      "61677A",
      "272829",
      "E48586",
    ],
  };

  const { query } = useParams();
  // console.log(query);

  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {width <= 1024 && (
        <FilterWrapper>
          <FilterButton onClick={() => setOpen(true)}>
            Filter <Tune style={{ transform: "scale(0.8)" }} />
          </FilterButton>
        </FilterWrapper>
      )}

      {open && (
        <Modal>
          <FilterModal setOpen={setOpen} />
        </Modal>
      )}

      <OuterWrapper>
        <Wrapper>
          {width > 1024 && <Filter />}
          <Container>
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
            <Card info={info} />
          </Container>
        </Wrapper>
      </OuterWrapper>
    </>
  );
};

export default ProductList;
