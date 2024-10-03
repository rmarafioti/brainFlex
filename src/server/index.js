/*require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { createServer: createViteServer } = require("vite");

const PORT = process.env.PORT ?? 3000;

/**
 * The app has to be created in a separate async function
 * since we need to wait for the Vite server to be created
 */
/*const createApp = async () => {
  const app = express();

  // Logging middleware
  app.use(morgan("dev"));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use("/api", require("./api"));

  // Serve static HTML in production & Vite dev server in development
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../../dist/")));

    // Redirect all non-API routes to the index HTML file
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
    });
  } else {
    // Pulled from https://vitejs.dev/config/server-options.html#server-middlewaremode
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });

    app.use(vite.middlewares);
  }

  // Simple error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).send(err.message ?? "Internal server error.");
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
};

createApp();*/

require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const createApp = async () => {
  const app = express();

  // Logging middleware
  app.use(morgan("dev"));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use("/api", require("./api"));

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    // Serve static files from the 'dist' directory
    app.use(express.static(path.join(__dirname, "../dist")));

    // Redirect all non-API routes to the React app's index.html
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    });
  } else {
    // In development mode, use Vite as middleware
    const { createServer: createViteServer } = require("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

createApp();
