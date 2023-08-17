import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
`;

const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
  margin-bottom: 10px;
`;

const Header = styled.p`
  margin: 0px;
  padding: 2px 0px;
`;

const InformationContainer = styled.div``;

const IconicCardLoader = () => {
  return (
    <>
      <Container>
        <ImgContainer>
          <Skeleton width={"100%"} height={"100%"} />
        </ImgContainer>
        <InformationContainer>
          <Header>
            <Skeleton width={"80%"} />
          </Header>
        </InformationContainer>
      </Container>
    </>
  );
};

export default IconicCardLoader;
