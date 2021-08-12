<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                class="w-75"
              >
                <template #first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>

              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <!-- <b-form-checkbox-group v-model="filterOn" class="mt-1 float-right">
            <b-form-checkbox value="name">Name</b-form-checkbox>
          </b-form-checkbox-group> -->
        </b-col>
      </b-row>
    </b-card>
    <b-card header="List Task">
      <b-table
        show-empty
        striped
        hover
        :items="listTask"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        primary-key="#"
      >
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(level)="data">
          <b-badge v-if="data.item.level == 0" variant="primary">Low</b-badge>
          <b-badge v-if="data.item.level == 1" variant="warning"
            >Medium</b-badge
          >
          <b-badge v-if="data.item.level == 2" variant="danger">High</b-badge>
        </template>

        <template #cell(actions)="data">
          <b-button
            variant="primary"
            v-b-modal="data.item.id"
            @click="taskSelected = data.item"
          >
            Edit
          </b-button>
          <b-button @click="$emit('deleteTask', data.item)" variant="danger">
            Delete
          </b-button>
        </template>
      </b-table>

      <ModalEditTask
        @submit="handleSubmit"
        :taskSelected="taskSelected"
        @resetTaskSelected="taskSelected = null"
        v-if="taskSelected"
      ></ModalEditTask>
    </b-card>
  </div>
</template>

<script>
import ModalEditTask from "./ModalEditTask";
export default {
  name: "TodoListTable",
  props: {
    listTask: {
      type: Array,
      default: [],
    },
  },
  components: {
    ModalEditTask,
  },
  data() {
    return {
      fields: [
        {
          key: "index",
          label: "#",
        },
        { key: "name", label: "Name", sortable: true, searchable: true },
        { key: "level", label: "Level", sortable: true, searchable: true },
        { key: "actions" },
      ],
      filter: null,
      sortBy: "",
      sortDesc: false,
      sortDirection: "desc",
      filterOn: ["name"],
      taskSelected: null,
      levelOption: [
        { value: 0, text: "Small" },
        { value: 1, text: "Medium" },
        { value: 2, text: "High" },
      ],
    };
  },
  methods: {
    handleSubmit(item) {
      this.$emit("editTask", item);
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
};
</script>

<style >
.sr-only {
  display: none;
}
</style>
