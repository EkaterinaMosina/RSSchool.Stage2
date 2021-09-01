import { WORDS } from '../word/repository';
import { CARDS } from './repository';
import { Cards, RenameData } from './types';

export const getCards = (): Promise<Cards> => {
  return Promise.resolve(CARDS);
};

export const deleteCategory = (name: string): Promise<Cards> => {
  if (name in CARDS) {
    const deletedCat =  {
      name: CARDS[name],
    };
    delete CARDS[name];
    return Promise.resolve(deletedCat);
  } 
  return Promise.reject( new Error('Category not found'));
     
};

export const createCategory = (catName: string): Promise<Cards> => {
  
  if (catName === '') {
    return Promise.reject();
  } 
  WORDS[catName] = [];
       
  const categoryData = {
    image: 'https://res.cloudinary.com/dbtxfipaw/image/upload/v1626087008/ypfafyhuygnxuwt0cdo0.jpg',
    words: WORDS[catName],
  };     
  const newCategory = {
    catName: categoryData,
  };
  CARDS[catName] = categoryData;     

  return Promise.resolve(newCategory);
   

};

export const renameCategory = ( { oldName, newName }: RenameData): Promise<Cards> => {
    
  if (oldName in CARDS) {
    const wordsData = WORDS[oldName];
    WORDS[newName] = wordsData;
    
    const categoryData = {
      ...CARDS[oldName],
      words: wordsData,
    };

    CARDS[newName] = categoryData;
    delete WORDS[oldName];
    delete CARDS[oldName];

    const updatedCategory = {
      name: categoryData,
    };
    return Promise.resolve(updatedCategory);

  } 
  return Promise.reject(new Error(`Category with name ${oldName} does not exist`));
    
};

export const addImage = (name: string, path: string) => {
  if (name in CARDS) {
    const catData = CARDS[name];
    CARDS[name] = {
      ...catData,
      image: path,
    };

    const updatedCategory = {
      [name]: {
        ...catData,
        image: path,
      },
    };
    return Promise.resolve(updatedCategory);

  } 
  return Promise.reject(new Error(`Category with name ${name} does not exist`));
    
};