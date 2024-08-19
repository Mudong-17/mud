import { Separator } from '@inquirer/prompts';
import { trueColor, yellow } from 'kolorist';
import { Choice } from '../interface';

export const dependencies: Choice[] = [
  new Separator('--- CSS Framework ---'),
  {
    type: 'dependency',
    name: 'Tailwind Css',
    value: 'tailwindcss',
    color: trueColor(14, 165, 233),
  },
  {
    type: 'dependency',
    name: 'UnoCss',
    value: 'unocss',
    color: trueColor(0, 169, 142),
  },
  new Separator('--- UI Framework ---'),
  {
    type: 'dependency',
    name: 'Material UI',
    value: '@mui/material',
    color: trueColor(0, 137, 123),
    other: ['@emotion/react', '@emotion/styled'],
  },
  {
    type: 'dependency',
    name: 'Fluent UI',
    value: '/react-components',
    color: trueColor(0, 120, 215),
  },
  {
    type: 'dependency',
    name: 'Arco Design',
    value: '@arco-design/web-react',
    color: trueColor(22, 93, 255),
  },
  {
    type: 'dependency',
    name: 'Ant Design',
    value: 'antd',
    color: trueColor(24, 119, 255),
  },
  {
    type: 'dependency',
    name: 'T Design',
    value: 'tdesign-react',
    color: trueColor(0, 82, 217),
  },
  new Separator('--- HTTP Clients ---'),
  {
    type: 'dependency',
    name: 'Axios',
    value: 'axios',
    color: yellow,
  },
  {
    type: 'dependency',
    name: 'React Query',
    value: '@tanstack/react-query',
    color: trueColor(234, 145, 15),
  },
  new Separator('--- Store ---'),
  {
    type: 'dependency',
    name: 'Zustand',
    value: 'zustand',
    color: trueColor(28, 22, 223),
  },
];
