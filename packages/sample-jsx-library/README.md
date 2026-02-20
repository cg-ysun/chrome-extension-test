# cargurus-sample-library

## Storybook

Storybook can be used via `yarn storybook` 🚀!

## Consuming the test library

The CSS setup in this example library is very basic and a consumer would have to import the CSS output into their app. Here is a crude example of this.

```tsx
// App.jsx
import * as ReactDOM from 'react-dom';
import 'cargurus-sample-library/dist/style.css';

import { Component } from './my-component';

const App = () => {
    ReactDom.createRoot(document.querySelector('#my-app-root'), Component);
};
```
