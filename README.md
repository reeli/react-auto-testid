## Start

配置 babel preset:

```json
{
  "presets": ["react-auto-testid/babel-preset"]
}
```

## 使用

1. 在 Page Level 定义 `testid-root`，为了方便管理，通常一个 Page 定义一个 `testid-root` 就足够了

2. `data-testid` 是自动生成的，只用于 e2e 测试。由于在代码里不会直观的体现出来，因此在做单元测试时，最好只用 `role`、 `name` 等来做选择器。
