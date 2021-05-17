import express from 'express';
import cors from 'cors';
import path from 'path';
import { PostController as postController } from './controller/posts.controller.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({limit: '20mb', extended: true}));
app.use(express.json({limit: '20mb'}));

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/index.html`));
});

// Endpunkte definieren
app.post("/posts", postController.create); // C
app.get("/posts", postController.readAll); // R (all)
app.get("/posts/:postId", postController.readOne); // R (one)
app.put("/posts/:postId", postController.update); // U
app.delete("/posts/:postId", postController.delete); // D

app.listen(port, () => console.log(`Server listening on port ${port} ...`));
