import plugin = require("tailwindcss/plugin");
import { Config, CSSRuleObject } from "tailwindcss/types/config";

type ICssVariableKey = `--${ string }-${ string }` | `--${ string }-${ string }-${ string }`;

interface ITheme extends CSSRuleObject{
  '.light': { [key: ICssVariableKey]: string}
  '.dark': { [key: ICssVariableKey]: string}
}

type ITokenKey = `${string}-${string}-${string}`;

interface ITokens {
  [key: ITokenKey]: string
}

export function tokenSplit(tokens: ITokens): [ITheme, Partial<Config>] {
  const cssVariable: ITheme = {'.light': {}, ".dark": {}};
  const themeExtend = {theme: {extend: {colors:{}}}};

  for (let key in tokens) {
    const [ theme, scenes, category, ...padding ] = key.split("-");
    const suffix = padding.length ? `-${ padding.join('-') }` : "";
    cssVariable[`.${ theme }`][`--${ scenes }-${ category }${suffix}`] = tokens[key];
    themeExtend.theme.extend.colors[`${ scenes }${ suffix }`] = `var(--${ scenes }-${ category }${ suffix })`;
  }

  return [cssVariable, themeExtend];
}


/**
 * @param tokens
 * @description syntax highlighting is lost for dynamically generated configurations; you can manually add it.
 */
function genThemeExtend(tokens: ITokens): Partial<Config> {
  const themeExtend = {theme: {extend: {colors: {}}}};
  for (const key in tokens) {
    const [ theme, scenes, category, ...padding ] = key.split("-");
    const suffix = padding.length ? `-${ padding.join('-') }` : "";
    themeExtend.theme.extend.colors[`${ scenes }${ suffix }`] = `var(--${ scenes }-${ category }${ suffix })`;
  }
  return themeExtend;
}

function genCssVariable(tokens: ITokens): ITheme {
  const cssVariable: ITheme = {'.light': {}, ".dark": {}};

  for (let key in tokens) {
    const [ theme, scenes, category, ...padding ] = key.split("-");
    const suffix = padding.length ? `-${ padding.join('-') }` : "";
    cssVariable[`.${ theme }`][`--${ scenes }-${ category }${ suffix }`] = tokens[key];
  }

  return cssVariable
}

export function registerThemeVariant(themeName: string) {
  return function ({addVariant, config}) {
    const darkMode: [ string, string ] | string = config("darkMode");
    let selector: string = "";

    if (darkMode instanceof Array) {
      let s = darkMode[1];
      selector = `:is(${ s.replace(/dark/, themeName) } &)`;
    } else {
      if (darkMode === "class") {
        selector = `:is(.${ themeName } &)`
      } else if (darkMode === "media") {
        selector = `@media (prefers-color-scheme: ${ themeName })`
      }
    }
    addVariant(themeName, [ selector ]);
  }
}

function themePlugin<T>(tokens: T, tokenSplitter: (tokens: T) => [ ITheme, Partial<Config> ] = tokenSplit) {
// function themePlugin(tokens: ITokens, tokenSplitter:(tokens: ITokens)=>[ITheme, Partial<Config>] = tokenSplit) {
  const [ cssVariable, themeExtend ] = tokenSplitter(tokens)

  return plugin(function ({addUtilities}) {
    addUtilities(cssVariable)
  }, themeExtend);
}

export const tools = {genThemeExtend, genCssVariable};
export default themePlugin;
