import Slider from "./Slider";
import { useEffect } from "react";
import ProductDetail from "./ProductDetail";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProductDetail />
      <Slider heading="You May Also Like" />
    </>
  );
};

export default Product;
