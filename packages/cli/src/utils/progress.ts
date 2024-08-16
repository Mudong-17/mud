import cliProgress from 'cli-progress';

export class ProgressBar {
  private totalTasks: number;
  private completedTasks: number = 0;
  private bar: cliProgress.SingleBar;
  constructor(totalTasks: number, options = {}) {
    this.totalTasks = totalTasks;
    this.bar = new cliProgress.SingleBar(options, cliProgress.Presets.shades_classic);
    this.bar.start(totalTasks, 0);
  }

  public completeTask() {
    this.completedTasks++;
    this.bar.update(this.completedTasks);
    if (this.completedTasks === this.totalTasks) {
      this.bar.stop();
    }
  }

  public stop() {
    this.bar.stop();
  }
}
