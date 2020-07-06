<template>
  <q-dialog v-model="isShow">
    <q-card>
      <q-bar>
        <h6>បន្ថែមមុខតំណែង</h6>
        <q-space/>
        <q-btn dense flat icon="save" @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-input
            class="col"
            outlined
            v-model="data.name"
            label="ឈ្មោះមុខតំណែង"
             square
            lazy-rules
            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AddPosition",
    data() {
      return {
        isShow: false,
        data:{
          name:''
        }
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      onSubmit() {
        let self = this;
        self.$store.dispatch('position_info_helper/storePosition',self.data).then(function (data) {
          if (data.status){
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false
          }else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
