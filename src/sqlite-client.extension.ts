import {InitServiceWorkerMessage} from "./messages/init-service-worker.message";
import {ListAllFilesMessage} from "./messages/list-all-files.message";
import {MessageInterface} from './interfaces/message.interface';
import {ExtensionToInspectedPageProxy} from './proxies/extension-to-inspected-page.proxy';

class SqliteClientExtension {
  private extensionToInspectedPageProxy: ExtensionToInspectedPageProxy

  private selectedDatabase?: string;

  async refreshDatabases() {
    const files = await this.extensionToInspectedPageProxy.getAllFiles();

    const probableSqliteFiles = files.filter(filePathParts =>{
      return filePathParts[filePathParts.length - 1].endsWith(".sqlite") || filePathParts[filePathParts.length - 1].endsWith(".sqlite3")
    });

    let innerHTML = `<optgroup label="SQLite">`;
    innerHTML += probableSqliteFiles.map(filePathParts => {
      const path = filePathParts.join("/");

      return `<option value="${path}">${path}</option>`
    }).join("");
    innerHTML += `</optgroup>`;


    innerHTML += `<optgroup label="All">`;
    innerHTML += files.map(filePathParts => {
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

    console.log(this.selectedDatabase)
  }

  refreshTables() {
    console.log("Refresh Tables")
  }

  init(browser) {
    this.extensionToInspectedPageProxy = new ExtensionToInspectedPageProxy(browser.devtools.inspectedWindow.tabId);

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

    this.refreshDatabases();
  }
}


((browser) => {
  const sqliteClientExtension = new SqliteClientExtension();
  sqliteClientExtension.init(browser);
})(chrome);