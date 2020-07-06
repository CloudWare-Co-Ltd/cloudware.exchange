<template>
  <q-dialog v-model="isShow" persistent transition-show="flip-down" transition-hide="flip-up">
    <q-card style="width: 1000px; max-width: 90vw;">
      <q-bar>
        <h6>បន្ថែមព័ត៌មានមុខតំណែង និងតួនាទី</h6>
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
                          v-model="data.office"
                          label="ការិយាល័យ..."
                          :options="getOffices"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="secondary" @click="$refs.addOffice.show()"/>
                  </template>
                </q-select>
                <q-select class="col"
                          outlined
                          v-model="data.position"
                          label="តំណែង..."
                          :options="getPositions"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="secondary" @click="$refs.addPosition.show()"/>
                  </template>
                </q-select>
              </div>
              <div class="row q-gutter-x-sm">
                <q-select class="col"
                          outlined
                          v-model="data.salary_position"
                          label="ប្រភេទកាំប្រាក់ និងកម្រិតថ្នាក់..."
                          :options="getSalaryPositions"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="secondary" @click="$refs.addSalaryPosition.show()"/>
                  </template>
                </q-select>
                <q-input
                  class="col"
                  outlined
                  v-model="data.salary_position_date"
                  label="ថ្ងៃខែឆ្នាំឡើងកាំបៀរត្សចុងក្រោយ"
                  square
                  lazy-rules
                  mask="##/##/####" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="salaryPositionDate" transition-show="scale" transition-hide="scale">
                        <q-date mask="DD/MM/YYYY" v-model="data.salary_position_date"
                                @input="() => $refs.salaryPositionDate.hide()"/>
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
    <add-office ref="addOffice"/>
    <add-position ref="addPosition"/>
    <add-salary-position ref="addSalaryPosition"/>
  </q-dialog>
</template>

<script>
  import AddOffice from "pages/staff/AddOffice";
  import AddPosition from "pages/staff/AddPosition";
  import AddSalaryPosition from "pages/staff/AddSalaryPosition";
  export default {
    name: "AddPositionInfo",
    components: {AddSalaryPosition, AddPosition, AddOffice},
    data() {
      return {
        isShow: false,
        data: {
          office: null,
          position: null,
          salary_position: null,
          salary_position_date: '',
          staff: 0,
        }
      }
    },
    computed: {
      getSalaryPositions(){
        return this.$store.getters['position_info_helper/getSalaryPosition'].map(function (x) {
          return x.name
        })
      },
      getOffices(){
        return this.$store.getters['position_info_helper/getOffice'].map(function (x) {
          return x.name
        })
      },
      getPositions(){
        return this.$store.getters['position_info_helper/getPosition'].map(function (x) {
          return x.name
        })
      }
    },
    methods: {
      show(staff) {
        this.isShow = true;
        this.data.staff = staff
      },
      onSubmit() {
        let self = this;
        self.$store.dispatch('position_info/storePositionInfo', self.data).then(function (data) {
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
      clearForm() {
        let self = this;
        for (let key of Object.keys(self.data)) {
          if (key!=='staff'){
            self.data[key] = null
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
