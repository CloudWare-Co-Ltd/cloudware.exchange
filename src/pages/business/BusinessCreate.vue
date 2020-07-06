<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-actions align="center">
        <q-btn class="full-width" color="grey" icon="arrow_back" v-go-back.single/>
      </q-card-actions>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="q-my-sm">
                  ឈ្មោះខ្មែរ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input
                  class="col"
                  outlined
                  v-model="data.lname"
                  label="នាមត្រកូល"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  class="col"
                  outlined
                  v-model="data.fname"
                  label="នាមខ្លួន"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="full-width" color="primary" label="រក្សារទុក" @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "BusinessCreate",
    data() {
      return {
        formData: new FormData(),
        data: {
          staff_type: '',
          fname: '',
          lname: '',
          fname_latin: '',
          lname_latin: '',
          photo: '',
          hostname: 'https://api.admin.mcu.edu.kh/',
          gender: 'ប្រុស',
          course: null,
          dob: null,
          skill: '',
          education_system: '',
          national_id: '',
          official_no: '',
          nssf_no: '',
          nssf_no: '',
          amcek_no: '',
          bank_account_no: '',
          bank_name: '',
          start_work: '',
          real_appointment: '',
          email: '',
          tel: '',
          telegram: '',
          facebook: '',
          pob_address_book: '',
          current_address_book: '',
        },
      }
    },
    computed: {
    },
    methods: {
      onSubmit() {
        let self = this;
        let postData = JSON.stringify(self.data);
        self.formData.set("data", postData);
        self.$store.dispatch('staff/storeStaff', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false
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
      filterFnAddressBook(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsAddressBook = self.getAddressBooks.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      factoryFnUploadPhoto(file) {
        let self = this;
        self.formData.set('photo', file[0]);
      },
    }
  }
</script>

<style scoped>

</style>
