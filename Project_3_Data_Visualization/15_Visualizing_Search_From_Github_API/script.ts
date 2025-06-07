import * as d3 from "d3";

function getURL() {
  const baseURL = "https://api.github.com/search/repositories";
  const params = {
    q: "language: TypeScript stars:>10000",
    per_page: 20,
    sort: "stars",
  };
  // From what I understand, object properties inherently don't have an order to them.
  // There should be an internal setting to adjust this for Object.entries()
  const queryString = Object.entries(params)
    .map((pair) => {
      return `${pair[0]}=${encodeURIComponent(pair[1])}`;
    })
    .join("&");

  return `${baseURL}?${queryString}`;
}

const width = 1280;
const height = 720;

const svg = d3
  .select("body")
  .insert("svg", "#sidebar")
  .attr("width", width)
  .attr("height", height);

const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 100,
};

const bottomContainer = svg
  .append("g")
  .attr("id", "bottom")
  .attr("transform", `translate(0,${height - margin.bottom})`);

const leftContainer = svg
  .append("g")
  .attr("id", "left")
  .attr("transform", `translate(${margin.left}, 0)`);

const url = getURL();

function getD3MaxStartgazersCount(items: GithubSearchResponseItem[]) {
  const d3Max = d3.max(items, (d) => d.stargazers_count);
  return d3Max !== undefined ? d3Max : 0;
}

function getLicense(d: GithubSearchResponseItem) {
  const license = d.license?.name;
  if (!license) {
    return "No License";
  } else {
    return license;
  }
}

function update(items: GithubSearchResponseItem[]) {
  const licenses = new Set(items.map((d) => getLicense(d)));
  const colorScale = d3
    .scaleOrdinal()
    .domain(licenses)
    .range(d3.schemeCategory10);

  const xScale = d3
    .scaleBand()
    .domain(items.map((d) => d.full_name))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const yScaleDomain = [0, getD3MaxStartgazersCount(items)];
  const yScale = d3
    .scaleLinear()
    .domain(yScaleDomain)
    .range([height - margin.bottom, margin.top])
    .nice();

  const bottomAxis = d3.axisBottom(xScale).tickValues([]);
  const leftAxis = d3.axisLeft(yScale).tickFormat(d3.format("~s"));

  bottomContainer.call(bottomAxis);
  leftContainer.call(leftAxis);

  svg
    .selectAll("rect")
    .data(items, (item) => (item as GithubSearchResponseItem).full_name)
    .join("rect")
    .attr("x", (d): number => {
      const xScaleValue = xScale(d.full_name);
      return xScaleValue != undefined ? xScaleValue : 0;
    })
    .attr("y", (d): number => yScale(d.stargazers_count))
    .attr("fill", (d): string => {
      const colorScaleValue = colorScale(getLicense(d));
      return colorScaleValue != undefined ? (colorScaleValue as string) : "";
    })
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.stargazers_count))
    .on("mouseover", (_e, d) => {
      const info = d3.select("#info");
      info.select(".repo .value a").text(d.full_name).attr("href", d.xhtml_url);
      info.select(".license .value").text(getLicense(d));
      info.select(".stars .value").text(d.stargazers_count);
    });

  d3.select("#key")
    .selectAll("p")
    .data(licenses)
    .join((enter) => {
      const p = enter.append("p");
      p.append("div")
        .attr("class", "color")
        .style("background-color", (d) => colorScale(d) as string);
      p.append("span").text((d) => d);
      return p;
    });
}

d3.json(url).then((data) => {
  console.log("Github search API result", data);
  if (data != undefined && Object.keys(data).includes("items")) {
    const typeAnnotatedData = data as GithubSearchResponse;
    update(typeAnnotatedData.items);
  }
});
