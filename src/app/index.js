
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { types as artefactTypes } from '../models/artefact';
import { File, Directory, Machine, Database, Printer, Drive } from '../models';
import { TreeView, DirectoryDisplay, FileDisplay, MachineDisplay, PrinterDisplay, DriveDisplay, DatabaseDisplay } from '../components';

import './App.scss';

const root = new Directory(
  'root',
  [
    new Directory(
      'home',
      [
        new Directory(
          'kof3r',
          [
            new File('kof3r', 'jpg'),
            new File('todos', 'txt'),
            new File('index', 'js'),
          ],
        ),
        new Directory(
          'ljubo',
          [
            new File('ljubo', 'jpg'),
            new File('todos', 'txt'),
            new File('main', 'go'),
            new Directory(
              'remotes',
              [
                new Machine(
                  'centrala',
                  [
                    new Drive('C:', 0.6),
                    new Drive('D:', 0.17),
                    new Database('MSSQL'),
                    new Database('postgresql'),
                  ]
                ),
                new Machine(
                  'blagajna-1',
                  [
                    new Drive('C:', 0.9),
                    new Printer('printer')
                  ]
                ),
                new Machine(
                  'blagajna-2',
                  [
                    new Drive('C:', 0.7),
                    new Printer('printer')
                  ]
                ),
                new Machine(
                  'blagajna-3',
                  [
                    new Drive('C:', 0.4),
                    new Printer('printer')
                  ]
                ),
              ]
            ),
          ],
        ),
        new File('wallpaper', 'jpg'),
        new File('ramblings', 'txt'),
        new File('dump', 'sql'),
      ]
    )
  ]
);

const renderers = {
  [artefactTypes.DIRECTORY]: DirectoryDisplay,
  [artefactTypes.FILE]: FileDisplay,
  [artefactTypes.MACHINE]: MachineDisplay,
  [artefactTypes.DRIVE]: DriveDisplay,
  [artefactTypes.DATABASE]: DatabaseDisplay,
  [artefactTypes.PRINTER]: PrinterDisplay,
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Hello, World!</h1>
        <TreeView entity={root} renderers={renderers}/>
      </div>
    );
  }
}

export default hot(module)(App);
