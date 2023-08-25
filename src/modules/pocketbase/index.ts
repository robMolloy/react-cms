import PB from "pocketbase";

const functionThatIsNeverCalled = () => new PB("");

type TDb = ReturnType<typeof functionThatIsNeverCalled>;
export let db: TDb | undefined;

/**
 * uses a singleton pattern to return a pocketbase db instance if one already exists else it creates a pocketbase db
 */
export const createPocketBaseDb = () => {
  if (!!db) return db;

  const useWindow = false;
  const dbHref = useWindow
    ? window.location.href.split(":").slice(0, 2).join(":") + ":8090/"
    : `http://127.0.0.1:8090`;

  db = new PB(dbHref);
  return db;
};

const db1 = createPocketBaseDb();
db1.collection("strings").getList();
