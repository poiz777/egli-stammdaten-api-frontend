<template>
  <tr class="">
    <template v-if="entitySample">
      <template  v-for="(fieldName, intKey1) in fetchVisibleFields(entitySample).fields">
        <template  v-for="(field, cueKey) in entitySample.fetchFieldsConfig()">
          <th class="pz-sortable-col"
              :data-orientation="'0'"
              v-if="field.showInTable && field.name === fieldName"
              :key="cueKey+'_' + intKey1 + '_' + field.name" >
            <span class="pz-sortable-col-box" @click="(e)=>{ sortByField(e, field.name);}">{{ field.label }}&nbsp;
              <span class="fa fa-angle-up" v-if="renderData.length"></span> <span class="fa fa-angle-down" v-if="renderData.length"></span>
            </span> &nbsp;
            <span class="fa fa-search egl-filter-chain"
                  :data-column="field.name"
                  v-if="renderData.length"
                  @click="(e)=>{ DynamicSearch.filterRenderedDataByColumn(e, field.name, field.label);}"></span>
          </th>
        </template>
      </template>
      <th >Actions</th>
    </template>
  </tr>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "EntityTableRow",
    props: ["fetchVisibleFields","sortByField", "entitySample", "filterRenderedDataByColumn"],

    computed: {
      ...mapState([
        "DynamicSearch",
        "renderData",
        "dataSample",
      ]),
    },
  }
</script>

<style scoped>

</style>