# Create-espeo-app CLI

### Installation

```bash
$ npm i -g create-espeo-app-cli
```

```bash
$ yarn add @espeo/create-espeo-app-cli --global
```

## Available commands

### Initialize new project

```
espeo init <folderName>
```

_or via alias_

```
espeo i <folderName>
```

This command will create a clean copy of [Create-espeo-app boilerplate](https://github.com/espeo/espeo-create-react-app) in `folderName` folder and install all NPM dependencies using Yarn or NPM (depending on the choices made during initialization). Also, depending on the choices made, Cypress configuration and dependencies may be added or not.

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
- store- create folder with selected name and with action, reducer and selector files (also specs) and update `root-store.ts` file in project directory (providing it's in the upper directory tree)
  ```
  espeo g store exampleStore
  ```
