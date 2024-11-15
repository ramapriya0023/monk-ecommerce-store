const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5004;

app.use(cors());
app.use(express.json());

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

    if (!response.data) {
      throw new Error("Received null response from the API");
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error in API call:", error.message);
    res
      .status(500)
      .json({
        error:
          error.message || "An error occurred while processing the request",
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
