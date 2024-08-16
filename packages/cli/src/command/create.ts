import fs from 'fs';
import path from 'path';
import url from 'url';
import { CreateInteractive } from '../interactive';
import { ProgressBar } from '../utils';

export const create = async (name: string | undefined) => {
  const createFlow = new CreateInteractive(name);
  const projectConfig = await createFlow.execute();
  console.log();
  const progress = new ProgressBar(5);
  const cwd = process.cwd();

  const { projectName, framework, variant, dependencies } = projectConfig;

  // 项目根目录
  const root = path.join(cwd, projectName);

  // 创建项目根目录
  fs.mkdirSync(root);
  progress.completeTask();

  // 获取选择的模板
  const template = variant || framework;

  // 获取模板目录
  const templateDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../templates', `${template}`);
  progress.completeTask();

  // 读取模板目录下的文件
  const files = fs.readdirSync(templateDir);

  // 重命名gitignore文件
  const renameFiles: Record<string, string | undefined> = {
    _gitignore: '.gitignore',
  };

  // 复制文件夹
  const copyDir = (srcDir: string, destDir: string) => {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file);
      const destFile = path.resolve(destDir, file);
      copy(srcFile, destFile);
    }
  };

  // 复制文件
  const copy = (src: string, dest: string) => {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  // 写入文件
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file);
  }
  progress.completeTask();
  // 读取 package.json
  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));

  // 替换项目名称
  pkg.name = projectName;

  // 添加依赖
  pkg.dependencies = dependencies?.reduce((acc, cur) => {
    return {
      ...acc,
      ...{
        [cur]: 'latest',
      },
    };
  }, pkg.dependencies);
  progress.completeTask();
  // 6.写入 package.json
  write('package.json', JSON.stringify(pkg, null, 2) + '\n');

  progress.completeTask();
  console.log(`\nDone. Now run:\n`);

  const cdProjectName = path.relative(cwd, root);

  if (root !== cwd) {
    console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
  }
  console.log(`  npm install`);
  console.log(`  npm run dev`);
};
