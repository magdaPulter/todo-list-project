export interface TaskModel {
  readonly id: string;
  readonly content: string;
  readonly description: string;
  readonly project_id: string;
  readonly is_completed: boolean;
  readonly due: {
    readonly date: string;
  };
}
