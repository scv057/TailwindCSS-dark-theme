# Tailwind 暗黑模式

一个tailwind插件帮助你快速构建你自己的暗黑模式。其背后的技术其实非常简单，把你的design token转化为css变量，每对颜色css变量名一样，然后将其分别挂载在不同的类下面。

---

### 安装

install the plugin from npm:

```shell
npm i @andrew_xie/tailwind-dark-theme
```
---

### 文档

[doc_zh](https://github.com/scv057/TailwindCSS-dark-theme/blob/main/doc/README_zh.md)

---

### 使用说明

```javascript
import themePlugin from '@andrew_xie/tailwind-dark-theme';

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
  return <body class={ `light:light dark:dark ${ theme }` }>
  <div class={ "link" }>
    wrapped in utilities
  </div>
  <div class={ "text-link-color" }>
    directly using
  </div>
  <button onclick={ setTheme('dark') }>theme</button>
  </body>
};
```

### Configuration

---
todo

### End

如果你有任何问题，欢迎开issue来讨论。