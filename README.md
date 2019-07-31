# Create-espeo-app CLI

## Available commands

### Initialize new project

```
espeo init <folderName>
```

_or via alias_

```
espeo i <folderName>
```

This command will create a clean copy of [Create-espeo-app boilerplate](https://bitbucket.org/espeoeu/create-espeo-app/) in `folderName` folder and install all NPM dependencies using Yarn.

### Generate new files

```
espeo generate <type> <name>

```

_or via alias_

```
espeo g <type> <name>
```

Examples:

- class component
  ```
  espeo g component exampleComponent
  ```
- functional component
  ```
  espeo g component exampleComponent -f
  ```
- container
  ```
  espeo g container exampleContainer
  ```
- reducer
  ```
  espeo g reducer exampleReducer
  ```
- action
  ```
  espeo g action exampleAction
  ```
- store- create folder with selected name and with action, reducer and selector files and update `root-store.ts` file in project directory (providing it's in the upper directory tree)
  ```
  espeo g store exampleStore
  ```
