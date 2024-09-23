import express from 'express';
import router from './router/routes';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/images', express.static('./src/uploads'));

app.listen(3000, () => console.log('Servidor na porta 3000'));
