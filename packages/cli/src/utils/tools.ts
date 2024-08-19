import { execSync } from 'child_process';

export const getNpmLatestVersion = (packageName: string) => {
  try {
    const version = execSync(`npm view ${packageName} version`).toString().trim();
    return version;
  } catch (error) {
    return 'latest';
  }
};
