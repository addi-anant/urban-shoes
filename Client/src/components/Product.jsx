import Slider from "./Slider";
import { useEffect } from "react";
import ProductDetail from "./ProductDetail";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const info = {
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

  // const { width } = useWindowDimensions();
  return (
    <>
      <ProductDetail />
      <Slider heading="You May Also Like" />
    </>
  );
};

export default Product;
