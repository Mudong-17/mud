import { checkbox, confirm, input, select } from '@inquirer/prompts';
import { Project } from '../constant';
import { Choice, Dependency, Framework, Variant } from '../constant/interface';
import { checkFileExist } from '../utils';

interface ProjectConfig {
  projectName: string;
  projectType: string;
  framework?: string;
  variant?: string;
  dependencies: Array<{ value: string; other: string[] | [] }> | [];
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

  private async selectFramework(frameworks: Framework[] | undefined) {
    if (!frameworks) return null;
    return await select({
      message: 'Select a framework(请选择框架):',
      choices: frameworks
        .filter((framework) => !framework.disabled)
        .map((framework) => ({
          name: framework.color(framework.name),
          value: framework,
        })),
    });
  }

  private async selectVariant(variants: Variant[] | undefined) {
    if (!variants) return null;
    return await select({
      message: 'Select a variant(请选择变体):',
      choices: variants
        .filter((variant) => !variant.disabled)
        .map((variant) => ({
          name: variant.color(variant.name),
          value: variant,
        })),
    });
  }

  private isDependency(choice: Choice): choice is Dependency {
    return choice.type === 'dependency';
  }

  private async selectDependencies(dependencies: Choice[]) {
    if (!dependencies) return null;
    return await checkbox({
      message: 'Select dependencies(请选择依赖):',
      choices: dependencies
        .filter((dependency) => !(dependency as Dependency).disabled)
        .map((dependency: Choice) => {
          if (this.isDependency(dependency)) {
            return {
              name: dependency.color(dependency.name),
              value: dependency,
            };
          }
          return dependency;
        }),
    });
  }

  // 选择是否获取依赖的具体版本，选择是为true，否为false
  private async selectDependencyVersion() {
    return await confirm({
      message:
        'Selecting yes will fetch the latest version from the network. Consider choosing no if your network is slow.(这将通过网络获取版本号，建议在本地网络环境不佳时选择否)?',
      default: false,
    });
  }

  public async execute() {
    if (this.config.projectName && !checkFileExist(this.config.projectName)) {
      console.log('The project already exists, please re-enter the project name(项目已存在，请重新输入项目名称)');
      this.config.projectName = await this.inputProjectName();
    }

    if (!this.config.projectName) {
      this.config.projectName = await this.inputProjectName();
    }

    let framework = null;
    let variant = null;
    let dependencies = null;
    let networkVersion = false;

    const projectType = await this.selectProjectType();
    if (projectType?.framework) framework = await this.selectFramework(projectType?.framework);
    if (framework?.variant && framework.variant.length > 0) variant = await this.selectVariant(framework?.variant);
    if (variant?.dependencies && variant.dependencies.length > 0) {
      dependencies = await this.selectDependencies(variant?.dependencies);
      networkVersion = await this.selectDependencyVersion();
    }

    Object.assign(this.config, {
      projectType: projectType.value,
      framework: framework?.value,
      variant: variant?.value,
      dependencies: dependencies?.map((item: Dependency) => ({ value: item.value, other: item.other || [] })),
      networkVersion,
    });

    return this.config;
  }
}
