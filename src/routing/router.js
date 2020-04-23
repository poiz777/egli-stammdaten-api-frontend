import Vue            from 'vue';
import VueRouter      from 'vue-router';
import {EntityRoutes} from './EntityRoutes.js';

let routeName;
let routeTask;
let rayRoutes = [];

Vue.use(VueRouter);

const ucFirst = (string)=>{
  const parts = string.split("");
  return parts.reduce( (accumulator, currentValue, index) => {
    accumulator = index === 1 ? accumulator.toUpperCase() : accumulator;
    return accumulator + currentValue;
  });
};

for(routeName in EntityRoutes){
  let tmpRoute    = {};
  const mappings  = EntityRoutes[routeName];
  if(mappings.routes !== undefined && mappings.routes){
    for(routeTask in mappings.routes){
      if(mappings.routes[routeTask] !== undefined && mappings.routes[routeTask]['uri']){
        tmpRoute    = {
          name      : `${routeName}_${ucFirst(routeTask)}`,
          path      : mappings.routes[routeTask]['uri'],
          component : mappings.routes[routeTask]['component'],   // mappings['component'],
          model     : mappings['model']
        };
        rayRoutes.push(tmpRoute);
      }
    }
  }
}

export default new VueRouter({
  mode    : 'history',
  base    : process.env.BASE_URL,
  routes  : rayRoutes
});