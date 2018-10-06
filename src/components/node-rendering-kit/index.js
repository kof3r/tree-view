
import { nodeTypes } from '../../constants';

import { Directory } from './Directory';
import { File } from './File';
import { Machine, Drive, Database, Printer } from './Machine';

export const nodeRenderingKit = {
  [nodeTypes.DIRECTORY]: Directory,
  [nodeTypes.FILE]: File,
  [nodeTypes.MACHINE]: Machine,
  [nodeTypes.DRIVE]: Drive,
  [nodeTypes.DATABASE]: Database,
  [nodeTypes.PRINTER]: Printer,
}
