import {MessageInterface} from './interfaces/message.interface';
import {ExtensionToInspectedPageProxy} from './proxies/extension-to-inspected-page.proxy';
import {MessageTypeEnum} from "./enums/message-type.enum";
import {ExecuteSqlQueryMessage} from "./messages/execute-sql-query.message";
import {ExecuteSqlResultMessage} from "@magieno/sqlite-client/dist/esm/messages/execute-sql-result.message";
import {InitResultMessage} from "./messages/init-result.message";

class SqliteClientExtension {
    private extensionToInspectedPageProxy: ExtensionToInspectedPageProxy

    private selectedDatabase?: string;

    private initSuccessful = false;

    private loadingInterval;

    private startedLoading = new Date();

    async refreshDatabases() {
        const response = await this.extensionToInspectedPageProxy.getAllFiles();

        let innerHTML = `<optgroup label="SQLite files">`;
        innerHTML += response.sqliteFiles.map(path => {
            return `<option value="${path}">${path}</option>`
        }).join("");
        innerHTML += `</optgroup>`;


        innerHTML += `<optgroup label="All">`;
        innerHTML += response.files.map(filePathParts => {
            const path = filePathParts.join("/");

            return `<option value="${path}">${path}</option>`
        }).join("");
        innerHTML += `</optgroup>`;

        document.getElementById("databases-list").innerHTML = innerHTML;

        this.onDatabaseSelected();
    }

    onDatabaseSelected() {
        // @ts-ignore
        this.selectedDatabase = document.getElementById("databases-list").value;

        this.refreshTables();
        this.reset();
    }

    async reset() {
        document.getElementById("query-status").innerText = "Execute a query to see the results below.";
        document.getElementById("results-table").innerHTML = "";
    }

    async refreshTables() {
        document.getElementById("tables-list").innerHTML = "Loading...";

        const responseMessage = await this.extensionToInspectedPageProxy.executeSqlQuery(this.selectedDatabase, "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';");

        const tables = responseMessage.response.map(row => row.name);

        let innerHTML = "";

        for (const table of tables) {
            const resp = await this.extensionToInspectedPageProxy.executeSqlQuery(this.selectedDatabase, `PRAGMA table_info(${table});`);

            innerHTML += `<li>${table}<ul class="columns-list">${resp.response.map(row => `<li>${row.name} (${row.type})</li>`).join("")}</ul></li>`;
        }

        document.getElementById("tables-list").innerHTML = innerHTML;
    }

    async executeSqlQuery() {
        const queryStatus = document.getElementById("query-status");
        queryStatus.innerText = "Execution in progress...";
        document.getElementById("results-table").innerHTML = "";

        const editor = ace.edit("sql-editor");

        const responseMessage = await this.extensionToInspectedPageProxy.executeSqlQuery(this.selectedDatabase, editor.getValue());

        let innerHTML = `<thead>`;

        for (const key in responseMessage.response[0]) {
            innerHTML += `<th>${key}</th>`;
        }

        innerHTML += `</tr></thead>`;

        innerHTML += `<tbody>`;
        innerHTML += responseMessage.response.map((row, index) => {
            return `<tr>` + Object.values(row).map(value => `<td>${value}</td>`).join("") + `</tr>`;
        }).join("");
        innerHTML += `</tbody>`;

        document.getElementById("results-table").innerHTML = innerHTML;
        queryStatus.innerText = `No errors. ${responseMessage.response.length} rows affected.`;
    }

    afterSuccessfulInit() {
        clearInterval(this.loadingInterval);
        this.initSuccessful = true;

        document.getElementById("loading").style.display = "none";
        document.getElementById("loading-error").style.display = "none";
        document.getElementById("extension").style.display = "block";

        // Register JS Events
        document.getElementById("refresh-databases").addEventListener("click", async () => {
            await this.refreshDatabases()
        });

        document.getElementById("databases-list").addEventListener("change", () => {
            this.onDatabaseSelected();
        })

        document.getElementById("refresh-tables").addEventListener("click", async () => {
            await this.refreshTables()
        });

        document.getElementById("execute-sql-query").addEventListener("click", async () => {
            await this.executeSqlQuery();
        })

        this.refreshDatabases();
    }

    afterUnsuccessfulInit(error?: string) {
        clearInterval(this.loadingInterval);

        document.getElementById("loading").style.display = "none";
        document.getElementById("loading-error").style.display = "block";
        if(error) {
            document.getElementById("error-text").innerText = error;
        }
    }

    init(browser) {

        this.loadingInterval = setInterval(() => {
            if(this.startedLoading.getTime() + 3000 < new Date().getTime()) {
                //this.afterUnsuccessfulInit()
            }
        }, 300);

        this.extensionToInspectedPageProxy = new ExtensionToInspectedPageProxy(browser.devtools.inspectedWindow.tabId);

        this.extensionToInspectedPageProxy.init().then( (value: InitResultMessage) => {
            console.log(value);
            if(value.error) {
                this.afterUnsuccessfulInit(value.error);
                return;
            }

            this.afterSuccessfulInit();
        }).catch(error => {
            this.afterUnsuccessfulInit()
        })
    }
}


((browser) => {
    const sqliteClientExtension = new SqliteClientExtension();
    document.getElementById("init").addEventListener("click", async () => {
        sqliteClientExtension.init(browser);
    });

})(chrome);