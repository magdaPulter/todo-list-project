export enum Priority {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}

export enum SortParameter {
  PRIORITY = 'priority',
  DATE = 'date',
}
export enum Order {
  ASC = 'Asc',
  DESC = 'Desc',
}

export enum EditParameter {
  CONTENT = 'content',
  DESCRIPTION = 'description',
  DUE_DATE = 'due_date',
  PRIORITY = 'priority',
}

export enum FilterParameter {
  SEARCH = 'search',
  PRIORITY = 'priority',
  PROJECTID = 'projectId',
}

export const utils = {
  minDate(): string {
    const date = new Date();
    const m =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const y = date.getFullYear();

    return `${y}-${m}-${d}`;
  },
  task: {
    content: '',
    project_id: '',
    id: '',
    description: '',
    is_completed: false,
    priority: 1,
    due_date: '',
    due: {
      date: '',
    },
  },
  priority: [Priority.ONE, Priority.TWO, Priority.THREE, Priority.FOUR],
  priorityFlag: [
    'text-secondary',
    'text-primary',
    'text-warning',
    'text-danger',
  ],
  dateTime(date: string): number {
    return new Date(date).getTime();
  },
  editParameters: {
    content: false,
    description: false,
    due_date: false,
    priority: false,
  },
};
