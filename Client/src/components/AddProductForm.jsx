import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { Upload } from "@mui/icons-material";
import FormSizeOption from "./FormSizeOption";
import { gender, type } from "../utils/constant";
import FormColourOption from "./FormColourOption";
import { axiosInstance } from "../utils/axiosInstance";
import FormBrandAndTypeOption from "./FormBrandAndTypeOption";
import { useFormik } from "formik";
import { AddProductSchema } from "../formSchema";
import fileUpload from "../utils/fileUpload";
import { useNavigate } from "react-router-dom";

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  max-width: ${(props) => (props.edit ? "768px" : "")};
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 22px;
  margin: 25px 0px 15px 0px;
  font-family: "Nunito", sans-serif;
`;

const Label = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 5px;
  font-family: "Nunito", sans-serif;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: ${(props) => (props.type === "number" ? "100px" : "100%")};
  margin: ${(props) => (props.type === "number" ? "0px" : "5px 0px 10px 0px")};
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid lightgray;
`;

const InputArea = styled.textarea`
  outline: none;
  border: none;
  width: 100%;
  margin: 5px 0px 10px 0px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid lightgray;
`;

const NumericInput = styled.div`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 30px 0px;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 15px 30px;
  background-color: #ff0b55;
  font-family: "Roboto", sans-serif;
  color: white;
  border: none;
`;

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 125px;
  height: 125px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const File = styled.input``;

const AddProductForm = () => {
  /* State to maintain Form data: */
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    cost: 0,
    sizeAvailable: [],
    colourAvailable: [],
    gender: [],
    type: [],
    photo: {},
  });

  /* Form state handler: */
  const handleForm = (type, value) => {
    setForm({
      ...form,
      [type]: value,
    });
  };

  /* State to display uploaded photo in form and handle processing Info: */
  const [processing, setProcessing] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  /* ref for input icon: */
  const hiddenFileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  /* upload images to Cloudinary: */
  const ImageUpload = async (event) => {
    setForm({ ...form, photo: event.target.files });

    const url = [...event.target.files].map((file) =>
      URL.createObjectURL(file)
    );

    setUploadedPhotos(url);
  };

  const navigate = useNavigate();
  /* Add Product Form Handler: */
  const addProduct = async () => {
    setProcessing(true);

    const url = await fileUpload(form?.photo); /* Photo upload to Cloudinary. */
    const data = { ...form, photo: url }; /* Final data for Product. */
    const productID = await axiosInstance.post("product/add", data);
    console.log(productID);
    navigate(`/product/${productID?.data}`);

    setProcessing(false);
  };

  return (
    <OuterWrapper>
      <Wrapper>
        <Container>
          {/* Product Infromation: */}
          <SectionHeading>Product Information:</SectionHeading>

          {/* name: */}
          <Label>Name:</Label>
          <Input
            required={true}
            onChange={(event) => handleForm("title", event.target.value)}
          />

          {/* Brand: */}
          <Label>Brand:</Label>
          <Input
            name="brand"
            required={true}
            onChange={(event) => handleForm("brand", event.target.value)}
          />

          {/* Description: */}
          <Label>Description:</Label>
          <InputArea
            name="description"
            required={true}
            onChange={(event) => handleForm("description", event.target.value)}
          />

          {/* Price: */}
          <NumericInput>
            <Label>Price:</Label>
            <Input
              name="cost"
              type="number"
              required={true}
              onChange={(event) => handleForm("cost", event.target.value)}
            />
          </NumericInput>

          {/* Colour Available: */}
          <SectionHeading>Colour:</SectionHeading>
          <FormColourOption
            colour={form?.colourAvailable}
            handleForm={handleForm}
          />

          {/* Size Available: */}
          <SectionHeading>Size: </SectionHeading>
          <FormSizeOption size={form?.sizeAvailable} handleForm={handleForm} />

          {/* Gender Available: */}
          <SectionHeading>Gender: </SectionHeading>
          <FormBrandAndTypeOption
            type="gender"
            typeArr={gender}
            formArr={form?.gender}
            handleForm={handleForm}
          />

          {/* Type Available: */}
          <SectionHeading>Type: </SectionHeading>
          <FormBrandAndTypeOption
            type="type"
            typeArr={type}
            formArr={form?.type}
            handleForm={handleForm}
          />

          {/* Product Photo's: */}
          <SectionHeading>Product Photo's:</SectionHeading>
          <FileWrapper>
            <ImageContainer>
              {uploadedPhotos.map((upload, index) => (
                <ImageWrapper key={index}>
                  <Image src={upload} />
                </ImageWrapper>
              ))}
            </ImageContainer>

            {/* Not-hidden file upload button */}
            <Upload
              style={{
                transform: "scale(1.5)",
                paddingRight: "20px",
                cursor: "pointer",
              }}
              onClick={handleClick}
            />

            {/* Hidden file upload button */}
            <File
              type="file"
              multiple
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={(event) => ImageUpload(event)}
            />
          </FileWrapper>

          {/* Button */}
          <ButtonWrapper>
            <Button onClick={addProduct}>submit</Button>
          </ButtonWrapper>

          {processing && "Processing! wait."}
        </Container>
      </Wrapper>
    </OuterWrapper>
  );
};

export default AddProductForm;
