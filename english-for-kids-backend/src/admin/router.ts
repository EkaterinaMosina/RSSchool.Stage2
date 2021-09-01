import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from './constants';
import { USERS } from './repository';

const router = Router();

router.post('/', async (req, res) => {
  const { userName, password } = req.body;
  const user = USERS.find(el => (el.userName === userName && el.password === password) );
  if (user) {
    const accessToken = jwt.sign({ username: user.userName,  role: user.userRole }, accessTokenSecret);
    res.json(accessToken);
  } else {
    res.send('Username or password incorrect');
  }
});


export default router;