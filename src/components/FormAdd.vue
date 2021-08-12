<template>
  <div class="form-group add-task">
    <button
      type="button"
      class="btn btn-block"
      :class="isShowForm ? 'btn-danger' : 'btn-primary'"
      @click="$emit('toggleForm')"
    >
      {{ isShowForm ? "Close" : "Add Task" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "FormAdd",
  props: {
    isShowForm: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style  scoped>
</style>
