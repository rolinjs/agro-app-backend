import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://agro-app-frontend-lac.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API FUNCIONANDO CORRECTAMENTE'
    });
});

app.use('/api', indexRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})