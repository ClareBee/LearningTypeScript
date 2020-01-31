## TypeScript
- checking at compile time, not just runtime!
----
Basic Setup:
```
tsc --init
```
#### tsconfig.json - compilation options e.g. strict
https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
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
```typescript
type MyType = {
  id: number,
  name: string
}

type AnotherType = number | string;
```

#### Function Types - params & return type
- `void` for no return; `never` will never return anything!
-  callback functions can return something, even if the argument on which they're passed does NOT expect a returned value!

```typescript
let myAdd = function(x: number, y: number): number { return x + y; };
```
Optional params:
```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```
#### unknown and never
```typscript
let userInput: unknown;
```

#### Webpack
- bundling/build orchestration tool
- fewer requests => `bundle.js`
- optimisation/build steps also possible
- `web-dev-server` = builds project & automatically reloads on changes

`npm i --save-dev typescript webpack webpack-cli webpack-dev-server ts-loader`

#### ES6
e.g. arrow functions
```typescript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

#### Classes
- classes = blueprints for JS objects
- shorthand initialization using access modifiers in constructor
- readonly properties: must be initialized at their declaration or in the constructor.

```typescript
class Doggo {
    readonly name: string;
    readonly colour: string = brown;
    constructor (theName: string) {
        this.name = theName;
    }
}
let pupper = new Doggo("Spike");
pupper.name = "bob" // error! name is readonly.

```

- private - class only; public - everywhere; protected - in class and in those inheriting from it
- getters and setters: `get()`, `set(value)`` (get with no set = readonly!)
- static methods (directly on the class, not on an instance)
- abstract classes = not to be instantiated, only extended
- singletons - one only e.g. for global state?
```
#### Interfaces
- TypeScript feature - not compiled/instantiated!
- describe objects (or function types) but can't store/ describe arbitrary types e.g. union types.

> One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project
(from docs https://www.typescriptlang.org/docs/handbook/interfaces.html)
- optional properties (can also add readonly)
```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}
```
- can also have function type interfaces
- a class `implements` an interface = a contract
- an interface can `extend` another interface

#### Advanced Types

#### Generics

#### Decorators

#### Useful resources:

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
> repo of extra Types for 3rd party libraries etc, declaration files = `.d.ts`

[class-validator](https://github.com/typestack/class-validator)
>Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.

[class-transformer](https://github.com/typestack/class-transformer)
>Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

#### React & TypeScript
- from the ground up: https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

- with CRA - https://create-react-app.dev/docs/adding-typescript/
`yarn create react-app my-app --template typescript`
