import { Hono } from "hono";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { sigUpInput, sigInInput } from "@abhishekwadi/medium-common";

export const UserRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();

// signup Route////////////////////////////

UserRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  // adding sign up logic
  // getting body
  // Fixed typo
  try {
    const body = await c.req.json();
    const { success } = sigUpInput.safeParse(body);
    if (!success) {
      return c.json({
        error: "Invalid input",
      });
    }
    const User = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });
    console.log(User);

    const token = await sign({ id: User.id }, c.env.JWT_TOKEN);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.log(error);

    return c.json({
      error: "internal server error",
    });
  }
});
// ..................................
// sign in route
//////////////////////////////////////
UserRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { success } = sigInInput.safeParse(body);
    if (!success) {
      return c.json({
        error: "Invalid input",
      });
    }

    const User = await prisma.user.findUnique({
      where: {
        //@ts-ignore
        email: body.email,
        //@ts-ignore
        password: body.password,
      },
    });
    if (!User) {
      return c.json({
        error: "user not found",
      });
    }
    const token = await sign({ id: User.id }, c.env.JWT_TOKEN);
    return c.json({ token });
  } catch (error) {
    console.log(error);

    c.status(500);
    return c.json({
      message: "something went wrong in server",
    });
  }
});
