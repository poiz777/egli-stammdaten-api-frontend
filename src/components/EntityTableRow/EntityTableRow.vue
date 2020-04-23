<template>
  <tr :key="entity.uid + '_' + uniqueKey">
    <template v-for="(fieldName, intKey1) in fetchVisibleFields(entity).fields">
      <template v-for="(field, cueKey) in entity.fetchFieldsConfig()">
        <td :class="`pz-cell pz-cell-${fieldName}`"
            :data-orientation="'0'"
            v-if="field.showInTable && field.name ===  fieldName"
            :key="intKey1 + '_' + cueKey + uniqueKey">
          <template v-if="entity[fieldName]">

            <template v-if="fieldIsBoolean(fieldName)">
              <template v-if="parseInt(entity[fieldName]) === 0 || !entity[fieldName]">
                <span class="fa fa-thumbs-down egl-red-flag"></span>
              </template>
              <template v-else>
                <span class="fa fa-thumbs-up egl-green-flag"></span>
              </template>
            </template>

            <template v-else-if="field.isMulti">
              <template v-if="entity[fieldName][field.defaultLang]">
                {{ entity[fieldName][field.defaultLang] }}
              </template>
            </template>

            <template v-else-if="(fieldHasOneToManyRelation(fieldName))">
              {{ fetchOneToManyValues(entity, fieldName) }}
            </template>

            <template v-else-if="(fieldIsEntity(fieldName) && fieldHasManyToOneRelation(fieldName)) || field.useField">
              <template v-if="entity[fieldName][field.optionsMap.label]">
                {{ entity[fieldName][field.optionsMap.label] }}
              </template>
            </template>

            <template v-else>{{ entity[fieldName] }}</template>
          </template>
          <template v-else-if="parseInt(entity[fieldName]) === 0">0</template>
          <template v-else-if="entity[fieldName] === false"><span class="fa fa-thumbs-down egl-red-flag"></span></template>
          <template v-else>Not Available</template>
        </td>
      </template>
    </template>
    <CRUDButtons :entity="entity"
                 :editAction="preProcessCRUDActions"
                 :deleteAction="preProcessCRUDActions"
                 :deActivateAction="preProcessCRUDActions"></CRUDButtons>
  </tr>
</template>

<script>
  import CRUDButtons from "../CRUDButtons/CRUDButtons"
  export default {
    name: "EntityTableRow",
    props: ["fetchVisibleFields", "entity", "preProcessCRUDActions", "uniqueKey"],
    data(){
      return {
        maxManyToOneStringLength: 50,
      }
    },
    components: {CRUDButtons, },
    methods: {

      fieldHasManyToOneRelation(fieldName){
        return (this.entity.fetchFieldsConfig())[fieldName].isManyToOne;
      },

      fieldHasOneToManyRelation(fieldName){
        return (this.entity.fetchFieldsConfig())[fieldName].isOneToMany;
      },

      fieldIsEntity(fieldName){
        return (this.entity.fetchFieldsConfig())[fieldName].isEntity;
      },

      fieldIsBoolean(fieldName) {
        const config  = (this.entity.fetchFieldsConfig())[fieldName];
        return (config.type.toLowerCase() === 'boolean' || config.type.toLowerCase() === 'bool' || config.type.toLowerCase() === 'toggleswitch');
      },
      getOptionsMap(entity, fieldName){
        return  (entity.fetchFieldsConfig())[fieldName].optionsMap;
      },

      fetchOneToManyValues(entity, fieldName){
        const optionsMap      = this.getOptionsMap(entity, fieldName);
        const one2ManyPayload = entity[fieldName];
        let values            = [];

        if(one2ManyPayload.length>0){
          for(let obj1ToM of one2ManyPayload){
            values.push(obj1ToM[optionsMap.label]);
          }
        }
        if(!(values.length)){
          values  = "Nicht vorhanden...";
        }else{
          values  = values.join(", ");
        }
        values    = (values.length>this.maxManyToOneStringLength) ? `${values.substr(0, (this.maxManyToOneStringLength)-3)}...` : values;

        return values;
      },
    }
  }
</script>