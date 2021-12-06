import * as React from "react";
import "./app.css";

export const TodoContext = React.createContext({});

const App = ({ children }) => {
  return children;
};

export default App;
