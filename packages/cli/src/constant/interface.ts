interface Dependencie {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
}

interface Variant {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  dependencies?: Dependencie[];
}

interface Framework {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  variant?: Variant[];
}

interface ProjectType {
  name: string;
  value: string;
  color: (text: string) => string;
  disabled?: boolean;
  framework?: Framework[];
}
