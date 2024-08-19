import { cyan } from 'kolorist';
import { Variant } from '../interface';
import { dependencies } from './dependencies';

export const variant: Variant[] = [
  {
    name: 'React+TypeScript',
    value: 'react-ts',
    color: cyan,
    dependencies,
  },
];
