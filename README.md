## TypeScript
----
Basic Setup:
```
tsc --init
```
Add:
```json
"outDir": "dist",
"sourceMap": true
  ```

```
<!-- lite server -->
npm start
<!-- watch mode -->
tsc -w
```
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

#### Union Types
e.g.
```javascript
function add(input: number | string){
  console.log(input);
}
```
#### Literal Types
- exact value e.g. const number = 1.3;
(convert to number? `+variableName or ParseFloat(variableName)`)

#### Type Aliases/Custom Types

`npm i --save-dev typescript webpack webpack-cli webpack-dev-server ts-loader`
