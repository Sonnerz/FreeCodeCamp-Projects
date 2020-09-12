import React from 'react';
import './App.css';

const regexOperator = /[*/+-]/;
const regexNumberOperator = /((\d*\.\d+)|(\d+)|([+\-*/()]))/g;
const regexEndsWithOperator = /[*/+-]$/;

const KeyPad = props => {
  return (
    <div id={props.idValue} className={props.className} onClick={props.click}>
      {props.displayValue}
    </div>
  );
};

const KeyBank = props => {
  const calcButtons = props.calckeys.map(k => (
    <KeyPad key={k.id}
      displayValue={k.display}
      idValue={k.id}
      click={props.click}
      className={k.className}
    />
  ));
  return <div className="calculator-keys">{calcButtons}</div>;
};

const DisplayFormula = props => {
  return <div id="displayFormula">{props.showFormula}</div>;
};

const DisplayResult = props => {
  return <div id="display">{props.showResult}</div>;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calckeys: calcElements,
      displayFormula: "",
      prevClicked: "0",
      currentClicked: "0",
      problemSolved: false,
      test: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  calculate(mathProblem) {
    console.log("mathProblem " + mathProblem);

    const numberOperaterArray = mathProblem.match(regexNumberOperator);
    console.log(numberOperaterArray);

    // eslint-disable-next-line
    let answer = Math.round(1000000000000 * eval(mathProblem)) / 1000000000000;
    console.log(answer, this.state.currentClicked);
    return answer;
  }

  handleClick(e) {
    //--------------CLEAR-----------------------
    if (e.target.id === "clear") {
      this.setState({
        displayFormula: "",
        prevClicked: "0",
        currentClicked: "0",
        problemSolved: false,
        test: "CLEAR"
      });
      //------------CANCEL CE------------------------
    } else if (e.target.id === "cancel") {
      if (this.state.problemSolved === false) {
        this.setState({
          displayFormula: this.state.displayFormula.slice(0, -1),
          prevClicked: "0",
          currentClicked: this.state.currentClicked.slice(0, -1),
          problemSolved: false,
          test: "CE1"
        });
      } else {
        this.setState({
          displayFormula: this.state.displayFormula,
          currentClicked: this.state.currentClicked,
          test: "CE2"
        });
      }

      //------------OPERATOR------------------------
    } else if (e.target.id === "divide"
      || e.target.id === "multiply"
      || e.target.id === "add"
      || e.target.id === "subtract") {
      this.setState({
        currentClicked: e.target.innerText,
        problemSolved: false,
        test: "OP1"
      });
      if (this.state.displayFormula.includes('=')) {
        this.setState({ displayFormula: this.state.prevClicked + e.target.innerText, test: "OP2" });
      } else {
        this.setState({
          prevClicked: !regexOperator.test(this.state.currentClicked) ?
            this.state.displayFormula : this.state.prevClicked,
          displayFormula: !regexOperator.test(this.state.currentClicked) ?
            // eslint-disable-next-line
            this.state.displayFormula += e.target.innerText : this.state.prevClicked += e.target.innerText,
          test: "OP3"
        });
      }
      //-------------DECIMAL------------------------
    } else if (e.target.id === "decimal") {
      if (this.state.problemSolved === true) {
        this.setState({
          currentClicked: '0.',
          displayFormula: '0.',
          problemSolved: false,
          test: "DECRESET"
        });
      } else if (!this.state.currentClicked.includes('.')) {
        this.setState({ problemSolved: false })
        if (regexEndsWithOperator.test(this.state.displayFormula) || (this.state.currentClicked === '0' && this.state.displayFormula === '')) {
          this.setState({
            currentClicked: '0.',
            displayFormula: this.state.displayFormula + '0.',
            test: "DEC1"
          });
        } else {
          this.setState({
            currentClicked: this.state.displayFormula.match(/(-?\d+\.?\d*)$/)[0] + '.',
            displayFormula: this.state.displayFormula + '.',
            test: "DEC2"
          });
        }
      }
      //------------EQUALS-------------------------
    } else if (e.target.id === "equals" && this.state.problemSolved === false) {
      let problemResult = "";
      let cleanFormula = ""
      if (regexEndsWithOperator.test(this.state.displayFormula)) {
        cleanFormula = this.state.displayFormula.slice(0, -1);
      }
      if (cleanFormula === "") {
        problemResult = this.calculate(this.state.displayFormula);
        this.setState({
          currentClicked: problemResult.toString(),
          prevClicked: problemResult,
          displayFormula: this.state.displayFormula + "=" + problemResult,
          problemSolved: true,
          test: "EQ2"
        });
      } else {
        problemResult = this.calculate(cleanFormula);
        this.setState({
          currentClicked: problemResult.problemResult.toString(),
          prevClicked: problemResult,
          displayFormula: cleanFormula + "=" + problemResult,
          problemSolved: true,
          test: "EQ2"
        });
      }


      //--------------NUMBERS-----------------------
    } else {
      if (this.state.problemSolved === true) {
        this.setState({
          currentClicked: e.target.innerText,
          displayFormula: e.target.innerText !== '0' ? e.target.innerText : '',
          test: "NUM1"
        });
      } else {
        this.setState({
          currentClicked:
            this.state.currentClicked === '0' || regexOperator.test(this.state.currentClicked) ?
              e.target.innerText : this.state.currentClicked + e.target.innerText,
          test: "NUM3",
          displayFormula:
            this.state.currentClicked === '0' && e.target.innerText === '0' ?
              this.state.displayFormula :
              /([^.0-9]0)$/.test(this.state.displayFormula) ?
                this.state.displayFormula.slice(0, -1) + e.target.innerText :
                this.state.displayFormula + e.target.innerText,
        });
      }
    }
  }

  render() {
    return (
      <div id="app-container">
        <DisplayFormula showFormula={this.state.displayFormula} />
        <DisplayResult showResult={this.state.currentClicked} />
        <KeyBank calckeys={this.state.calckeys} click={this.handleClick} className="calculator-keys" />
      </div>
    );
  }
}


const calcElements = [
  {
    display: "/",
    id: "divide",
    className: "key-pad"
  },
  {
    display: "*",
    id: "multiply",
    className: "key-pad"
  },
  {
    display: "-",
    id: "subtract",
    className: "key-pad"
  },
  {
    display: "+",
    id: "add",
    className: "key-pad"
  },
  {
    display: "=",
    id: "equals",
    className: "key-pad equal-sign"
  },
  {
    display: 1,
    id: "one",
    className: "key-pad"
  },
  {
    display: 2,
    id: "two",
    className: "key-pad"
  },
  {
    display: 3,
    id: "three",
    className: "key-pad"
  },
  {
    display: "AC",
    id: "clear",
    className: "key-pad clear-sign"
  },
  {
    display: 4,
    id: "four",
    className: "key-pad"
  },
  {
    display: 5,
    id: "five",
    className: "key-pad"
  },
  {
    display: 6,
    id: "six",
    className: "key-pad"
  },
  {
    display: 7,
    id: "seven",
    className: "key-pad"
  },
  {
    display: 8,
    id: "eight",
    className: "key-pad"
  },
  {
    display: 9,
    id: "nine",
    className: "key-pad"
  },
  {
    display: 0,
    id: "zero",
    className: "key-pad"
  },
  {
    display: ".",
    id: "decimal",
    className: "key-pad"
  },
  {
    display: "CE",
    id: "cancel",
    className: "key-pad cancel-sign"
  },
];
export default Calculator;
//ReactDOM.render(<Calculator />, document.getElementById("root"));
