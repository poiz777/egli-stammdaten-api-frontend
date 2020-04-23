<template>
    <div :class="'pz-switch-wrapper ' + stateStringClass" :ref="switchName" :id="switchUID">
        <div class="pz-switch-track">
            <div :class="'pz-switch-knob ' + stateStringClass" @click="switchPosition"></div>
            <input type="hidden" :name="switchName" :value="defaultSwitchState">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToggleSwitch",

        props:['switchUID', 'switchName', 'switchState', 'switchOffOnClass', 'magnification', 'handleStateChange', 'clickAction', '$'],

        created : function(){
            this.switchStateInternal = this.switchState;
        },

        updated: function(){
        },

        mounted: function(){
            const switchWrapper = document.querySelector(`#${this.switchUID}`);
            switchWrapper.style.transform = `scale(${this.magnification})`;
        },

        computed: {
            defaultSwitchState: {
                // getter
                get: function () {
                    if(this.switchStateInternal === undefined || !this.switchStateInternal){
                        return '0';
                    }
                    if(this.switchStateInternal.toLowerCase() === 'off' || this.switchStateInternal+'' === '0'){
                        return '0';
                    }else{
                        return '1';
                    }
                },
                // setter
                set: function (newValue) {
                    this.switchState = newValue;
                }
            },
            stateStringClass: {
                // getter
                get: function () {
                    if(this.switchState === undefined || !this.switchState){
                        return 'off';
                    }
                    if(this.switchState.toLowerCase() === 'off' || this.switchState+'' === '0'){
                        return 'off';
                    }else{
                        return 'on';
                    }
                },
                // setter
                set: function (newValue) {
                    this.switchState = newValue;
                }
            }
        },

        data: () =>{
            return {
                switchStateInternal: 'off',
            };
        },

        methods: {
            switchPosition: function(e){
                const knob  = e.target;
                // let state   = '0';
                if(knob.classList.contains('off') || !knob.classList.contains('on')){
                    knob.classList.remove('off');
                    knob.classList.add('on');
                    knob.parentNode.parentNode.classList.add('on');
                    knob.parentNode.parentNode.classList.remove('off');
                    this.switchStateInternal = '1';
                }else{
                    knob.classList.remove('on');
                    knob.classList.add('off');
                    knob.parentNode.parentNode.classList.add('off');
                    knob.parentNode.parentNode.classList.remove('on');
                    this.switchStateInternal = '0';
                }
                if(typeof this[this.clickAction] === 'function') {
                  this[this.clickAction](e, this.switchStateInternal);
                }
            },
          runClickAction(e, state) {
              console.log(state);
            const pseudoType = this.$(e.target).parentsUntil("li.pz-list-item").parent("li.pz-list-item").find('.pz-group-name').text();
            const setup         = {
              switchOffOnClass    : (state  === '0')    ? 'pz-col-off'  : 'pz-col-on',
              switchKnobClass     : (state  === '0')    ? 'pz-bad'      : 'pz-good',
              switchKnobState     : (state  === '0')    ? '0'           : '1',
              state               : (state  === '1')    ? '0'           : '1',
              isOn                : (state  === '1'),
              pseudoType          : (/Tags/i.test(pseudoType)) ? 'Tags' : 'Categories',
              initiator           : e.currentTarget,
            };

            this.handleStateChange(setup);
          },

        },
    }
</script>

<style scoped>
    @import "../../assets/css/ToggleSwitch.css";
</style>