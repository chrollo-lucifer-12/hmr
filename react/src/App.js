import React from "https://esm.sh/react";

export default function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("mounted");

    return () => console.log("cleanup");
  }, []);

  return React.createElement(
    "div",
    null,
    React.createElement("p", null, "Count injf  fasdafiasindfian : " + count),
    React.createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      "Increment",
    ),
  );
}
