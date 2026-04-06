import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";
import App from "./App.js";

function CurrentApp(props) {
  return React.createElement(CurrentApp.__impl, props);
}
CurrentApp.__impl = App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(CurrentApp));

window.hotModules["/src/App.js"] = {
  fileChanged() {
    import(`/src/App.js?t=${Date.now()}`).then((newMod) => {
      const updated = newMod.default?.default || newMod.default;
      if (typeof updated !== "function") return;
      CurrentApp.__impl = updated;
      root.render(React.createElement(CurrentApp));
    });
  },
};
