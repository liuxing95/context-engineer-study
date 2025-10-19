import { ReActFrameWork } from './base';
import { ReActStep } from './types';

export class ParallelReAct extends ReActFrameWork {
  private parallelBranches: number = 3;

  constructor(maxIterations: number = 10, parallelBranches: number = 3) {
    super(maxIterations);
    this.parallelBranches = parallelBranches;
  }

  async execute(question: string, model: any): Promise<any> {
    // 并行执行多个推理分支
    const branches = await Promise.all(
      Array(this.parallelBranches)
        .fill(null)
        .map(() => this.executeBranch(question, model)),
    );

    // 选择最佳分支
    const bestBranch = this.selectBestBranch(branches);

    return {
      ...bestBranch,
      totalBranches: branches.length,
      allBranches: branches,
    };
  }

  private async executeBranch(question: string, model: any): Promise<any> {
    // 每个分支独立执行
    return super.execute(question, model);
  }

  private selectBestBranch(branches: any[]): any {
    // 基于多个因素选择最佳分支
    let bestBranch = branches[0];
    let bestScore = -Infinity;

    for (const branch of branches) {
      const score = this.scoreBranch(branch);
      if (score > bestScore) {
        bestScore = score;
        bestBranch = branch;
      }
    }

    return bestBranch;
  }

  private scoreBranch(branch: any): number {
    let score = 0;

    // 步骤数少的更好
    score -= branch.iterations * 0.1;

    // 成功的观察多的更好
    const successfulObservations = branch.steps.filter(
      (step: ReActStep) => step.observation.success,
    ).length;
    score += successfulObservations;

    // 有最终答案的更好
    if (branch.answer !== '达到最大迭代次数，未能完全解决问题') {
      score += 10;
    }

    return score;
  }
}
