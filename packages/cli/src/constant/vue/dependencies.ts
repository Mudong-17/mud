import { Separator } from '@inquirer/prompts';
import { green, trueColor, yellow } from 'kolorist';
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
    name: 'Naive ui',
    value: 'naive-ui',
    color: trueColor(24, 160, 88),
  },
  {
    type: 'dependency',
    name: 'Element Plus',
    value: 'element-plus',
    color: trueColor(64, 158, 255),
  },
  {
    type: 'dependency',
    name: 'Arco Design',
    value: 'arco-design-vue',
    color: trueColor(22, 93, 255),
  },
  {
    type: 'dependency',
    name: 'T Design',
    value: 'tdesign-vue-next',
    color: trueColor(0, 82, 217),
  },
  new Separator('--- HTTP Clients ---'),
  {
    type: 'dependency',
    name: 'Axios',
    value: 'axios',
    color: yellow,
  },
  new Separator('--- Router ---'),
  {
    type: 'dependency',
    name: 'Vue Router',
    value: 'vue-router',
    color: green,
  },
  new Separator('--- Store ---'),
  {
    type: 'dependency',
    name: 'Pinia',
    value: 'pinia',
    color: trueColor(236, 183, 50),
  },
  {
    type: 'dependency',
    name: 'Zustand',
    value: 'zustand-vue',
    color: trueColor(28, 22, 223),
  },
];
