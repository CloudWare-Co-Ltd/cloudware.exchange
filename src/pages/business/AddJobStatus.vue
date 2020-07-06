<template>
  <q-dialog v-model="isShow" persistent transition-show="flip-down" transition-hide="flip-up">
    <q-card style="width: 1000px; max-width: 90vw;">
      <q-bar>
        <h6>បន្ថែមព័ត៌មានស្ថានភាពការងារ</h6>
        <q-space/>
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
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section class="q-gutter-y-sm">
              <div class="row q-gutter-x-sm">
                <q-select class="col"
                          outlined
                          v-model="data.type"
                          label="ជ្រើសរើស..."
                          :options="[
                            'កំពុងធ្វើ',
                            'ឈប់ធ្វើ'
                            ]"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']"/>
                <q-input
                  class="col"
                  outlined
                  v-model="data.description"
                  label="បរិយាយ"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  class="col"
                  outlined
                  v-model="data.date"
                  label="ថ្ងៃខែឆ្នាំ"
                  square
                  lazy-rules
                  mask="##/##/####" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="dateStatus" transition-show="scale" transition-hide="scale">
                        <q-date mask="DD/MM/YYYY" v-model="data.date" @input="() => $refs.dateStatus.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </q-card-section>
          </q-card>
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="full-width" color="secondary" label="រក្សារទុក" @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "AddJobStatus",
    data() {
      return {
        isShow: false,
        formData: new FormData(),
        data: {
          type: null,
          description: '',
          date: '',
          staff: 0,
        }
      }
    },
    computed: {},
    methods: {
      show(staff) {
        this.isShow = true;
        this.data.staff = staff
      },
      onSubmit() {
        let self = this;
        self.$store.dispatch('job_status/storeJobStatus', self.data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.clearForm();
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      },
      attachmentFn(value) {
        this.formData.set("attachment", value);
      },
      clearForm() {
        let self = this;
        for (let key of Object.keys(self.data)) {
          if (key !== 'staff') {
            if (key !== 'staff') {
              self.data[key] = null
            }
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
