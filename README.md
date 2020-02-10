## TypeScript: https://www.typescriptlang.org/
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
