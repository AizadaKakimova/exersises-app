import { createStore } from "vuex";
import { Exercise, ExercisesList } from "./types";

interface State {
  exercises: Exercise[];
}

const store = createStore<State>({
  state: {
    exercises: [],
  },
  mutations: {
    setExercises(state, exercises: Exercise[]) {
      state.exercises = exercises;
    },
    addExercise(state, exercise: Exercise) {
      state.exercises.push(exercise);
    },
    updateExercise(state, updatedExercise: Exercise) {
      const index = state.exercises.findIndex(
        (ex) => ex.id === updatedExercise.id
      );
      if (index !== -1) {
        state.exercises.splice(index, 1, updatedExercise);
      }
    },
    deleteExercise(state, exerciseId: number) {
      state.exercises = state.exercises.filter((ex) => ex.id !== exerciseId);
    },
  },
  actions: {
    fetchExercises({ commit }) {
      const exercises: Exercise[] = ExercisesList;
      commit("setExercises", exercises);
    },
    addExercise({ commit }, exercise: Exercise) {
      commit("addExercise", exercise);
    },
    updateExercise({ commit }, updatedExercise: Exercise) {
      commit("updateExercise", updatedExercise);
    },
    deleteExercise({ commit }, exerciseId: number) {
      commit("deleteExercise", exerciseId);
    },
  },
  getters: {
    getExercises: (state) => state.exercises,
    getExerciseById: (state) => (id: number) =>
      state.exercises.find((ex) => ex.id === id),
  },
});

export default store;
