import Child from "./Child.js";
const App = () => {
  const div = document.createElement("div");
  const title = document.createElement("header");
  title.innerHTML = "Intro to HMR";
  const body = document.createElement("section");
  body.appendChild(Child());
  div.appendChild(title);
  div.appendChild(body);
  return div;
};

export default App;
