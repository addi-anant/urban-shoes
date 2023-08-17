import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const InformationContainer = styled.div`
  padding: 5px 0px;
`;

const Info = styled.p`
  margin: 0px;
  padding: 2px 0px;
`;

const SliderCardLoader = () => {
  return (
    <>
      <Container>
        <ImgContainer>
          <Skeleton width={"100%"} height={"100%"} />
        </ImgContainer>

        <InformationContainer>
          <Info>
            <Skeleton width={"80%"} />
          </Info>
          <Info>
            <Skeleton width={"40%"} />
          </Info>
          <Info>
            <Skeleton width={"40%"} />
          </Info>
          <Info>
            <Skeleton width={"60%"} />
          </Info>
        </InformationContainer>
      </Container>
    </>
  );
};

export default SliderCardLoader;
