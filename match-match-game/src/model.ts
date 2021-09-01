export default class Model {
  db!: IDBDatabase;

  dbReq!: IDBOpenDBRequest;

  constructor() {
    this.openDB();
  }

  openDB() {
    this.dbReq = indexedDB.open('EkaterinaMosina', 1);
    this.dbReq.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest)?.result;
      this.db.createObjectStore('users', { autoIncrement: true });
    };
    this.dbReq.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest)?.result;
    };
    this.dbReq.onerror = () => {
      throw new Error('Error at the DB opening');
    };
  }

  addUserToDB(
    objectStore: string,
    userIco: string | null,
    firstName: string,
    lastName: string,
    email: string,
    score: number,
  ) {
    if (this.db) {
      const transaction = this.db.transaction(objectStore, 'readwrite');
      const store = transaction.objectStore(objectStore);
      const user = {
        userIco,
        firstName,
        lastName,
        email,
        score,
      };
      store.add(user);
      transaction.onerror = () => {
        throw new Error(`Error at the ${objectStore} user adding`);
      };
    }
  }
  
  getUsersFromDB(objectStore: string) {
    return new Promise((resolve) => {
      const transaction = this.db.transaction(objectStore, 'readonly');
      const store = transaction.objectStore(objectStore);
      const allUsers = store.getAll();
      allUsers.onsuccess = () => {
        const { result } = allUsers;
        resolve(result);
      };
      allUsers.onerror = () => {
        throw new Error(`Error at the ${objectStore} allUsersInfo getting`);
      };
    });
  }
}
