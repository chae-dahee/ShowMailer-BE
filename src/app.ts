const fs = require("fs");
const path = require("path");
const express = require("express");

// swagger setting
const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger/swagger-output.json");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const eventRouter = require("./routes/EventRoutes");
const likeRouter = require("./routes/LikeRoutes");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const options = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css",
};
const spec = JSON.parse(
  // fs.readFileSync(path.join(__dirname, "../petstore-api.json"), "utf8")
  fs.readFileSync(path.join(__dirname, "./swagger/swagger-output.json"), "utf8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec, options));

app.use("/events", eventRouter);
app.use("/likes", likeRouter);

// 기본 라우트
app.get("/", (req: any, res: any) => {
  res.send("Welcome to the Express server!");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
