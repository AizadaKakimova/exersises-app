<template>
  <div class="exercise-table">
    <div class="exercise-table__header">
      <h2>Таблица упражнений</h2>
      <button @click="toggleForm" class="form-button">
        Добавить упражнение
      </button>
    </div>
    <div class="exercise-table__filters filters">
      <input
        class="filters__input"
        type="text"
        v-model="searchQuery"
        placeholder="Поиск по названию"
      />
      <label class="filters__label">Тип:</label>
      <select class="filters__select" v-model="selectedType">
        <option value="">Все типы</option>
        <option
          v-for="(type, index) in exerciseTypes"
          :key="index"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
      <label class="filters__label">Уровень сложности:</label>
      <select class="filters__select" v-model="selectedDifficulty">
        <option value="">Все уровни</option>
        <option
          v-for="(difficulty, index) in exerciseDifficulty"
          :key="index"
          :value="difficulty"
        >
          {{ difficulty }}
        </option>
      </select>
    </div>
    <table class="exercise-table__table table">
      <thead class="table__head">
        <tr class="table__row">
          <th>Название</th>
          <th>Описание</th>
          <th>Тип</th>
          <th>Уровень сложности</th>
          <th>Продолжительность (мин)</th>
          <th>Кол-во подходов</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          @click="openModal(exercise)"
          @mouseenter="showOptions(exercise.id)"
          @mouseleave="hideOptions()"
          class="table__row"
        >
          <td>{{ exercise.name }}</td>
          <td>{{ exercise.description }}</td>
          <td>{{ exercise.type }}</td>
          <td>{{ exercise.difficulty }}</td>
          <td>{{ exercise.duration }}</td>
          <td>{{ exercise.repetitions }}</td>
          <td>
            <template v-if="showOptionsId === exercise.id">
              <button class="form-button" @click.stop="editExercise(exercise)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0,0,300,150"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style="mix-blend-mode: normal"
                  >
                    <g transform="scale(5.12,5.12)">
                      <path
                        d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
              <button
                class="form-button"
                @click.stop="deleteExercise(exercise.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style="mix-blend-mode: normal"
                  >
                    <g transform="scale(8.53333,8.53333)">
                      <path
                        d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <FormModal
      :isOpen="showForm"
      :exercise="selectedExercise"
      :formType="formType"
      @close="showForm = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { Exercise, ExerciseTypes, ExerciseDifficulty } from "../store/types";

import FormModal from "../components/modals/FormModal.vue";

export default defineComponent({
  components: {
    FormModal,
  },
  setup() {
    const store = useStore();
    store.dispatch("fetchExercises");

    const showForm = ref(false);
    const selectedExercise = ref<Exercise | null>(null);
    const formType = ref<"add" | "edit" | "details">("add");
    const searchQuery = ref("");
    const selectedType = ref("");
    const selectedDifficulty = ref("");
    const showOptionsId = ref<number | null>(null);

    const filteredExercises = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      const exercises = store.state.exercises;

      return exercises.filter(
        (exercise: Exercise) =>
          (query === "" || exercise.name.toLowerCase().includes(query)) &&
          (selectedType.value === "" || exercise.type === selectedType.value) &&
          (selectedDifficulty.value === "" ||
            exercise.difficulty === selectedDifficulty.value)
      );
    });

    const showOptions = (id: number) => {
      showOptionsId.value = id;
    };

    const hideOptions = () => {
      showOptionsId.value = null;
    };

    const openModal = (exercise: Exercise) => {
      formType.value = "details";
      selectedExercise.value = exercise;
      showForm.value = true;
    };

    const toggleForm = () => {
      showForm.value = !showForm.value;
      formType.value = "add";
      selectedExercise.value = null;
    };

    const editExercise = (exercise: Exercise) => {
      selectedExercise.value = { ...exercise };
      formType.value = "edit";
      showForm.value = true;
    };

    const saveExercise = (exercise: Exercise) => {
      if (formType.value === "add") {
        store.dispatch("addExercise", exercise);
      } else {
        store.dispatch("updateExercise", exercise);
      }
      toggleForm();
    };

    const deleteExercise = (exerciseId: number) => {
      store.dispatch("deleteExercise", exerciseId);
    };

    return {
      showForm,
      selectedExercise,
      selectedType,
      selectedDifficulty,
      formType,
      searchQuery,
      filteredExercises,
      showOptionsId,
      showOptions,
      hideOptions,
      openModal,
      toggleForm,
      editExercise,
      saveExercise,
      deleteExercise,
      exerciseTypes: ExerciseTypes,
      exerciseDifficulty: ExerciseDifficulty,
    };
  },
});
</script>
