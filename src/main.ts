import plugin = require("tailwindcss/plugin");
import { Config, CSSRuleObject, PluginCreator, PluginsConfig } from "tailwindcss/types/config";

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

function themePlugin<T>(tokens: T, tokenSplitter: (tokens: T) => [ITheme, Partial<Config>]=tokenSplit){
// function themePlugin(tokens: ITokens, tokenSplitter:(tokens: ITokens)=>[ITheme, Partial<Config>] = tokenSplit) {
  const [cssVariable, themeExtend] = tokenSplitter(tokens)

  // TODO: get config
  return plugin(function ({addVariant, addUtilities, config}) {
    addVariant('light', [ '.light &' ]);
    addUtilities(cssVariable)
  }, themeExtend);
}

export default themePlugin;
