class SqliteClientExtension {
    // save databases as a list of handles
    databases = {};

    async iterateRecursivelyToFindSqliteFiles(handle) {
        const sqliteFiles = [];
        for await (let [name, handle] of handle) {
            if (handle.kind === 'file' && (handle.name('.sqlite') || handle.name('.sqlite3'))) { // todo, do a much better job at identifying sqlite files.
                sqliteFiles.push(handle);
            } else {
                sqliteFiles.push(...await this.iterateRecursively(handle));
            }
        }
        return sqliteFiles;
    }

    async refreshDatabases() {
        const opfsRoot = await navigator.storage.getDirectory();
        const databaseFiles =  await this.iterateRecursivelyToFindSqliteFiles(opfsRoot);

        let databasesHtmlList = "";
        for (let databaseFile of databaseFiles) {
            this.databases[databaseFile.name] = {
                fileHandle: databaseFile,
                name: databaseFile.name,
            };

            databasesHtmlList += `<option>${databaseFile.name}</option>`;
        }

        document.getElementById("databases-list").innerHTML = databasesHtmlList;
    }

    async init() {
        // Setup the bindings
        // document.getElementById("refresh-databases").addEventListener("click", async () => {
        //     await this.refreshDatabases();
        // });

        await this.refreshDatabases();
    }
}

const sqliteClientExtension = new SqliteClientExtension();
sqliteClientExtension.init().then(() => {

});


