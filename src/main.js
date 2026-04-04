import App from "./App.js";

const mount = () => {
  document.getElementById("content").appendChild(App());
};

mount();
