import express from 'express';
import router from './router/routes';
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:' + PORT, // Substituir "localhost" pelo endereço IP da máquina que está executando a API
    credentials: true,
}));
app.use(router);
app.use('/images', express.static('./src/uploads'));

app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
