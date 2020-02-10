### Learning Notes
----
#### Core Types
*(lowercase)*
- string
- number (integer + floats)
- boolean (true + false only)

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
- Enum: https://www.typescriptlang.org/docs/handbook/enums.html
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
```javascript
type MyType = {
  id: number,
  name: string
}

type AnotherType = number | string;
```

#### Function Types - params & return type
- `void` for no return; `never` will never return anything!
- callback functions can return something, even if the argument on which they're passed does NOT expect a returned value!

```javascript
let myAdd = function(x: number, y: number): number { return x + y; };
```
Optional params:
```javascript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
}
```
#### unknown and never
```javascript
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
```javascript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

#### Classes
- classes = blueprints for JS objects
- shorthand initialisation using access modifiers in constructor
- readonly properties: must be initialised at their declaration or in the constructor

```javascript
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
___

- **private**:class only; **public**: everywhere; **protected**: in class and in those inheriting from it
- **getters and setters**: `get()`, `set(value)` (get with no set = readonly!)
- **static** methods (directly on the class, not on an instance)
- **abstract** classes = not to be instantiated, only extended
- **singletons** - one only e.g. for global state?

#### Interfaces
- TypeScript feature - not compiled/instantiated!
- describe objects (or function types) but can't store/ describe arbitrary types e.g. union types.

> One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project
(from docs https://www.typescriptlang.org/docs/handbook/interfaces.html)
- optional properties (can also add readonly)

```javascript
interface SquareConfig {
    color?: string;
    width?: number;
}
```
- can also have function type interfaces
- a class `implements` an interface = a contract
- an interface can `extend` another interface

#### Advanced Types
* **Intersection Types** - && (e.g. w interfaces)
* **Type Guards** re: interfaces = `if ( blah instanceof MyClass ) {}`
  >The right side of the `instanceof` needs to be a constructor function, and TypeScript will narrow down to: - the type of the function’s prototype property if its type is not any; - the union of types returned by that type’s construct signatures, in that order.
* **Discriminated Unions**:
  Types that have a common, singleton type property — the discriminant.
  * A type alias that takes the union of those types — the union.
  * Type guards on the common property. (eg. via switch statement)

 - **Type Casting** e.g. 'as HTMLElement'
 - **Index Properties** - esp for flexible shapes/Interfaces where you don't know the property name or the property count, but you do know they're all strings!
 ```javascript
 interface Errors {
   [prop: string]: string
 }
 ```
 - **Function Overloads** - e.g. multiple ways of calling fn w different params (write the function above w/o curly braces but with specific types => so you can predict return type)
 - **Optional Chaining** - e.g. `let x = foo?.bar.baz();`
 - **Nullish Coalescing** - e.g. `let x = foo ?? bar();`


#### Generics
- for flexibility: take the type that's passed in
- https://www.typescriptlang.org/docs/handbook/generics.html
```javascript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```
#### Decorators
- annotations & meta-programming syntax for class declarations and members
- experimental feature
`tsconfig.json`

```
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

> A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

- decorator factories?
> If we want to customise how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

```javascript
function color(value: string) { // this is the decorator factory
    return function (target) { // this is the decorator
        // do something with 'target' and 'value'...
    }
}
```
- https://www.typescriptlang.org/docs/handbook/decorators.html
#### Useful resources:

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
> repo of extra Types for 3rd party libraries etc, declaration files = `.d.ts`

[class-validator](https://github.com/typestack/class-validator)
> Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.

[class-transformer](https://github.com/typestack/class-transformer)
> Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors

#### React & TypeScript
- from the ground up: https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

- with CRA - https://create-react-app.dev/docs/adding-typescript/
`yarn create react-app my-app --template typescript`

#### NodeJS & TypeScript
```
npm init
tsc --init // add target: "es2018", module: "commonjs", moduleResolution: "node", outDir: "./dist", rootDir: "/src"
npm i --save express body-parser  
npm i --save-dev nodemon
mkdir src
cd src
touch app.ts
npm i --save-dev @types/node
npm i --save-dev @types/express
tsc -w
node app.js
```
Can use imports rather than require
e.g.
```javascript
import express, { Request, Response, NextFunction} from 'express';
```
