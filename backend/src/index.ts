import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ========================USER========================

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const login = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (login === null) {
      res.status(400).json("Not Found Email Isus!");
      return;
    }
    if (data.password !== login.password) {
      res.status(400).json("Wrong Password Isus!");
      return;
    }
    const token = jwt.sign(
        { userId: login.id },
        process.env.JWT_SECRET!
    )
    res.json({token: token, user: login});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const data = req.body;
    const users = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

// ========================BOARD========================

app.get("/boards", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.get("/boards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const board = await prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        lists: {
          include: {
            cards: true,
          },
        },
      },
    });
    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.post("/boards",verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const boards = await prisma.board.create({
      data: {
        title: data.title,
        creatorId: data.creatorId,
      },
    });
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.delete("/boards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const boards = await prisma.board.delete({
      where: {
        id: id,
      },
    });
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.put("/boards/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const boards = await prisma.board.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
      },
    });
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

// ========================LISTS========================

app.get("/lists", async (req, res) => {
  try {
    const lists = await prisma.list.findMany();
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.post("/lists", async (req, res) => {
  try {
    const data = req.body;
    const lists = await prisma.list.create({
      data: {
        name: data.name,
        boardId: data.boardId,
      },
    });
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.delete("/lists/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lists = await prisma.list.delete({
      where: {
        id: id,
      },
    });
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.put("/lists/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const lists = await prisma.list.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        boardId: data.boardId,
      },
    });
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

// ========================CARDS========================

app.get("/cards", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.post("/cards", async (req, res) => {
  try {
    const data = req.body;
    const cards = await prisma.card.create({
      data: {
        title: data.title,
        description: data.description,
        listId: data.listId,
      },
    });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.delete("/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cards = await prisma.card.delete({
      where: {
        id: id,
      },
    });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.put("/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const cards = await prisma.card.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
        listId: data.listId,
      },
    });
    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Server!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
