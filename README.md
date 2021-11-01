# React Auto Testid

[![Build Status](https://travis-ci.com/reeli/react-auto-testid.svg?branch=master&status=passed)](https://travis-ci.com/github/reeli/react-auto-testid)
[![codecov](https://codecov.io/gh/reeli/react-auto-testid/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/reeli/react-auto-testid)
[![License](https://img.shields.io/npm/l/react-auto-testid.svg?style=flat-square)](https://npmjs.org/package/react-auto-testid)

React Auto Testid is a babel preset which helps you generate test id for react components automatically.

## Install

1. Use it in babel config:

```json
{
  "presets": ["react-auto-testid/babel-preset"]
}
```

2. Open your terminal and run the following command to generate the config file:

```shell
npx testid
```

## How to use?

1. Define `testid-root` in react element, and then every child below this element will get the key as prefix if the child element contains `role` or `name` attribute.

```tsx
// in your code
<div testid-root={"root"}>
   <div role={"text"}>text</div>
</div>

// after render
<div testid-root={"root"}>
  <div role={"text"} data-testid={"root.text"}>text</div>
</div>
```

## Best Practice

1. Define `testid-root` in page level in order to better maintain. Normally one `testid-root` for one page is enough.
   
2. The `data-testid` is generated automatically, it's better to only use in e2e, because it will not display in code, so it's better to use `role` or `name` as selector in your unit test.
