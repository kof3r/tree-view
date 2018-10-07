
import { createSelector } from 'reselect';
import { parseNodeTree } from '../../parser';

const $fileSystem = state => state.fileSystem;

export const $root = createSelector($fileSystem, fileSystem => parseNodeTree(fileSystem));
