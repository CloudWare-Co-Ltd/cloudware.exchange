<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section>
        <q-form
          @submit="onSubmit(isBack)"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-card flat bordered class="bg-grey-1" square>
            <q-card-section>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="q-my-sm text-h5">
                  Add Business
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input
                  class="col-4"
                  square
                  outlined
                  v-model="data.name"
                  label="Business Name"
                  lazy-rules
                  :rules="[ val => !!val || 'Please complete the field']"
                />
                <q-input
                  class="col"
                  square
                  outlined
                  v-model="data.address"
                  label="Business Address"
                  lazy-rules
                  :rules="[ val => !!val || 'Please complete the field']"
                />
                <q-input
                  class="col"
                  square
                  outlined
                  v-model="data.contact"
                  label="Business Contact"
                  lazy-rules
                  :rules="[ val => !!val || 'Please complete the field']"
                />
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-file
                  @input="setLogo"
                  class="col-4"
                  square
                  outlined
                  v-model="data.logo"
                  label="Business Logo"
                  lazy-rules
                  :rules="[ val => !!val || 'Please complete the field']"
                />
                <q-input
                  @click="$refs.locationPicker.show()"
                  class="col"
                  square
                  outlined
                  v-model="data.location"
                  label="Business Location"
                  lazy-rules
                  :rules="[ val => !!val || 'Please complete the field']"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn class="q-ml-sm" icon="close" dense label="Save and Back" color="primary" no-caps @click="$refs.addForm.submit();isBack=true"/>
        <q-btn icon="save" dense color="secondary" label="Save" no-caps @click="$refs.addForm.submit();isBack=false"/>
        <q-btn icon="arrow_back" dense color="grey" flat label="Go Back" no-caps v-go-back.single/>
      </q-card-actions>
    </q-card>
    <location-picker-maps @location="emmitLocation" ref="locationPicker"/>
  </q-page>
</template>

<script>
  import LocationPickerMaps from "components/LocationPicker";

  export default {
    name: "BusinessCreate",
    components: {LocationPickerMaps},
    data() {
      return {
        isBack: false,
        formData: new FormData(),
        data: {
          name: null,
          logo: null,
          address: null,
          contact: null,
          location: null,
        },
      }
    },
    computed: {},
    methods: {
      setLogo(val) {
        let self = this;
        self.formData.set('logo', val)
      },
      emmitLocation(val) {
        this.data.location = val.lat + ',' + val.lng
      },
      onSubmit(isBack) {
        let self = this;
        let postData = JSON.stringify(self.data);
        self.formData.set("data", postData);
        self.$store.dispatch('business/storeBusiness', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            if (isBack) {
              self.$router.go(-1)
            } else {
              self.clearForm()
            }
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
          self.data[key] = null
        }
        for (let key of self.formData.keys()) {
          self.formData.delete(key)
        }
      },
    }
  }
</script>

<style scoped>

</style>
