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
    due_date: '',
    due: {
      date: '',
    },
  },
};
