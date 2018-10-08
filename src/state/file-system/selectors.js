
import { createSelector } from 'reselect';
import { modelNodeTree } from '../../parser';

const $fileSystem = state => state.fileSystem;

export const $root = createSelector($fileSystem, fileSystem => modelNodeTree(fileSystem));
