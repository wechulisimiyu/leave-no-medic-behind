const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("POST /buy-tshirt", () => {
  test("should return 200 OK and JSON content", async () => {
    const response = await request(app).post("/buy-tshirt").send({
      size: "M",
      color: "blue",
      quantity: 2,
      name: "John",
      address: "123 Main St.",
      phone: "555-555-5555",
    });
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.success).toBe(true);
  });
});

describe("GET /buy-tshirt", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get("/buy-tshirt");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /vendors", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get("/vendors");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /about", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get("/about");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /faq", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get("/faq");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("POST /vendors", () => {
  test("should return 200 OK and JSON content", async () => {
    const response = await request(app)
      .post("/vendors")
      .field("name", "John Doe")
      .field("email", "johndoe@example.com")
      .field("school", "Example University")
      .attach("schoolIdPic", "tests/test_files/test_image.jpg");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.success).toBe(true);
  });
});

describe("GET /checkout", () => {
  test("should return 200 OK and HTML content", async () => {
    const response = await request(app).get(
      "/checkout?amount=50&phone=555-555-5555"
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("text/html");
  });
});
