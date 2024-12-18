import { Hono } from "hono";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";

export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
  Variables: {
    userId: string;
  };
}>();
BlogRouter.use("/*", async (c, next) => {
  // get the header

  try {
    const header = (await c.req.header("Authorization")) || "";
    // verify the header
    const response = await verify(header, c.env.JWT_TOKEN);
    //   console.log(response);

    if (!response) {
      return c.json({
        error: "signIn please",
      });
    }
    // @ts-ignore
    c.set("userId", response.id);
    await next();
  } catch (error) {
    return c.json({
      message: "you are not logged In ",
    });
  }
});

BlogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const Blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: Blog.id,
    });
  } catch (error) {
    console.log(error);

    return c.json({
      // @ts-ignore
      error: error.message,
    });
  }
});
BlogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const UpdatedBlog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    if (!UpdatedBlog) {
      return c.json({
        error: "Blog not found",
      });
    }
    return c.json({
      id: UpdatedBlog.id,
    });
  } catch (error) {
    return c.json({
      // @ts-ignore
      error: error.message,
    });
  }
});
// also added pagination
BlogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author: {
          //@ts-ignore
          select: {
            firstName: true,
          },
        },
      },
    });
    return c.json({
      posts,
    });
  } catch (error) {
    return c.json({
      // @ts-ignore
      error: error.message,
    });
  }
});

BlogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = await c.req.param("id");
    console.log(id);

    const posts = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            firstName: true,
          },
        },
      },
    });
    return c.json({
      posts,
    });
  } catch (error) {
    return c.json({
      // @ts-ignore
      error: error.message,
    });
  }
});
