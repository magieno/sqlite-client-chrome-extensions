import {ListAllFilesMessage} from '../messages/list-all-files.message';
import {ListAllFilesResultMessage} from '../messages/list-all-files-result.message';
import {OpfsManager} from '../managers/opfs.manager';

export class ListAllFilesMessageProcessor {
  private readonly opfsManager = new OpfsManager();

  async process(listAllFiles: ListAllFilesMessage): Promise<ListAllFilesResultMessage> {
    const root = await navigator.storage.getDirectory();
    const files = await this.opfsManager.listAllFiles(root, root);

    const probableSqliteFiles = files.filter(filePathParts =>{
      return filePathParts[filePathParts.length - 1].endsWith(".sqlite") || filePathParts[filePathParts.length - 1].endsWith(".sqlite3")
    });

    return new ListAllFilesResultMessage(listAllFiles.uniqueId, probableSqliteFiles, files);
  }
}