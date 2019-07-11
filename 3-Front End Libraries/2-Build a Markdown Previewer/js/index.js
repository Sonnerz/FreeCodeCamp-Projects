//https://marked.js.org/#/README.md#usage

//Stateless component to render Editor
const Editor = props => {
  return (
    React.createElement("div", { className: "component-div" },
    React.createElement("div", { className: "component-title" }, "Editor"),
    React.createElement("textarea", {
      id: "editor",
      value: props.text,
      onChange: props.onChange,
      type: "text" })));



};

//Stateless component to render Preview
const Preview = props => {
  return (
    React.createElement("div", { className: "component-div" },
    React.createElement("div", { className: "component-title" }, "Preview"),
    React.createElement("div", {
      id: "preview",
      dangerouslySetInnerHTML: { __html: marked(props.text, { breaks: true, sanitize: true }) } })));



};

//Stateless component to render Header
const Header = props => {
  return React.createElement("div", { className: "page-title" }, "Markdown Editor");
};

//Stateless component to render Header
const Footer = props => {
  return React.createElement("div", { className: "footer" }, "Markdown Editor \xA9 2019");
};

//Stateless component to render Header
const Tools = props => {
  return (
    React.createElement("div", { className: "toolbar" },
    React.createElement("div", { className: "button-container" },
    React.createElement("button", { onClick: props.onClick, value: "### heading 1 text \n", className: "btn btn-secondary" }, "h1"),


    React.createElement("button", { onClick: props.onClick, value: "### heading 2 text \n", className: "btn btn-secondary" }, "h2"),


    React.createElement("button", { onClick: props.onClick, value: "### heading 3 text \n", className: "btn btn-secondary" }, "h3"),


    React.createElement("button", { onClick: props.onClick, value: "**Bold Text** \n", className: "btn btn-secondary" }, "Bold"),


    React.createElement("button", { onClick: props.onClick, value: "_Italic Text_ \n", className: "btn btn-secondary" }, "Italic"),


    React.createElement("button", { onClick: props.onClick, value: "> \tQuotation text \n", className: "btn btn-secondary" }, "Quote"),


    React.createElement("button", { onClick: props.onClick, value: "* List item \n", className: "btn btn-secondary" }, "List item"),


    React.createElement("button", { onClick: props.onClick, value: " * List item \n", className: "btn btn-secondary" }, "Sub Item"),


    React.createElement("button", { onClick: props.onClick, value: "1. List item \n", className: "btn btn-secondary" }, "Ordered List item"),


    React.createElement("button", { onClick: props.onClick, value: "[GitHub](http://github.com) \n", className: "btn btn-secondary" }, "Link"),


    React.createElement("button", { onClick: props.onClick, value: "![Google Logo](https://www.google.ie/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) \n", className: "btn btn-secondary" }, "Image"))));





};

//Stateful Class component to render App - Editor and Preview
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: defaultText,
      tool: "" };

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerChange(e) {
    this.setState({
      text: e.target.value });

  }

  handlerClick(e) {
    e.preventDefault();
    this.setState({
      text: this.state.text + e.target.value });

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement(Header, null),
      React.createElement(Tools, { onClick: this.handlerClick }),
      React.createElement("div", { id: "app-container" },
      React.createElement(Editor, { text: this.state.text, onChange: this.handlerChange }),
      React.createElement(Preview, { text: this.state.text })),

      React.createElement(Footer, null)));


  }}


const defaultText = `
# This is a h1 \n\

## This is a h2 \n
[I'm an inline-style link](https://www.google.com) \n\ 
* This is a list item \n\

**This is bold text** \n\

> This is for a quotation.\n\


I can add inline code like this:  \`<p></p>\`

\`\`\`javascript
// multiline code block can be added using 3 back ticks
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\` \n\
This is how to add an image:   ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1") \n\
`;

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));