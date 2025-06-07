const width = 600;
const height = 600;

// Creating the SVG using D3 in JavaScript
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let margin = { top: 20, right: 50, bottom: 20, left: 50 };

// Top axis container
let topContainer = svg
  .append("g")
  .attr("id", "top")
  .attr("transform", `translate(0, ${margin.top})`); // applying margin

// Top axis container
let leftContainer = svg
  .append("g")
  .attr("id", "left")
  .attr("transform", `translate(${margin.left}, 0)`); // applying margin

// Regex classifier
function getClass(char) {
  if (/^[a-z]$/.test(char)) {
    return "lower";
  } else if (/^[A-Z]$/.test(char)) {
    return "upper";
  } else if (/^[0-9]$/.test(char)) {
    return "number";
  } else {
    return "other";
  }
}

// Drawing the bar graph
function update(data) {
  let xScaleFn = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([margin.left, width - margin.right])
    .nice(); // add thisz
  let yScaleFn = d3
    .scaleBand()
    .domain(data.map((d) => d.char))
    .range([margin.top, height - margin.bottom])
    .padding(0.5);

  let topAxisTicks = xScaleFn.ticks().filter((tick) => Number.isInteger(tick));

  // I think this also determines the tick values
  // Note that d3.axisTop(xScaleFn) and d3.axisLeft(yScaleFn) are functions
  d3.axisTop(xScaleFn).tickValues(topAxisTicks).tickFormat(d3.format("d"))(
    topContainer.transition()
  );
  d3.axisLeft(yScaleFn)(leftContainer.transition());

  svg
    .selectAll("rect")
    .data(data, (d) => d.char)
    // .join("rect")
    // .attr("width", (d, i) => xScaleFn(d.count) - xScaleFn(0))
    // .attr("height", yScaleFn.bandwidth())
    // .attr("x", xScaleFn(0))
    // .attr("y", (d, i) => yScaleFn(d.char))
    // .attr("class", (d, i) => getClass(d.char));
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", xScaleFn(0))
          .attr("y", (d, i) => yScaleFn(d.char))
          .attr("class", (d) => getClass(d.char))
          .transition()
          .attr("width", (d) => xScaleFn(d.count) - xScaleFn(0))
          .attr("height", yScaleFn.bandwidth()),
      (update) =>
        update
          .transition()
          .attr("width", (d) => xScaleFn(d.count) - xScaleFn(0))
          .attr("height", yScaleFn.bandwidth())
          .attr("y", (d, i) => yScaleFn(d.char)),
      (exit) => exit.transition().attr("width", 0).attr("height", 0).remove()
    );
}

function standardizeSpace(char) {
  if (char.trim() === " ") {
    return "<space>";
  } else {
    return char;
  }
}

// Counting the number of occurences of each character
d3.select("textarea").on("input", (e) => {
  let frequencies = {};

  // In its current state, the code below isn't allowed in
  //  in TypeScript without specifying types
  e.target.value.split("").forEach((char) => {
    let standardized = standardizeSpace(char);
    let currentCount = frequencies[standardized] || 0;
    frequencies[standardized] = currentCount + 1;
  });

  let data = Object.entries(frequencies)
    .map((pair) => {
      return { char: pair[0], count: pair[1] };
    })
    .sort((a, b) => d3.ascending(a.char, b.char));

  // console.log(data);
  update(data);
});
