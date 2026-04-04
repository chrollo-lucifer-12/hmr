if (import.meta.hot) {
  import.meta.hot.onFileChange((updatedModule) => {
    const updatedChild = updatedModule.default;
    document.getElementById("child").replaceWith(updatedChild());
  });
}

const Child = () => {
  const div = document.createElement("div");
  div.id = "child";
  const p = document.createElement("p");
  p.innerHTML = `Child last  sahil Mounted at time: ${new Date()}`;
  div.appendChild(p);
  return div;
};
export default Child;
