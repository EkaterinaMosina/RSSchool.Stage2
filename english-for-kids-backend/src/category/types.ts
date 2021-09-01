export interface Cards {
  [key: string]: CategoryData;
}
  
export interface CategoryData {
  image: string,
  words: Card[]
}

export interface Card {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface RenameData {
  oldName: string;
  newName: string
}