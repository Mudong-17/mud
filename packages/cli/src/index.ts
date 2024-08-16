import { program } from 'commander';
import { version } from '../package.json';
import { create } from './command';

program.version(version, '-v --version').usage('<command> [options]');

program
  .command('create [projectName]')
  .description('Create a new project(新建一个项目)')
  .action(async (projectName) => {
    create(projectName);
  });

program.parse(process.argv);
