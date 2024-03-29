# Ideaboard in ReactJS
Author: Abdush Shakoor

A simple idea board written in ReactJS for fun.

Got any questions? Contact me via [email](mailto:abdushshakoor1992@hotmail.com)!

## Hierarchy
This tree can be used as a reference to understand the hierarchy of the components in the application.

- App
    * IdeaBoard
        - EditableIdea
            + IdeaForm
            + Idea
        - ToggleableIdeaForm
            + IdeaForm

## Tech used
- React JS: UI Components and Application
- Faker.js: Populate the database with fake data
- json-server: Mock REST API server
- SASS: Modular CSS

### Useful instructions

#### Install the NPM packages
```bash
npm install
```

### Install json-server
```bash
npm install -g json-server
```

#### To start the React app + mock REST API server
Make sure to execute each command in a separate command-line interface.
```bash
json-server src/ideas.js --port 3001
npm start
```

## Logs
- Made use of conditional rendering
- Add, edit and delete ideas
- onFocus event is fired when an idea is created
- Saves changes when onBlur event is fired
- Implemented a custom hook to reuse Fetch API
- Display a character count
- Used json-server to mock REST API server
- Implemented localStorage for data persistence