const Child = () => {
  const div = document.createElement("div");
  div.id = "child";
  const p = document.createElement("p");
  p.innerHTML = `Child last Mounted at time: ${new Date()}`;
  div.appendChild(p);
  return div;
};
export default Child;
