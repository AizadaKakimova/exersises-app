export interface Exercise {
  id: number;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  duration: number;
  repetitions?: number;
}

export const ExercisesList = [
  {
    id: 1,
    name: "Упражнение 1",
    description: "Описание 1",
    type: "кардио",
    difficulty: "начинающий",
    duration: 30,
    repetitions: 2,
  },
  {
    id: 2,
    name: "Упражнение 2",
    description: "Описание 2",
    type: "силовые",
    difficulty: "средний",
    duration: 45,
    repetitions: 3,
  },
  {
    id: 3,
    name: "Упражнение 3",
    description: "Описание 3",
    type: "стретчинг",
    difficulty: "сложный",
    duration: 15,
  },
];

export const Actions = {
  edit: {
    text: "Редактирование упражнения",
    buttonText: "Сохранить",
  },
  add: {
    text: "Добавление упражнения",
    buttonText: "Добавить",
  },
  details: {
    text: "Детали упражнения",
  },
};

export const ExerciseTypes = [
  "кардио",
  "силовые",
  "стретчинг",
  "пилатес",
  "trx",
  "йога",
  "танцы",
];

export const ExerciseDifficulty = ["начинающий", "средний", "сложный"];
