export class OpfsManager {
  async listAllFiles(root: FileSystemDirectoryHandle, directory: FileSystemDirectoryHandle): Promise<string[][]> {
    const files = [];

    // @ts-ignore
    for await (const handle: FileSystemHandle of directory.values()) {
      if(handle.kind === "file") {
          const paths = await root.resolve(handle);

          files.push([...paths]);
      } else {
        files.push(...await this.listAllFiles(root, handle));
      }
    }

    return files;
  }
}