import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";

const usernameReducer = (payload) => {
  return { value: "", isValid: null };
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [usernameState, usernameDispatcher] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });

  // Validate
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const loginHandler = props?.loginHandler;

  const validateUsernameHandler = () => {
    setIsValidUsername(username.trim().length !== 0);
  };
  const validatePasswordHandler = () => {
    setIsValidPassword(password.trim().length !== 0);
  };

  // Form handlers
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    setFormIsValid(
      e.target.value.trim().length !== 0 && password.trim().length !== 0
    );
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setFormIsValid(
      e.target.value.trim().length !== 0 && username.trim().length !== 0
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (username.trim().length === 0) {
      setIsValidUsername(false);
      return;
    }

    if (password.trim().length === 0) {
      setIsValidPassword(false);
      return;
    }

    const expenseDate = {
      username,
      password,
    };

    loginHandler(expenseDate);

    setUsername("");
    setPassword("");
    setIsValidUsername(true);
    setIsValidPassword(true);
  };

  // Uef
  // useEffect(() => {
  //   setFormIsValid(
  //     username.trim().length !== 0 && password.trim().length !== 0
  //   );

  //   return () => {
  //     console.log(`Login.js: line 71 🐱‍🚀❄🐱‍🏍 clean up fnc ===>`);
  //   };
  // }, [password, username]);

  return (
    <Container sx={{ width: "30%" }}>
      <form onSubmit={submitHandler}>
        <Stack spacing={2} pt={5}>
          <TextField
            id="expense-form-username"
            label="Username"
            variant="outlined"
            value={username}
            type="text"
            // onChange={(e) => setUsername(e.target.value)}
            // value={expense.username}
            onBlur={validateUsernameHandler}
            onChange={usernameChangeHandler}
            error={!isValidUsername}
            helperText={
              isValidUsername ? "" : "Please input the existed username"
            }
          />
          <TextField
            id="expense-form-password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onBlur={validatePasswordHandler}
            onChange={passwordChangeHandler}
            error={!isValidPassword}
            helperText={
              !isValidPassword ? "Please input the correct password" : ""
            }
          />
        </Stack>

        <Box
          pt={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            type="submit"
            variant="contained"
            endIcon={<Send />}
            disabled={!formIsValid ? true : false}
          >
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
