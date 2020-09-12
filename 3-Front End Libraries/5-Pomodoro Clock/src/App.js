import React, { Component } from 'react';
import './App.css';
import Controls from './components/Controls';
import Timer from './components/Timer';
import ControlMinutes from './components/ControlMinutes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      break: 300,
      userSetBreak: 300,
      session: 1500,
      userSetSession: 1500,
      sessionTimerRunning: false,
      timerPaused: true,
      intervalId: "",
      sessionType: "session"
    };
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrementClick = this.handleDecrementClick.bind(this);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  handleIncrementClick(e) {
    if (e.currentTarget.id === "break-increment") {
      this.state.break === 3600
        ? this.setState(prevState => {
          return { break: prevState.break };
        })
        : this.setState(prevState => {
          return {
            userSetBreak: prevState.userSetBreak + 60,
            break: this.state.userSetBreak + 60
          };
        });
    } else {
      this.state.session === 3600
        ? this.setState(prevState => {
          return { session: prevState.session };
        })
        : this.setState(prevState => {
          return {
            userSetSession: prevState.userSetSession + 60,
            session: this.state.userSetSession + 60
          };
        });
    }
  }

  handleDecrementClick(e) {
    if (e.currentTarget.id === "break-decrement") {
      this.state.break === 60
        ? this.setState(prevState => {
          return { break: prevState.break };
        })
        : this.setState(prevState => {
          return {
            userSetBreak: prevState.userSetBreak - 60,
            break: this.state.userSetBreak - 60
          };
        });
    } else {
      this.state.session === 60
        ? this.setState(prevState => {
          return { session: prevState.session };
        })
        : this.setState(prevState => {
          return {
            userSetSession: prevState.userSetSession - 60,
            session: this.state.userSetSession - 60
          };
        });
    }

  }

  handleControlClick(e) {
    if (e.currentTarget.id === "start_stop") {
      this.setState(prevState => {
        return {
          sessionTimerRunning: !prevState.sessionTimerRunning,
          timerPaused: !prevState.timerPaused
        }
      })
      if (this.state.sessionType === "session") {
        this.state.sessionTimerRunning
          ? this.pauseTimer()
          : this.startTimer("session");
      } else {
        this.state.sessionTimerRunning
          ? this.pauseTimer()
          : this.startTimer("break");
      }
    } else if (e.currentTarget.id === "reset") {
      clearInterval(this.state.intervalId)
      this.beepSound.pause()
      this.beepSound.currentTime = 0;
      this.setState(prevState => {
        return {
          break: 300,
          userSetBreak: 300,
          session: 1500,
          userSetSession: 1500,
          sessionTimerRunning: false,
          timerPaused: true,
          intervalId: "",
          sessionType: "session"
        }
      })
    }
  }

  countDown = (timerType) => {
    timerType === "session"
      ? this.setState({ session: this.state.session - 1 })
      : this.setState({ break: this.state.break - 1 })
  }

  runTimer(timerType) {
    let sType = timerType === "session" ? "session" : "break"
    if (timerType === "session") {
      this.setState({
        sessionType: sType,
        sessionTimerRunning: true,
        timerPaused: false,
        break: this.state.userSetBreak
      })
      if (this.state.session < 0) {
        clearInterval(this.state.intervalId);
        this.setState({
          session: this.state.userSetSession,
          intervalId: "",
          sessionTimerRunning: false,
          timerPaused: true,
          sessionType: "break"
        })
        this.beepSound.play()
        this.startTimer("break")
      }

    } else if (timerType === "break") {
      this.setState({
        sessionType: sType,
        sessionTimerRunning: true,
        timerPaused: false,
        session: this.state.userSetSession
      })
      if (this.state.break < 0) {
        clearInterval(this.state.intervalId);
        this.setState({
          break: this.state.userSetBreak,
          intervalId: "",
          sessionTimerRunning: false,
          timerPaused: true,
          sessionType: "session"
        })
        this.beepSound.play()
        this.startTimer("session")
      }
    }
  }

  startTimer(t) {
    var countdown = this.state.session;
    let intervalId = setInterval(() => {
      this.countDown(t)
      this.runTimer(t)
    }, 1000)
    this.setState({
      intervalId: intervalId
    })
  }

  pauseTimer() {
    this.setState(prevState => {
      return {
        sessionTimerRunning: false,
        timerPaused: true
      }
    })
    clearInterval(this.state.intervalId)
  }

  render() {
    return (
      <div id="wrapper">
        <section className="container-social">
          <div className="text-right">
            <ul className="social-list">
              <li>
                <a href="https://www.linkedin.com/in/sonyacooley/" title="linkedin" target="blank"><i
                  className="fa fa-linkedin"></i></a>
              </li>
              <li>
                <a href="https://github.com/Sonnerz" title="github" target="blank"><i className="fa fa-github-square"></i></a>
              </li>
              <li>
                <a href="https://www.freecodecamp.org/sonnerz" title="free code camp" target="blank"><i
                  className="fa fa-free-code-camp"></i></a>
              </li>
              <li>
                <a href="https://sonnerz.github.io" title="portfolio" target="blank"><i class="fa fa-briefcase" aria-hidden="true"></i></a>
              </li>
            </ul>
          </div>
        </section>
        <h1>Pomodoro Clock</h1>
        <div id="app-container">
          <div className="length-controls">
            <div id="break-component">
              <ControlMinutes
                onIncrement={this.handleIncrementClick}
                onDecrement={this.handleDecrementClick}
                session={this.state.userSetBreak}
                type={"break"}
                sessionRunning={this.state.sessionTimerRunning}
                sessionType={this.state.sessionType} />
            </div>
            <div id="session-component">
              <ControlMinutes
                onIncrement={this.handleIncrementClick}
                onDecrement={this.handleDecrementClick}
                session={this.state.userSetSession}
                type={"session"}
                sessionRunning={this.state.sessionTimerRunning}
                sessionType={this.state.sessionType} />
            </div>
          </div>

          <div id="timer-component">
            <div id="timer-clock">
              <Timer
                userSession={this.state.session}
                userBreak={this.state.break}
                sessionType={this.state.sessionType}
              />
            </div>
            <div id="timer-label">
              {this.state.sessionType === "session" ? "Session" : "Break"}
            </div>
          </div>
          <div id="controls-component">
            <Controls
              onControlClick={this.handleControlClick}
              paused={this.state.timerPaused}
              sessionType={this.state.sessionType} />
          </div>
          <audio id="beep" preload="auto"
            src="https://goo.gl/65cBl1"
            ref={(audio) => { this.beepSound = audio; }} />


        </div>
      </div>
    );
  }
}

export default App;
