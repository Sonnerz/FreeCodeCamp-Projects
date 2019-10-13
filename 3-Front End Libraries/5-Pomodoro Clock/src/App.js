import React, { Component } from 'react';
import './App.css';
import Break from './components/Break';
import Session from './components/Session';
import Controls from './components/Controls';
import Timer from './components/Timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 60,
      userSetBreak: 60,
      session: 60,
      userSetSession: 60,
      sessionTimerRunning: false,
      timerPaused: true,
      intervalId: "",
      sessionType: "session",
      audioFile: ""
    };
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrementClick = this.handleDecrementClick.bind(this);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.startSessionTimer = this.startSessionTimer.bind(this);
    this.pauseSessionTimer = this.pauseSessionTimer.bind(this);
    this.startBreakTimer = this.startBreakTimer.bind(this);
    this.pauseBreakTimer = this.pauseBreakTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  handleIncrementClick(type) {
    if (type === "break") {
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


  handleDecrementClick(type) {
    if (type === "break") {
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


  handleControlClick(controlButton) {
    if (controlButton === "start_stop") {
      this.setState(prevState => {
        return {
          sessionTimerRunning: !prevState.sessionTimerRunning,
          timerPaused: !prevState.timerPaused
        }
      })
      if (this.state.sessionType === "session") {
        this.state.sessionTimerRunning ? this.pauseSessionTimer() : this.startSessionTimer();
      } else {
        this.state.sessionTimerRunning ? this.pauseBreakTimer() : this.startBreakTimer();
      }

    } else if (controlButton === "reset") {
      clearInterval(this.state.intervalId)
      this.beepSound.pause()
      this.beepSound.currentTime = 0;
      this.setState(prevState => {
        return {
          break: 60,
          userSetBreak: 60,
          session: 60,
          userSetSession: 60,
          sessionTimerRunning: false,
          timerPaused: true,
          intervalId: "",
          sessionType: "session"
        }
      })

    }
  }

  countDown = (timerType) => {
    this.setState({ session: this.state.session - 1 })
    this.setState({ break: this.state.break - 1 })
  }

  runTimer(timerType) {
    let timer = timerType === "session" ? this.state.session : this.state.break
    let sType = timerType === "session" ? "session" : "break"

    if (timerType === "session") {
      this.setState({
        //session: this.state.session,
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
        this.startBreakTimer()
      }

    } else if (timerType === "break") {
      this.setState({
        //break: this.state.break,
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
        this.startSessionTimer()
      }
    }
  }

  startSessionTimer = () => {
    let intervalId = setInterval(() => {
      this.countDown("session")
      this.runTimer("session")
    }, 1000)
    this.setState({
      intervalId: intervalId
    })
  }

  startBreakTimer() {
    let intervalId = setInterval(() => {
      this.countDown("break")
      this.runTimer("break")
    }, 1000)
    this.setState({
      intervalId: intervalId
    })
  }

  pauseSessionTimer() {
    this.setState(prevState => {
      return {
        sessionTimerRunning: false,
        timerPaused: true
      }
    })
    clearInterval(this.state.intervalId)
  }


  pauseBreakTimer() {
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
        <h1><i className="far fa-clock" />Pomodoro Clock</h1>
        <div id="app-container">
          <div id="break-component">
            <Break
              onIncrement={this.handleIncrementClick}
              onDecrement={this.handleDecrementClick}
              break={this.state.userSetBreak}
              type={"break"}
              sessionRunning={this.state.sessionTimerRunning}
              sessionType={this.state.sessionType}
            />
          </div>
          <div id="session-component">
            <Session
              onIncrement={this.handleIncrementClick}
              onDecrement={this.handleDecrementClick}
              session={this.state.userSetSession}
              type={"session"}
              sessionRunning={this.state.sessionTimerRunning}
              sessionType={this.state.sessionType}
            />
          </div>
          <div id="timer-component">
            <div id="timer-label">
              {this.state.sessionType === "session" ? "Session" : "Break"}
            </div>
            <div id="timer-clock">
              <Timer
                userSession={this.state.session}
                userBreak={this.state.break}
                sessionType={this.state.sessionType}
              />
            </div>
          </div>
          <div id="controls-component">
            <Controls
              onControlClick={this.handleControlClick}
              paused={this.state.timerPaused}
              sessionType={this.state.sessionType} />
          </div>
          <div>
            running: {this.state.sessionTimerRunning ? "RUNNING" : "NOT RUNNING"} <br /><br />
            paused: {this.state.timerPaused ? "PAUSED" : "NOT PAUSED"} <br /><br />
            Break: {this.state.break}<br /><br />
            Session:{this.state.session}
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
