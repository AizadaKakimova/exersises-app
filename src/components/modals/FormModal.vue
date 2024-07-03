<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="form-title">{{ actions[formType].text }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Название:</label>
          <input
            class="form-input"
            type="text"
            id="name"
            v-model="form.name"
            :disabled="formType === 'details'"
            required
          />
        </div>
        <div>
          <label for="description">Описание:</label>
          <input
            class="form-input"
            type="text"
            id="description"
            v-model="form.description"
            :disabled="formType === 'details'"
            required
          />
        </div>
        <div>
          <label for="type">Тип:</label>
          <select
            class="form-input"
            id="type"
            v-model="form.type"
            :disabled="formType === 'details'"
            required
          >
            <option
              v-for="(type, index) in exerciseTypes"
              :key="index"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div>
          <label for="difficulty">Сложность:</label>
          <select
            class="form-input"
            id="difficulty"
            v-model="form.difficulty"
            :disabled="formType === 'details'"
            required
          >
            <option
              v-for="(difficulty, index) in exerciseDifficulty"
              :key="index"
              :value="difficulty"
            >
              {{ difficulty }}
            </option>
          </select>
        </div>
        <div>
          <label for="duration">Длительность (минуты):</label>
          <input
            class="form-input"
            type="number"
            id="duration"
            v-model="form.duration"
            :disabled="formType === 'details'"
            required
          />
        </div>
        <div>
          <label for="repetitions">Подходы:</label>
          <input
            class="form-input"
            type="number"
            id="repetitions"
            v-model="form.repetitions"
            :disabled="formType === 'details'"
          />
        </div>
        <button class="form-button" type="submit" v-if="formType !== 'details'">
          {{ actions[formType].buttonText }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  Actions,
  Exercise,
  ExerciseDifficulty,
  ExerciseTypes,
} from "@/store/types";
import "@/styles/Exercises.scss";

export default defineComponent({
  props: {
    isOpen: Boolean,
    exercise: {
      type: Object as () => Exercise | null,
      default: null,
    },
    formType: {
      type: String as () => "add" | "edit" | "details",
      required: true,
    },
  },
  emits: ["close", "submit"],

  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      name: props.exercise?.name || "",
      description: props.exercise?.description || "",
      type: props.exercise?.type || "",
      difficulty: props.exercise?.difficulty || "",
      duration: props.exercise?.duration || 0,
      repetitions: props.exercise?.repetitions || 0,
    });

    watch(
      () => props.exercise,
      (newExercise) => {
        if (newExercise) {
          form.value = {
            name: newExercise.name,
            description: newExercise.description,
            type: newExercise.type,
            difficulty: newExercise.difficulty,
            duration: newExercise.duration,
            repetitions: newExercise.repetitions || 0,
          };
        }
      },
      { immediate: true }
    );

    const handleSubmit = () => {
      if (props.formType === "add") {
        const newExercise: Exercise = {
          ...form.value,
          id: Date.now(),
        };
        store.dispatch("addExercise", newExercise);
      } else if (props.formType === "edit" && props.exercise) {
        const updatedExercise: Exercise = {
          ...props.exercise,
          ...form.value,
        };
        store.dispatch("updateExercise", updatedExercise);
      }
      closeModal();
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      form,
      handleSubmit,
      closeModal,
      actions: Actions,
      exerciseTypes: ExerciseTypes,
      exerciseDifficulty: ExerciseDifficulty,
    };
  },
});
</script>
