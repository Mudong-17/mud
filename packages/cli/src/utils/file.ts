import path from "path";
import { existsSync } from "fs";
/**
 * 获取项目路径
 */
export const getProjectPath = (projectName: string): string => {
  return path.resolve(process.cwd(), projectName);
};

/**
 * 检测文件是否存在，如果存在则退出进程
 * @param filename 文件名
 */
export const checkFileExist = (filename: string) => {
  const file = getProjectPath(filename);

  if (existsSync(file)) {
    return false;
  }
  return true;
};
