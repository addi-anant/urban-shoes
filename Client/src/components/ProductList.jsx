import { laptop, mobile, mobileXL, tablet } from "../utils/responsive";
import Card from "./Card";
import { styled } from "styled-components";
import Filter from "./Filter";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Tune } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import SliderCardLoader from "./Loaders/SliderCardLoader";
import FilterModal from "./FilterModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-height: 60vh;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  ${laptop({
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  })}

  ${tablet({
    gridGap: "15px;",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}
  
  ${mobileXL({
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  })}
  
  ${mobile({
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  })};
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

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SVG = styled.img`
  width: 40%;
  aspect-ratio: 1.2;

  ${laptop({
    width: "45%",
  })}

  ${tablet({
    width: "60%",
  })}

  ${mobileXL({
    width: "70%",
  })}

  ${mobile({
    width: "90%",
  })}
`;

const Text = styled.p`
  margin: 0px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  text-align: center;
  color: #878787;

  ${mobileXL({
    fontSize: "20px",
  })}

  ${mobile({
    fontSize: "16px",
  })}
`;

const ProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 25px;

  ${laptop({
    padding: "25px",
  })}

  ${tablet({
    padding: "15px",
  })}
  
  ${mobileXL({
    padding: "10px",
  })}
  
  ${mobile({
    padding: "5px",
  })};
`;

const ProductList = () => {
  const { query } = useParams();

  const filtersAndSearch = useSelector((store) => store.filtersAndSearch);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const fetchResult = async (pageParam) => {
    const response = await axiosInstance.post(
      `/product/search/${query}/${pageParam}`,
      {
        ...filtersAndSearch,
      }
    );

    return response.data;
  };

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`"${query}"`],
    queryFn: ({ pageParam = 1 }) => fetchResult(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  /* Attaching a ref to the last product. */
  const intObserver = useRef();
  const lastProductRef = useCallback(
    (product) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((products) => {
        if (products[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (product) intObserver.current.observe(product);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const searchResult = data?.pages?.map((pg) => {
    return pg?.map((info, index) => {
      return index + 1 === pg.length ? (
        <Card key={info?._id} product={info} ref={lastProductRef} />
      ) : (
        <Card key={info?._id} product={info} />
      );
    });
  });

  /* re-fetch result on filter updation: */
  useEffect(() => {
    refetch();
  }, [filtersAndSearch]);

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
          <>
            {isLoading ? (
              <ProductWrapper>
                <Container>
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <SliderCardLoader key={index} />
                    ))}
                </Container>
              </ProductWrapper>
            ) : (
              <>
                {!searchResult?.[0]?.length ? (
                  <SVGContainer>
                    <SVG src="https://res.cloudinary.com/additya/image/upload/v1692353166/urban%20shoes/cbvxisa9iezaw6m3ok22.png" />
                    <Text> Your search does not match any products. </Text>
                    <Text> Please try again. </Text>
                  </SVGContainer>
                ) : (
                  <ProductWrapper>
                    <Container>{searchResult}</Container>
                    {isFetchingNextPage && (
                      <Container>
                        {Array(6)
                          .fill("")
                          .map((_, index) => (
                            <SliderCardLoader key={index} />
                          ))}
                      </Container>
                    )}
                  </ProductWrapper>
                )}
              </>
            )}
          </>
        </Wrapper>
      </OuterWrapper>
    </>
  );
};

export default ProductList;
