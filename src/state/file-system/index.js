
import { createTreeViewActions, createTreeViewReducer, createTreeViewSelectors } from '../../state-factories/tree-view';

export const fileSystemSelectors = createTreeViewSelectors('fileSystem');
export const fileSystemActions = createTreeViewActions('fileSystem', fileSystemSelectors);
export const fileSystemReducer = createTreeViewReducer('fileSystem');
