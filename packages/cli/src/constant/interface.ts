import { Separator } from '@inquirer/prompts';

export type Choice = Separator | Dependency;

export interface Dependency {
  type: 'dependency';
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  other?: string[];
}

export interface Variant {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  dependencies?: Choice[];
}

export interface Framework {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  variant?: Variant[];
}

export interface ProjectType {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  framework?: Framework[];
}
