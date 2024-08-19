import { cyan, green, red, yellow } from 'kolorist';
import { Front } from './front';
import { ProjectType } from './interface';

export const Project: ProjectType[] = [
  {
    name: 'Front(前端)',
    value: 'front',
    color: cyan,
    framework: Front,
  },
  {
    name: 'Back(后端)',
    value: 'back',
    color: yellow,
    disabled: true,
  },
  {
    name: 'Serverless',
    value: 'serverless',
    color: green,
    disabled: true,
  },
  {
    name: 'Package(包)',
    value: 'package',
    color: red,
    disabled: true,
  },
];
