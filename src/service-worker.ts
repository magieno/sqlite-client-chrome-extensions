import {SqliteClient} from '@magieno/sqlite-client';

const sqliteWorkerPath = "third_party/sqlite-client-worker.js"; // Must correspond to the path in your final deployed build.
const filename = "/test.sqlite3"; // This is the name of your database. It corresponds to the path in the OPFS.


const bootstrap = async () => {
  const sqliteClient = new SqliteClient({
    // @ts-ignore
    type: "OPFS_WORKER",
    filename,
    sqliteWorkerPath,
    flags: "c", // See sqlite documentation for which flags to use
  })


  const response = await sqliteClient.executeSql(".tables")

  console.log(response);
}


bootstrap();