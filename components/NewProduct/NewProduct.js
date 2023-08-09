import ProductForm from "./ProductForm";

const NewProduct = (props) => {
  const saveProductDataHandler = (data) => {
    const newProductData = { ...data };
    props.getValueApp(newProductData);
  };

  return <ProductForm saveProductDataHandler={saveProductDataHandler} />;
};

export default NewProduct;
