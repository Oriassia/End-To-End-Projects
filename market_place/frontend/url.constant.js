const MARKET_BASE_URL = process.env.NODE_ENV === "production" ? "/api/products" : "http://localhost:3000/api/products";

export { MARKET_BASE_URL };
