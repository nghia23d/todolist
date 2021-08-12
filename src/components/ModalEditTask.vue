<template>
  <b-modal
    header-bg-variant="primary"
    header-text-variant="light"
    @ok="handleSubmit"
    :okDisabled="!validate"
    @hidden="$emit('resetTaskSelected')"
    :title="'Edit task: ' + taskSelected.name"
    :id="taskSelected.id"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <!-- Name -->
      <b-form-group label="Name" label-for="name-input">
        <b-form-input required id="name-input" v-model="name"></b-form-input>
      </b-form-group>

      <!-- Level -->
      <b-form-group>
        <b-form-select
          class="form-control"
          v-model="level"
          :options="levelOption"
        ></b-form-select>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "ModalEditTask",
  props: {
    taskSelected: {
      type: Object,
    },
  },
  data() {
    return {
      name: null,
      level: null,
      levelOption: [
        { value: 0, text: "Small" },
        { value: 1, text: "Medium" },
        { value: 2, text: "High" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (this.validate) {
        this.$emit("submit", {
          id: this.taskSelected.id,
          name: this.name,
          level: this.level,
        });
      }
    },
  },
  computed: {
    validate() {
      return this.name ? true : false;
    },
  },
  created() {
    this.name = this.taskSelected.name;
    this.level = this.taskSelected.level;
  },
};
</script>

<style  scoped>
</style>
