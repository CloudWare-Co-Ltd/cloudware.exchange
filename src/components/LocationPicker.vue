<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space/>

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup @click="closeEmmit">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section style="height: 100%">
        <location-picker style="height: 100%" v-model="location"
                         :options="options"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import {LocationPicker} from 'vue2-location-picker'

  export default {
    name: "LocationPickerMaps",
    components: {
      LocationPicker
    },
    data() {
      return {
        dialog: false,
        maximizedToggle: true,
        location: {
          lat: 13.971972094780156,
          lng: 103.32938409179687
        },
        options: { // is not required
          map: {
            zoom: 10
          },
          marker: { /** marker options **/},
          autocomplete: { /** autocomplete options **/},
        },
      }
    },
    methods: {
      show() {
        this.dialog = true
      },
      closeEmmit() {
        this.$emit('location', this.location)
      }
    }
  }
</script>

<style scoped>

</style>
