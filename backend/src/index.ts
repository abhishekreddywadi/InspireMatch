import { Hono } from "hono";
import { UserRouter } from "./routes/userRoute";
import { BlogRouter } from "./routes/blogRouter";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();
app.use("/*", cors());

// /c is a object that consist of both req ans res
app.route("/api/v1/user", UserRouter);
app.route("/api/v1/blog", BlogRouter);

export default app;
