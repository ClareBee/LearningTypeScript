## TypeScript
----
### Learning Notes

#### Core Types
*(lowercase)*
- string
- number (integer + floats)
- boolean (true + false only)

Type Assignment
Type Inference (when previously declared)

- object
e.g.
```javascript
const offer: {
  name: string,
  tags: string[]
} = {
  name: 'Bonanza',
  tags: ['bargain', 'deal']
}
```
- Array (e.g. `any[]`, `string[]`)
- Tuple (fixed-length array)
- Enum
https://www.typescriptlang.org/docs/handbook/enums.html
- any
