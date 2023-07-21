import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";

const usernameReducer = (state, action) => {
  if (action.type === "USERNAME_INPUT_CHANGE") {
    return {
      value: action.payload,
      isValid: action.payload.trim().length !== 0,
    };
  }

  if (action.type === "USERNAME_INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length !== 0 };
  }

  if (action.type === "USERNAME_INPUT_RESET") {
    return { value: "", isValid: null };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT_CHANGE") {
    return {
      value: action.payload,
      isValid: action.payload.trim().length !== 0,
    };
  }

  if (action.type === "PASSWORD_INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length !== 0 };
  }

  if (action.type === "PASSWORD_INPUT_RESET") {
    return { value: "", isValid: null };
  }
};

const Login = (props) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [usernameState, usernameDispatcher] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Validate
  // const [isValidUsername, setIsValidUsername] = useState(true);
  // const [isValidPassword, setIsValidPassword] = useState(true);

  const loginHandler = props?.loginHandler;

  const validateUsernameHandler = () => {
    // setIsValidUsername(username.trim().length !== 0);
    usernameDispatcher({
      type: "USERNAME_INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    // setIsValidPassword(password.trim().length !== 0);
    passwordDispatcher({
      type: "PASSWORD_INPUT_BLUR",
    });
  };

  // Form handlers
  const usernameChangeHandler = (e) => {
    usernameDispatcher({
      type: "USERNAME_INPUT_CHANGE",
      payload: e.target.value,
    });
    // setUsername(e.target.value);

    setFormIsValid(e.target.value.trim().length !== 0 && passwordState.isValid);
  };

  const passwordChangeHandler = (e) => {
    passwordDispatcher({
      type: "PASSWORD_INPUT_CHANGE",
      payload: e.target.value,
    });

    // setPassword(e.target.value);
    setFormIsValid(e.target.value.trim().length !== 0 && usernameState.isValid);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseDate = {
      username: usernameState.value,
      password: passwordState.value,
    };

    loginHandler(expenseDate);

    // setUsername("");
    // setPassword("");
    // setIsValidUsername(true);
    // setIsValidPassword(true);
    setFormIsValid(false);
    usernameDispatcher({ type: "USERNAME_INPUT_RESET" });
    passwordDispatcher({ type: "PASSWORD_INPUT_RESET" });
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
            value={usernameState.value}
            type="text"
            // onChange={(e) => setUsername(e.target.value)}
            // value={expense.username}
            onBlur={validateUsernameHandler}
            onChange={usernameChangeHandler}
            // error={!isValidUsername}
            error={usernameState.isValid === false}
            helperText={
              usernameState.isValid === false
                ? "Please input the existed username"
                : ""
            }
          />
          <TextField
            id="expense-form-password"
            label="Password"
            variant="outlined"
            type="password"
            value={passwordState.value}
            onBlur={validatePasswordHandler}
            onChange={passwordChangeHandler}
            error={passwordState.isValid === false}
            helperText={
              passwordState.isValid === false
                ? "Please input the correct password"
                : ""
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
