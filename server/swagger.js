const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description of my API",
  },
  host: "192.168.2.232:8000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"]; // Path to the file(s) containing your endpoints

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index"); // Your app's entry point
});
