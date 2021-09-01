import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { cloudinary } from '../cloudinary';
import { addAudio, addImage, createWord, deleteWord, updateWord } from '.';

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'tmp'),
  filename(req, file, cb){
    cb(null, `${file.fieldname  }-${ Date.now()  }${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.delete('/:name', async (req, res) => {
  const word = req.params.name;    
  try {
    const deletedWord = await deleteWord(word);
    return res.json(deletedWord);
        
  } catch (e) {
    return res.status(404).send(e);
  }
});


router.post('/upload-img/:name', upload.single('myImage'), async function (req, res) {
  const word = req.params.name;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const updatedWord = await addImage(word, result.secure_url);
      return res.json(updatedWord);
    } catch (e) {
      res.status(404).send(e);
    }
    fs.unlink(req.file.path);
  }

});

router.post('/upload-audio/:name', upload.single('myAudio'), async function (req, res) {
  const word = req.params.name;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
      });
      const updatedWord = await addAudio(word, result.secure_url);
      return res.json(updatedWord);
    } catch (e) {
      res.status(404).send(e);
    }
    fs.unlink(req.file.path);
        
  }

});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const newWord = await createWord(data);
    return res.json(newWord);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put('/:name', async (req, res) => {
  const oldWord = req.params.name;
  const data = req.body;
  try {
    const newWord = await updateWord(oldWord, data);
    return res.json(newWord);
  } catch (e) {
    return res.status(400).send(e);
  }

});


export default router;