d3.select("body").insert("h1", "svg").text("Hello, D3!");

let numbers = [];

function update(data) {
  d3.select("svg")
    .selectAll("circle")
    .data(numbers, (d) => d)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", (d, i) => (i + 1) * 50)
          .attr("cy", 50)
          .transition()
          .duration(500)
          .attr("r", (d, i) => d * 5),
      (update) =>
        update
          .transition()
          .duration(100)
          .attr("cx", (d, i) => (i + 1) * 50),
      (exit) => exit.transition().duration(500).attr("r", 0).remove()
    );
}

function getRandomNumber() {
  return 1 + Math.random() * 4;
}

// Attaching the functions
d3.select("#append").on("click", () => {
  numbers.push(getRandomNumber());
  update(numbers);
});
d3.select("#prepend").on("click", () => {
  numbers.unshift(getRandomNumber());
  update(numbers);
});
d3.select("#drop").on("click", () => {
  numbers.pop();
  update(numbers);
});
