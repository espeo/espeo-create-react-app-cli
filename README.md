# Create-espeo-app CLI

## Available commands

### Initialize new project

```
es init <folderName>
```

_or via alias_

```
es i <folderName>
```

This command will create a clean copy of [Create-espeo-app boilerplate](https://bitbucket.org/espeoeu/create-espeo-app/) in `folderName` folder and install all NPM dependencies using Yarn.

### Generate new files

```
es generate <type> <name>

```

_or via alias_

```
es g <type> <name>
```

Examples:

- class component
  ```
  es g component exampleComponent
  ```
- functional component
  ```
  es g component exampleComponent -f
  ```
- container
  ```
  es g container exampleContainer
  ```
- reducer
  ```
  es g reducer exampleReducer
  ```
- action
  ```
  es g action exampleAction
  ```
- store- create folder with selected name and with action, reducer and selector files and update `root-store.ts` file in project directory (providing it's in the upper directory tree)
  ```
  es g store exampleStore
  ```
