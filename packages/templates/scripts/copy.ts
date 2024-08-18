import fs from 'fs-extra';
import path from 'path';
import url from 'url';

interface CopyOptions {
  sourceDir: string;
  targetDir: string;
}

const copyWithRename = async ({ sourceDir, targetDir }: CopyOptions) => {
  try {
    // 检查目标目录是否存在，不存在则创建
    if (!fs.existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    // 读取源目录下的所有文件夹
    const directories = await fs.readdir(sourceDir);

    // 遍历每个文件夹
    for (const directory of directories) {
      const sourcePath = path.join(sourceDir, directory);
      const targetPath = path.join(targetDir, directory);

      // 递归复制文件夹
      await fs.copy(sourcePath, targetPath, {
        overwrite: true,
        filter: (src) => {
          return (
            !src.endsWith('.gitignore') &&
            !path.basename(src).startsWith('node_modules') &&
            !['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'].includes(path.basename(src))
          );
        },
      });

      // 处理 .gitignore 文件的重命名
      const gitignorePath = path.join(sourcePath, '.gitignore');
      // 在目标文件夹中创建新的 .gitignore 文件
      const newGitignorePath = path.join(targetPath, '_gitignore');
      // 如果源文件夹中存在 .gitignore，则复制内容到新的 .gitignore
      if (await fs.existsSync(gitignorePath)) {
        await fs.copyFile(gitignorePath, newGitignorePath);
      } else {
        // 如果源文件夹中不存在 .gitignore，则创建空文件
        await fs.writeFile(newGitignorePath, '');
      }
    }
  } catch (error) {
    console.error('复制文件失败:', error);
  }
};

// 配置源目录和目标目录
const sourceDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../src');
const targetDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../../cli/templates');

// 执行复制操作
copyWithRename({ sourceDir, targetDir });
