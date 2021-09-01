import express from 'express';
import cors from 'cors';

import categories from './category/router';
import words from './word/router';
import admin from './admin/router';

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categories);
app.use('/api/words', words);
app.use('/api/admin', admin);

app.listen(port, ()=> console.log(`Server has been started on port ${port}...`));

