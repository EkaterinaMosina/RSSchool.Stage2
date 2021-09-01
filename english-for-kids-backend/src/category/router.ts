import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { addImage, createCategory, deleteCategory, getCards, renameCategory } from './index';
import { RenameData } from './types';
import { cloudinary } from '../cloudinary';

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'tmp'),
  filename(req, file, cb){
    cb(null, `${file.fieldname  }-${ Date.now()  }${path.extname(file.originalname)}`);
  },
});

router.get('/', async (req, res) => {
  const cards = await getCards();
  return res.json(cards);
});

router.delete('/:name', async (req, res) => {
  const categoryName = req.params.name;
  const name = categoryName.split('-').join(' ');
  try {
    const deletedCat = await deleteCategory(name);
    return res.json(deletedCat);
        
  } catch (e) {
    return res.status(404).send(e);
  }
});

export const upload = multer({ storage });

router.post('/upload/:name', upload.single('myImage'), async function (req, res) {
  const catName = req.params.name;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const updatedCat = await addImage(catName, result.secure_url);
      return res.json(updatedCat);
    } catch (e) {
      res.status(404).send(e);
    }
    fs.unlink(req.file.path);  
  }

});

router.post('/:name', async (req, res) => {
  const catName = req.params.name;
  try {
    const newCategory = await createCategory(catName);
    return res.json(newCategory);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put('/', async (req, res) => {
  const data = req.body as RenameData;
  try {
    const createdCategory = await renameCategory(data);
    return res.json(createdCategory);

  } catch (e) {
    return res.status(400).send(e);
  }
});


export default router;