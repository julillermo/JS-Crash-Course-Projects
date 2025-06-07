# JS-Crash-Course-Projects
My attempt to go over the Pong and D3 Projects discussed in the JavaScript Crash Course book. Besides the use of **TypeScript**, **ESBuild**, and the **Deno runtime** for [the project visualizing the results from the github search API](./Project_3_Data_Visualization/15_Visualizing_Search_From_Github_API/), this repo has minimal deviations from the book's discussion.

This repository contains a series simple projects described in the book:
1. [Pong (using HTML \<canvas\>)](./Project_1_Game/10_Pong/)
2. Introduction to D3:
    1. [introductory concepts](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/intro/)
    2. [data & animation](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/data/)
    3. [Live text input bar graph visualization](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/barGraph/)
3. [Visualizing github search API](./Project_3_Data_Visualization/15_Visualizing_Search_From_Github_API/)



# Project 1: [Pong](./Project_1_Game/10_Pong/)

## Details
- This project involves create a base HTML file containing an empty `<canvas>` element from which the JavaScript logic can insert game logic into.
- I decided not complete with my follow through of this part of the book. I believe I was already able to obtain a general idea of the logic and workflow involved for using the HTML `<canvas>` tag to create a web-based game in JavaScript.
- The succeeding chapter of the book would have refactored this project using an **object-oriented** programming style instead of the **function-driven** example found here.

## How to run
- **Option 1** : 
  - As long as the `game.html` file correctly points to the `game.js` file, opening `game.html` via an internet browser should run the game.

- **Option 2** : 
  - In VSCode you can use the an extension like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), and it will handle serving the HTML through a localhost (default is `localhost:5500/`) for you. Activiting this extension usually opens up a new tab in yur default browser, otherwise you can diretly key in `localhost:5500/` in any of your web browsers. 
  - This is what I used while following along with the book.



# Project 2: Introduction to D3

## 2.1 [Introductory concepts](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/intro/):
### Details
- Basic introduction to HTML `<svg>` concepts such as but not limited to a combination of the following:
  - text
  - fill for colors
  - basic shapes
  - grouping
  - defining custom paths
  - interativity with CSS
### How to run
- Following along with the above ["How to run" instructions of Project 1: Pong](#project-1-pong) also works here.

## 2.2 [Data & animation](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/data/):
### Details
- Continuation of the basic id ideas above with the addition of the following:
    - chain-linking functions in d3
    - animation using `transition()`
    - handling lists in d3
### How to run
- Following along with the above ["How to run" instructions of Project 1: Pong](#project-1-pong) also works here.

## 2.3 [Live text input bar graph visualization](./Project_3_Data_Visualization/14_Introducing_the_D3_Library/barGraph/):
### Details
- Continuation of the basic id ideas above with the addition of the following:
    - Createing axes for plots in d3
    - Scaling
    - D3 `enter`, `update`, and `exit` "events"
### How to run
- Following along with the above ["How to run" instructions of Project 1: Pong](#project-1-pong) also works here.


# Project 3: [Visualizing github search API](./Project_3_Data_Visualization/15_Visualizing_Search_From_Github_API/)
- This project is meant to be an interactive bar graph of popular Github projects using a sepcific query ("TypeScript" in this case). This project covers:
  - Calling an API and using the response as input data for D3.
  - Creating a more complete and interactive bar graph with annotations
  - Color coding data using built-in d3 color schemes. 
- **Variations I added not found in the book**:
  - Writing the project in TypeScript instead of the book's JavaScript sample code.
  - Using the [Deno runtime environment](https://deno.land/) for the following purposes and use-cases:
    - project setup and management
    - built-in typescript support
    - installation and handling of the d3 npm package and it's types.
    - installation of the ESBuild package
    - running a server to server the `index.html`
  - Using [ESBuild](https://esbuild.github.io/) to transpile TypeScript to JavaScript and Bundling the D3 package into a single `.js` file referenced by the `index.html` file.
- As with the [Pong project](#project-1-pong), I decided to not complete with my follow through of this part of the book, as I believe that I already attained the general idea it's trying to achieve.

## How to run
1. Install the [Deno runtime environment](https://deno.land/)
2. Navigate to the `Project_3_Data_Visualization/15_Visualizing_Search_From_Github_API` folder in your shell and run `deno task dev`.
    1. You may also optionally run `deno install` before this, but the `deno task dev` command should automatically generate the `node_modules` as defined by the project configuration in `deno.jsonc`
3. Enter `localhost:1236` into a web browser.