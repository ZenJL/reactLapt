import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const Checkout = (props) => {
  const onCheckout = props.onCheckout;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isValidName, setIsValidName] = useState(null);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setFormIsValid(
      e.target.value.trim().length !== 0 && address.trim().length !== 0
    );
  };

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
    setFormIsValid(
      e.target.value.trim().length !== 0 && name.trim().length !== 0
    );
  };

  const nameValidateHandler = () => {
    setIsValidName(name.trim().length !== 0);
  };

  const addressValidateHandler = () => {
    setIsValidAddress(address.trim().length !== 0);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onCheckout({
      name,
      address,
    });

    setName("");
    setAddress("");
    setIsValidName(null);
    setIsValidAddress(null);
    setFormIsValid(false);
  };

  return (
    <Container sx={{ width: "50%" }}>
      <form onSubmit={submitHandler}>
        <Stack spacing={2} pt={5}>
          <TextField
            id="checkout-name"
            label="Name"
            variant="outlined"
            onChange={nameChangeHandler}
            onBlur={nameValidateHandler}
            value={name}
            error={isValidName === false}
            helperText={!isValidName ? "Please input a valid name" : ""}
          />

          <TextField
            id="checkout-address"
            label="Address"
            variant="outlined"
            onChange={addressChangeHandler}
            onBlur={addressValidateHandler}
            value={address}
            error={isValidAddress === false}
            helperText={!isValidAddress ? "Please input a valid address" : ""}
          />
        </Stack>

        <Box
          pt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Send />}
            disabled={!formIsValid}
          >
            Checkout
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Checkout;
