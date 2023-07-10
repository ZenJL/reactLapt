import logo from "./logo.svg";
import "./App.css";
import Expense from "./components/Expense/Expense";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";

function App() {
  // let listExpense = [
  //   { id: 1, title: "Petrol Gas", amount: 2, date: new Date(2023, 7, 3) },
  //   { id: 2, title: "Movie", amount: 10, date: new Date(2023, 10, 3) },
  //   { id: 3, title: "Lunch", amount: 5, date: new Date(2023, 12, 3) },
  // ];

  const [listExpense, setListExpense] = useState([
    { id: 1, title: "Petrol Gas", amount: 2, date: new Date(2023, 7, 3) },
    { id: 2, title: "Movie", amount: 10, date: new Date(2023, 10, 3) },
    { id: 3, title: "Lunch", amount: 5, date: new Date(2023, 12, 3) },
  ]);

  const getValueApp = (data) => {
    console.log(`App.js: line 14 🐱‍🚀❄🐱‍🏍 data ===>`);

    setListExpense((prev) => [...prev, data]);
  };

  console.log(
    `App.js: line 17 🐱‍🚀❄🐱‍🏍 listExpenselistExpense ===>`,
    listExpense
  );

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
      <NewExpense getValueApp={getValueApp} />

      <Expense expense={listExpense}>
        {/* <ExpenseItem
          title={listExpense[0].title}
          amount={listExpense[0].amount}
          date={listExpense[0].date}
          listExpense={listExpense}
        /> */}
      </Expense>
    </>
  );
}

export default App;
