import { checkbox, input, select } from '@inquirer/prompts';
import { Project } from '../constant';
import { checkFileExist } from '../utils';

interface ProjectConfig {
  projectName: string;
  projectType: string;
  framework?: string;
  variant?: string;
  dependencies: string[];
}

export class CreateInteractive {
  private config: ProjectConfig = {
    projectName: '',
    projectType: '',
    dependencies: [],
  };

  constructor(projectName: string | undefined) {
    if (projectName) this.config.projectName = projectName;
  }

  private async inputProjectName() {
    return await input({
      message: 'Project name(项目名称):',
      default: 'my-project',
      validate: (input: string) => {
        if (!checkFileExist(input)) {
          return 'The project already exists, please re-enter the project name(项目已存在，请重新输入项目名称)';
        }
        return true;
      },
    });
  }

  private async selectProjectType() {
    return await select({
      message: 'Select a projectType(请选择项目类型):',
      choices: Project.filter((item) => !item.disabled).map((type) => ({
        name: type.color(type.name),
        value: type,
      })),
    });
  }

  private async selectFramework(framework: Framework[] | undefined) {
    if (!framework) return null;
    return await select({
      message: 'Select a framework(请选择框架):',
      choices: framework
        .filter((item) => !item.disabled)
        .map((type) => ({
          name: type.color(type.name),
          value: type,
        })),
    });
  }

  private async selectVariant(variant: Variant[] | undefined) {
    if (!variant) return null;
    return await select({
      message: 'Select a variant(请选择变体):',
      choices: variant
        .filter((item) => !item.disabled)
        .map((type) => ({
          name: type.color(type.name),
          value: type,
        })),
    });
  }

  private async selectDependencies(dependencies: Dependencie[] | undefined) {
    if (!dependencies) return null;
    return await checkbox({
      message: 'Select dependencies(请选择依赖):',
      choices: dependencies
        .filter((item) => !item.disabled)
        .map((type) => ({
          name: type.color(type.name),
          value: type,
        })),
    });
  }

  public async execute() {
    if (!this.config.projectName || !checkFileExist(this.config.projectName)) {
      if (!checkFileExist(this.config.projectName)) {
        console.log('The project already exists, please re-enter the project name(项目已存在，请重新输入项目名称)');
      }
      this.config.projectName = await this.inputProjectName();
    }

    let framework = null;
    let variant = null;
    let dependencies = null;

    const projectType = await this.selectProjectType();
    if (projectType?.framework) framework = await this.selectFramework(projectType?.framework);
    if (framework?.variant && framework.variant.length > 0) variant = await this.selectVariant(framework?.variant);
    if (variant?.dependencies && variant.dependencies.length > 0)
      dependencies = await this.selectDependencies(variant?.dependencies);

    Object.assign(this.config, {
      projectType: projectType.value,
      framework: framework?.value,
      variant: variant?.value,
      dependencies: dependencies?.map((item: Dependencie) => item.value),
    });

    return this.config;
  }
}
