# Tailwind Dark Theme


A Tailwind CSS plugin designed to assist you in swiftly creating your own dark theme. The underlying technique is 
quite straightforward: convert your tokens into CSS variables and apply them to two classes each paired color has same variable names.

---

### Installation

install the plugin from npm:

```shell
npm i @andrew_xie/tailwind-dark-theme
```
---

### docs

[doc_zh](https://github.com/scv057/TailwindCSS-dark-theme/blob/main/doc/README_zh.md)

---

### Usage

```javascript
import themePlugin, {registerThemeVariant} from '@andrew_xie/tailwind-dark-theme';

// your own design tokens
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

/**
 * @param tokens: Object
 * @return [cssVariable, themeExtend]
 * @description convert your token to valid CSSrule Object and tailwind theme config object
 */
function tokenSplit(tokens) {
  // ...
}

// add yourown theme variant and use it like `dark:`
registerThemeVariant('light');

module.exports = {
  darkMode: 'class',
  plugins: [
    themePlugin(tokens, tokenSplit || "DEFAULT"),
  ],
}
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
    .link {
        color: var(--link-color);
    }
}
```

in HTML

```tsx

const Demo = () => {
  const [ theme, setTheme ] = useState('light');

  //  add tailwind class name
  return <body class={ `${ theme }` }>
  <div class={ "link" }>
    wrapped in utilities
  </div>
  <div class={ "text-link-color" }>
    directly using
  </div>
  <div class={"light:text-red"}>
    you may want use theme-variant to control style in some situations, you can add your own theme-variant  
  </div>
  <button onclick={ setTheme('dark') }>theme</button>
  </body>
};
```

### Configuration

---
 todo

### End

If you have any questions feel, free to open an issue.