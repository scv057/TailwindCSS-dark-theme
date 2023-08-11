import themePlugin, { tokenSplit } from './main';
import { describe, expect, test } from "@jest/globals";

const tokens = {
  "light-font-color": "black",
  "light-background-color": "white",
  "light-shine-color": "black",
  "light-shine-color-rgb": "0, 0, 0",
  "light-lamp-color": "black",
  "light-link-color": "#4e1e86",
  "light-primary-color": "#bd93f9",
  "light-secondary-color": "#9547b7",
  "light-background-color-1": "white",
  "light-background-color-2": "#bd93f917",
  "dark-font-color": "white",
  "dark-background-color": "#0e0027",
  "dark-shine-color": "#5fb0f7",
  "dark-shine-color-rgb": "95, 176, 247",
  "dark-lamp-color": "white",
  "dark-link-color": "#7651ff",
  "dark-primary-color": "#bd93f9",
  "dark-secondary-color": "#9547b7",
  "dark-background-color-1": "white",
  "dark-background-color-2": "#bd93f917",
};

const lightVariable = {
  "--font-color": "black",
  "--background-color": "white",
  "--shine-color": "black",
  "--shine-color-rgb": "0, 0, 0",
  "--lamp-color": "black",
  "--link-color": "#4e1e86",
  "--primary-color": "#bd93f9",
  "--secondary-color": "#9547b7",
  "--background-color-1": "white",
  "--background-color-2": "#bd93f917",
};

const darkVariable = {
  "--font-color": "white",
  "--background-color": "#0e0027",
  "--shine-color": "#5fb0f7",
  "--shine-color-rgb": "95, 176, 247",
  "--lamp-color": "white",
  "--link-color": "#7651ff",
  "--primary-color": "#bd93f9",
  "--secondary-color": "#9547b7",
  "--background-color-1": "white",
  "--background-color-2": "#bd93f917",
};

const tc = {
  font : "var(--font-color)",
  background : "var(--background-color)",
  shine : "var(--shine-color)",
  "shine-rgb" : "var(--shine-color-rgb)",
  lamp : "var(--lamp-color)",
  link : "var(--link-color)",
  primary : "var(--primary-color)",
  secondary : "var(--secondary-color)",
  "background-1" : "var(--background-color-1)",
  "background-2" : "var(--background-color-2)",
}

const tcc = {
  theme: {
    extend: {
      colors: tc
    }
  }
}

const cv = {".light": lightVariable, ".dark": darkVariable};

describe("text", ()=>{
  test("test1", ()=>{
    expect(tokenSplit(tokens)[0]).toEqual(cv);
  })
  test("test2", ()=>{
    expect(tokenSplit(tokens)[1]).toEqual(tcc);
  })
})