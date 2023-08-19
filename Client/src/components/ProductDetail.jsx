import { useState } from "react";
import { toast } from "react-hot-toast";
import ProductSize from "./ProductSize";
import { styled } from "styled-components";
import ProductHeader from "./ProductHeader";
import ProductColour from "./ProductColour";
import ProductBanner from "./ProductBanner";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteBorder } from "@mui/icons-material";
import { mobile, mobileXL, tablet } from "../utils/responsive";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ProductDetailLoader from "./Loaders/ProductDetailLoader";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

const ProductWrapper = styled.div`
  gap: 5%;
  display: flex;
  padding: 20px 5vw;
  position: relative;

  ${tablet({
    padding: "3vw",
    flexDirection: "column",
  })}

  ${mobileXL({
    padding: "3vw",
    flexDirection: "column",
  })}

  ${mobile({
    padding: "3vw",
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  top: 0px;
  flex: 1.2;
  gap: 20px;
  width: 100%;
  display: flex;
  position: sticky;
  height: max-content;

  ${tablet({
    position: "relative",
  })}

  ${mobileXL({
    position: "relative",
  })}

  ${mobile({
    position: "relative",
    flexDirection: "column-reverse",
  })}
`;

const Right = styled.div`
  flex: 1;
  width: 100%;

  ${tablet({
    marginTop: "25px",
  })}

  ${mobileXL({
    marginTop: "25px",
  })}

  ${mobile({
    marginTop: "25px",
  })}
`;

const RightContainer = styled.div`
  display: flex;
  max-width: 80%;
  flex-direction: column;

  ${tablet({
    maxWidth: "100%",
  })}

  ${mobileXL({
    maxWidth: "100%",
  })}

  ${mobile({
    maxWidth: "100%",
  })}
`;

const Header = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 4px;
  font-family: "Nunito", sans-serif;
`;

const Button = styled.button`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 100px;
  background-color: ${(props) => (props.color === "cart" ? "black" : "white")};
  color: ${(props) =>
    props.color === "cart"
      ? "white"
      : props.favourite === "true"
      ? "red"
      : "black"};
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 18px;
  border: ${(props) =>
    props.color === "cart"
      ? "1px solid black"
      : props.favourite === "true"
      ? "2px solid red"
      : "2px solid black"};
  cursor: pointer;
`;

const Description = styled.p`
  margin: 0px;
  font-size: 18px;
  font-weight: 400;
  padding-left: 4px;
  text-align: justify;
  font-family: "Nunito", sans-serif;
`;

const ProductDetail = () => {
  // Hook and Redux variable:
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tag, setTag] = useState([]);
  const { width } = useWindowDimensions();
  const { user } = useSelector((store) => store.user);
  const wishlist = useSelector((store) => store.wishlist);

  // State Variable:
  const [favourite, setFavourite] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Toast Notification:
  const loginCart = () => toast("Login to add product to Cart.");
  const productAddToCart = () => toast("Product added to Cart.");
  const productFavourite = () => toast("Product added to Favourite.");
  const productUnfavourite = () => toast("Product removed from Favourite.");
  const loginFavourite = () => toast("Login to add product to Favourite.");

  // Fetch Product Info based upon ID:
  const { isLoading, data } = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      isFavouriteProduct(data?._id);
      setTag([...data?.gender, ...data?.type, data?.brand]);
    },
  });

  // Handler to check if product is already marked as Favourite:
  const isFavouriteProduct = (id) => {
    wishlist?.products?.filter((product) => product._id === id).length &&
      setFavourite(true);
  };

  // Add Product to Cart Handler:
  const addProductToCart = (product, colour, size) => {
    if (!user) {
      loginCart();
      return;
    }

    dispatch(
      addToCart({
        ...product,
        selectedSize: size,
        selectedQuantity: 1,
        selectedColour: colour,
      })
    );

    productAddToCart();
  };

  // Add product to Favourite Handler:
  const wishlistProduct = (product) => {
    if (!user) {
      loginFavourite();
      return;
    }

    !favourite
      ? (setFavourite(true),
        dispatch(addToWishlist({ ...product })),
        productFavourite())
      : (setFavourite(false),
        dispatch(removeFromWishlist({ _id: product?._id })),
        productUnfavourite());
  };

  return (
    <>
      {isLoading ? (
        <ProductDetailLoader />
      ) : (
        <ProductWrapper>
          {/* Product Heading Info: */}
          {width <= "768" && (
            <ProductHeader title={data?.title} tag={tag} cost={data?.cost} />
          )}

          <Left>
            <ProductBanner
              photo={data?.photo}
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
            />
          </Left>

          <Right>
            <RightContainer>
              {/* Product Heading Info: */}
              {width > "768" && (
                <ProductHeader
                  title={data?.title}
                  tag={tag}
                  cost={data?.cost}
                />
              )}

              {/* Product Colour Options: */}
              <ProductColour
                colourAvailable={data?.colourAvailable}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />

              {/* Product Size Options: */}
              <ProductSize
                sizeAvailable={data?.sizeAvailable}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />

              {/* Add to Cart Button: */}
              <Button
                color="cart"
                onClick={() =>
                  addProductToCart(
                    data,
                    data?.colourAvailable[selectedColor],
                    data?.sizeAvailable[selectedSize]
                  )
                }>
                Add to bag
              </Button>

              {/* Add to Favourite Button: */}
              <Button
                favourite={favourite.toString()}
                onClick={() => wishlistProduct(data)}>
                Favourite
                <FavoriteBorder
                  style={{
                    color: `${favourite ? "red" : "black"}`,
                    transform: "scale(1.2)",
                  }}
                />
              </Button>

              {/* Product Description: */}
              <Header>Description:</Header>
              <Description>{data?.description}</Description>
            </RightContainer>
          </Right>
        </ProductWrapper>
      )}
    </>
  );
};

export default ProductDetail;
