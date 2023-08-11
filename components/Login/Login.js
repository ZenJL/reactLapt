import { Send } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useContext, useReducer, useState } from "react";
import AuthContext from "../../context/AuthContext";

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

  // Context
  const ctx = useContext(AuthContext);

  const [usernameState, usernameDispatcher] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const passwordConfirmReducer = (state, action) => {
    if (action.type === "PASSWORD_CONFIRM_CHANGE") {
      return {
        value: action.payload,
        isValid: action.payload.trim().length !== 0,
      };
    }

    if (action.type === "PASSWORD_CONFIRM__BLUR") {
      return {
        value: state.value,
        isValid:
          state.value.trim().length !== 0 &&
          state.value.trim() === passwordState.value,
      };
    }

    if (action.type === "PASSWORD_CONFIRM__RESET") {
      return { value: "", isValid: null };
    }
  };

  const [passwordConfirmState, passwordConfirmDispatcher] = useReducer(
    passwordConfirmReducer,
    { value: "", isValid: null }
  );

  // Validate
  // const [isValidUsername, setIsValidUsername] = useState(true);
  // const [isValidPassword, setIsValidPassword] = useState(true);

  // const loginHandler = props?.loginHandler;
  const loginHandler = ctx.login;

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

  const validatePasswordConfirmHandler = () => {
    passwordConfirmDispatcher({
      type: "PASSWORD_CONFIRM_BLUR",
    });
  };

  // Form handlers
  const usernameChangeHandler = (e) => {
    usernameDispatcher({
      type: "USERNAME_INPUT_CHANGE",
      payload: e.target.value,
    });
    // setUsername(e.target.value);

    setFormIsValid(
      e.target.value.trim().length !== 0 &&
        passwordState.isValid &&
        (!ctx.storeIsLoggedIn || passwordConfirmState.isValid) // user da login moi check passConfirm
      // CASE 1: if condition 1 is TRUE, ignore condition 2
      // CASE 2: if confidtion 1 is FALSE, then check condition 2
    );
  };

  const passwordChangeHandler = (e) => {
    passwordDispatcher({
      type: "PASSWORD_INPUT_CHANGE",
      payload: e.target.value,
    });

    // setPassword(e.target.value);
    setFormIsValid(
      e.target.value.trim().length !== 0 &&
        usernameState.isValid &&
        (!ctx.storeIsLoggedIn || passwordConfirmState.isValid)
    );
  };

  const passwordConfirmChangeHandler = (e) => {
    passwordConfirmDispatcher({
      type: "PASSWORD_CONFIRM_CHANGE",
      payload: e.target.value,
    });
    setFormIsValid(
      usernameState.isValid &&
        passwordState.isValid &&
        e.target.value.trim() === passwordState.value
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (ctx.storeIsLoggedIn) {
      // add user
      props.onAddUser(usernameState.value, passwordState.value);
    } else {
      ctx.login(usernameState.value, passwordState.value);
    }

    // const expenseDate = {
    //   username: usernameState.value,
    //   password: passwordState.value,
    // };

    // loginHandler(expenseDate);

    // setUsername("");
    // setPassword("");
    // setIsValidUsername(true);
    // setIsValidPassword(true);
    setFormIsValid(false);
    usernameDispatcher({ type: "USERNAME_INPUT_RESET" });
    passwordDispatcher({ type: "PASSWORD_INPUT_RESET" });
    passwordConfirmDispatcher({ type: "PASSWORD_CONFIRM_RESET" });
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <form onSubmit={submitHandler}>
          <Stack spacing={2} pt={5}>
            <TextField
              id="product-form-username"
              label="Username"
              variant="outlined"
              value={usernameState.value}
              type="text"
              // onChange={(e) => setUsername(e.target.value)}
              // value={product.username}
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
              id="product-form-password"
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
            {ctx.storeIsLoggedIn && (
              <TextField
                id="form-password-confirm"
                label="Confirm password"
                variant="outlined"
                type="password"
                value={passwordConfirmState.value}
                onBlur={validatePasswordConfirmHandler}
                onChange={passwordConfirmChangeHandler}
                error={passwordConfirmState.isValid === false}
                helperText={
                  passwordConfirmState.isValid === false
                    ? "Password and confirm password must be matched"
                    : ""
                }
              />
            )}
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
              {ctx.storeIsLoggedIn ? "Register new user" : "Login"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
