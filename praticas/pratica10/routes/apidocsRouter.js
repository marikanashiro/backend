const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const router = express.Router();

const file = fs.readFileSync('./swagger.yaml', 'utf8');

const SwaggerDocument = YAML.parse(file);

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(SwaggerDocument));

module.exports = router;