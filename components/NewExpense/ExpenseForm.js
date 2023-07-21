import { Send } from "@mui/icons-material";
import { Container, Stack, TextField, Button, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useState } from "react";

const ExpenseForm = (props) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    inputDate: new Date(),
  });

  // Validate
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  const saveExpenseDataHandler = props?.saveExpenseDataHandler;

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    // setExpense((prev) => ({ ...prev, title: e.target.value }));
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
    // setExpense((prev) => ({ ...prev, amount: e.target.value }));
  };

  const dateChangeHandler = (date) => {
    setDate(date);
    // setExpense((prev) => ({ ...prev, inputDate: date }));
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      setIsValidTitle(false);
      return;
    }

    if (amount.trim().length === 0 || isNaN(amount)) {
      setIsValidAmount(false);
      return;
    }

    if (!(date instanceof Date && !isNaN(date))) {
      setIsValidDate(false);
      return;
    }

    const expenseDate = {
      title,
      amount: Number(amount),
      date,
    };

    saveExpenseDataHandler(expenseDate);

    setTitle("");
    setAmount("");
    setDate(new Date());
    setIsValidTitle(true);
    setIsValidAmount(true);
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={2} pt={5}>
            <TextField
              id="expense-form-title"
              label="Title"
              variant="outlined"
              value={title}
              // onChange={(e) => setTitle(e.target.value)}
              // value={expense.title}
              onChange={titleChangeHandler}
              error={!isValidTitle}
              helperText={isValidTitle ? "" : "Please input the title"}
            />
            <TextField
              id="expense-form-amount"
              label="Amount"
              variant="outlined"
              // type="number"
              value={amount}
              // onChange={(e) => setAmount(e.target.value)}
              // value={expense.amount}
              onChange={amountChangeHandler}
              // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={!isValidAmount}
              helperText={!isValidAmount ? "Please input the amount" : ""}
            />
            <DesktopDatePicker
              label="Date desktop"
              // inputFormat="MM/dd/yyyy"
              value={date}
              // onChange={handleChange}
              // value={expense.inputDate}
              onChange={dateChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!isValidDate}
                  helperText={isValidDate ? "Please input the valid date" : ""}
                />
              )}
            />
          </Stack>

          <Box
            pt={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Add expense
            </Button>
          </Box>
        </LocalizationProvider>
      </form>
    </Container>
  );
};

export default ExpenseForm;
