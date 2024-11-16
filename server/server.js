const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5004;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});

app.get("/proxy/products/search", async (req, res) => {
  console.log("Request received with query parameters:", req.query);

  try {
    const response = await axios.post(
      "http://stageapi.monkcommerce.app/task/products/search",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "72njgfa948d9aS7gs5",
        },
        params: req.query,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error in API call:", error.message);
    res.status(500).json({
      error: error.message || "An error occurred while processing the request",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
