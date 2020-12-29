// eslint-disable-next-line
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class App extends Component {
//   render() {
//     return <div>Hi There</div>;
//   }
// }

const App = () => {
  const text = ["What is React", "How React Works", "What is JSX"];
  return (
    <ul className="list">
      {text.map((text) => {
        return (
          <li className="items">
            <a href="https" className="link">
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
