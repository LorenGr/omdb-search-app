
# Raketech Challenge - Movie Search App

## Overview
The "Raketech Challenge" is a movie search application built as part of a test  for a Senior Frontend Developer role. The application uses React and Ant Design to provide a user-friendly interface for searching movies using the OMDB API. It incorporates LocalStorage to cache search results, reducing the need for repeated API calls.

Key Features:
- Search for movies by title, type, and year.
- Display search results in a responsive card layout.
- Caching of search results in LocalStorage.
- Comprehensive unit tests for React components.

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm (usually comes with Node.js)

### Installation
To get started with the project, first clone the repository and install the dependencies:
```bash
git clone https://github.com/LorenGr/omdb-search-app
cd raketech-challenge
npm install
```

### Running the Application
To run the application in development mode:
```bash
npm start
```
This will start the development server, and the application will be available at `http://localhost:3000`.

### Building the Application
To build the application for production, run:
```bash
npm run build
```
This will create a `build` directory with the production-ready static files.

## Testing
The application includes unit tests for the React components. To run the tests, use:
```bash
npm test
```

## Technologies Used
- React.js for building the user interface.
- Ant Design for UI components and styling.
- Jest and React Testing Library for unit testing.

## Author
- Loren Grixti
