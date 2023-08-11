# Tailwind Dark Theme

 tailwind CSS Plugin 帮助构建暗黑模式

---

### 安装

---
install the plugin from npm:

```shell
npm install @andrew_xie/dark-theme
```

### 使用方法

---

```javascript
import themePlugin from '@andrew_xie/tailwind-dark-theme';

// 获取你自己的design tokens
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
 * @description define your own tokenSplit that return
 * cssVariable like{ ".dark": {"--font-color": "#FFF", ...}}
 * themeExtend line {theme: {extend: { ... }}}
 */
function tokenSplit(tokens) {
  // ...
}

module.exports = {
  darkMode: 'class',
  plugins: [
    themePlugin(tokens, tokenSplit || DEFAULT),
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

  //  mount cssVariable at root and curent theme
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

### 配置

---
建设中
