import path from "path"
import swaggerJSDoc from "swagger-jsdoc"

const routesPath = path.join(process.cwd(), "src/routes/**.{js,ts}")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BEST SHOP",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [routesPath],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerSpec }
