
import { createTreeViewActions, createTreeViewReducer, createTreeViewSelectors } from '../../state-factories/tree-view';
import { createNodeModel } from '../../models';

export const fileSystemSelectors = createTreeViewSelectors('fileSystem', createNodeModel);
export const fileSystemActions = createTreeViewActions('fileSystem', fileSystemSelectors);
export const fileSystemReducer = createTreeViewReducer('fileSystem');
