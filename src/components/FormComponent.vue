<template>
  <b-col cols="12">
    <form-add @toggleForm="$emit('toggleForm')" :isShowForm="isShowForm" />

    <b-form
      v-if="isShowForm"
      method="POST"
      class="d-flex form-inline justify-content-between"
    >
      <b-form-group>
        <b-form-input
          v-model="name"
          placeholder="Enter your task name"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-select
          class="form-control"
          v-model="levelSelected"
          :options="levelOption"
          required
        ></b-form-select>
      </b-form-group>

      <b-button :disabled="!validate" @click="addTask()" variant="primary"
        >Submit</b-button
      >
      <b-button @click="resetData()" variant="secondary">Cancel</b-button>
    </b-form>
  </b-col>
</template>

<script>
import FormAdd from "./FormAdd";
export default {
  name: "FormComponent",
  props: {
    isShowForm: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FormAdd,
  },
  data() {
    return {
      name: null,
      levelSelected: 0,
      levelOption: [
        { value: 0, text: "Small" },
        { value: 1, text: "Medium" },
        { value: 2, text: "High" },
      ],
    };
  },
  methods: {
    addTask() {
      if (this.validate) {
        this.$emit("addTask", {
          name: this.name,
          level: this.levelSelected,
        });
        this.resetData();
      }
    },
    resetData() {
      this.name = null;
      this.levelSelected = 0;
    },
  },
  computed: {
    validate() {
      return this.name !== null && this.name !== "" ? true : false;
    },
  },
};
</script>

<style  scoped>
</style>
