import { openDB } from "idb";

const DB_NAME = "KanbanBoardDB";
const STORE_NAME = "boards";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveBoards = async (boards) => {
  const db = await initDB();
  await db.put(STORE_NAME, { id: "state", boards });
};

export const getBoards = async () => {
  const db = await initDB();
  const data = await db.get(STORE_NAME, "state");
  return data ? data.boards : null;
};
