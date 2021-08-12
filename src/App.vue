<template>
  <div id="app">
    <b-container>
      <title-component />

      <b-row>
        <form-component
          :isShowForm="isShowForm"
          @toggleForm="isShowForm = !isShowForm"
          @addTask="handleAddTask"
        />
      </b-row>

      <todo-list-table
        :listTask="listTask"
        @deleteTask="handleDeleteTask"
        @editTask="handleEditTask"
      />
    </b-container>
  </div>
</template>

<script>
import TodoListTable from "./components/TodoListTable";
import TitleComponent from "./components/TitleComponent";
import FormComponent from "./components/FormComponent";

import listTask from "./mocks/tasks";
import { v4 as uuidv4 } from "uuid";

export default {
  props: {},
  name: "app",
  components: {
    TodoListTable,
    TitleComponent,
    FormComponent,
  },
  data() {
    return {
      listTask,
      isShowForm: false,
    };
  },
  methods: {
    handleAddTask(item) {
      (item.id = uuidv4()), this.listTask.push(item);
    },
    handleEditTask(item) {
      let index = this.listTask.findIndex((e) => e.id == item.id);

      if (index != -1) this.listTask.splice(index, 1, item);
    },
    handleDeleteTask(item) {
      if (confirm("Bạn có muốn xóa task " + item.name)) {
        this.listTask = this.listTask.filter((e) => e.id != item.id);
      }
    },
  },
};
</script>

<style>
body {
  padding: 100px 0;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  vertical-align: middle;
}

.container > .row {
  margin-top: 20px;
  margin-bottom: 30px;
}

span.badge-medium {
  padding: 11px 10px;
  margin: 0px 8px;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
}

@media (max-width: 992px) {
  .add-task {
    margin-top: 50px;
  }
}
</style>
