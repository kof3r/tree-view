
import { File, Directory, Machine, MachineCluster, Database, Printer, Drive } from '../models';

export const someFileSystem = new Directory(
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
            new MachineCluster(
              'aws-cluster',
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
