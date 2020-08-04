module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "camelcase": [1, {"properties": "never"}],
    "space-before-function-paren": 0,
    "indent": ["off", 2],//缩进严格检查取消
    'semi': 0,//取消分号严格检查
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
