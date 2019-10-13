function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //component for one drum pad
class Drumpad extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown, false);
  }
  handleKeydown() {
    //if the key pressed is the same as the drum pad key value in the id
    let letter = event.key.toUpperCase();
    if (letter === this.props.letter) {
      this.handlePlay();
    }
  }
  handlePlay() {
    const audio = document.getElementById(this.props.letter);
    audio.volume = this.props.volumeLevel;
    audio.play();
    // update the display div with drum pad div id
    this.props.displayName(this.props.name);
  }
  render() {
    return (
      React.createElement("div", { className: "drum-pad", id: this.props.name, onClick: this.handlePlay },
      React.createElement("audio", {
        id: this.props.letter,
        className: "clip",
        src: this.props.url }),

      this.props.letter));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { className: "pad-bank" },

      this.props.clipData.map((pad) =>
      React.createElement(Drumpad, {
        ind: pad.index,
        letter: pad.key,
        name: pad.name,
        url: pad.url,
        displayName: this.props.displayName,
        volumeLevel: this.props.volumeLevel }))));




  }}


class VolumeControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput() {
    const slider = document.getElementById("vol-slider");
    this.props.setVol(slider.value);
  }
  render() {
    return (
      React.createElement("div", { id: "volume" },
      React.createElement("label", { for: "volume" }, "Volume"),
      React.createElement("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.01",
        value: this.props.volumeLevel,
        class: "slider",
        id: "vol-slider",
        onInput: this.handleInput })));



  }}


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleSetDisplay",








    name => {
      this.setState({
        displayText: name });

    });this.state = { displayText: " ", clipData: audioData, volume: 0.3 };this.handleSetDisplay = this.handleSetDisplay.bind(this);this.handleVolume = this.handleVolume.bind(this);}
  handleVolume(vol) {
    this.setState({
      volume: vol,
      displayText: "Volume " + Math.floor(vol * 100) });

  }
  render() {
    return (
      React.createElement("div", { id: "wrapper" },
      React.createElement("h1", null, React.createElement("i", { class: "fas fa-drum" }), " Drum Machine"),
      React.createElement("div", { id: "app-container" },
      React.createElement("div", { id: "drum-machine" },
      React.createElement(PadBank, {
        clipData: this.state.clipData,
        displayName: this.handleSetDisplay,
        volumeLevel: this.state.volume })),


      React.createElement("div", { id: "controls" },
      React.createElement("div", { id: "display" }, this.state.displayText),
      React.createElement(VolumeControl, {
        volumeLevel: this.state.volume,
        setVol: this.handleVolume })))));





  }}


const audioData = [
{
  index: 0,
  key: "Q",
  name: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  index: 1,
  key: "W",
  name: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  index: 2,
  key: "E",
  name: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  index: 3,
  key: "A",
  name: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  index: 4,
  key: "S",
  name: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  index: 5,
  key: "D",
  name: "Open HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  index: 6,
  key: "Z",
  name: "Kick n Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  index: 7,
  key: "X",
  name: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  index: 8,
  key: "C",
  name: "Closed HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("app"));