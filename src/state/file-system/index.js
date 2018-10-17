
import { createTreeViewActions, createTreeViewReducer, createTreeViewSelectors } from '../../state-factories/tree-view';

export const fileSystemSelectors = createTreeViewSelectors('fileSystem');
export const fileSystemActions = createTreeViewActions('FILE_SYSTEM', fileSystemSelectors);
export const fileSystemReducer = createTreeViewReducer('FILE_SYSTEM');
