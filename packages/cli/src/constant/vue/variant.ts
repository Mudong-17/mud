import { cyan } from 'kolorist';
import { Variant } from '../interface';
import { dependencies } from './dependencies';

export const variant: Variant[] = [
  {
    name: 'Vue+TSX',
    value: 'vue-tsx',
    color: cyan,
    dependencies,
  },
];
