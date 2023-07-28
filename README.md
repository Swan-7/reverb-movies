# React + Vite

# Movie Application - How to Run

The Movie Application is a web-based application that allows users to explore trending movies and view movie details. Follow the instructions below to run the application on your local machine.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js: To check if Node.js is installed, run `node -v` in your terminal. If not installed, download and install Node.js from the official website (https://nodejs.org/).

## Installation

1. Clone the repository: 

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd movie-application
```

3. Install dependencies:

```bash
npm install
```


## Running the Application

To start the application, run the following command:

```bash
npm start
```

This will launch the development server, and the Movie Application will be accessible at `http://localhost:3000` in your web browser.

## Usage

- **Home Page**: The home page displays trending movies and allows you to click on a movie to view its details.
- **Movie Details**: When you click on a movie from the home page, you will be directed to the movie details page, where you can see more information about the selected movie.

## Troubleshooting

If you encounter any issues during the installation or running of the application, please check the following:

- Ensure you have the correct API key from TMDB and set it in the `/src/api/movieApiKey` file.
- Check your internet connection to ensure the application can access the TMDB API.
- If any errors occur during installation or running, refer to the error messages in the terminal for troubleshooting.

## Conclusion

Congratulations! You have successfully set up and run the Movie Application. You can now explore trending movies, view movie details, and get personalized recommendations based on your selected genres. Enjoy the movie browsing experience!

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
