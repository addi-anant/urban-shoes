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
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

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
  const { query } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: [`${query}`],
    queryFn: async () => {
      const response = await axiosInstance.get("/product");
      return response.data;
    },
  });

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
            {data?.map((info) => (
              <Card key={info?._id} info={info} />
            ))}
          </Container>
        </Wrapper>
      </OuterWrapper>
    </>
  );
};

export default ProductList;
