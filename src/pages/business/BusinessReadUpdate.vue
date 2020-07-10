<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section>
        <q-card flat bordered class="bg-grey-1" square>
          <q-tabs
            align="left"
            v-model="tab"
            inline-label
            class="bg-grey text-white shadow-2"
          >
            <q-tab name="home" icon="home" label="Home" no-caps/>
            <q-tab name="user" icon="people" label="User" no-caps/>
            <q-tab name="exchange-rate" icon="money" label="Exchange Rate" no-caps/>
            <q-tab name="exchange-history" icon="history" label="Exchange History" no-caps/>
            <q-tab name="payment-history" icon="payment" label="Payment History" no-caps/>
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="home" class="no-padding">
              <q-card-section>
                <div class="row q-gutter-x-sm q-mb-sm">
                  <q-input
                    @keydown.enter="updateBusiness({id:$route.params.id,data:{name:data.name}})"
                    class="col-4"
                    square
                    outlined
                    v-model="data.name"
                    label="Business Name"
                    lazy-rules
                    :rules="[ val => !!val || 'Please complete the field']"
                  />
                  <q-input
                    @keydown.enter="updateBusiness({id:$route.params.id,data:{address:data.address}})"
                    class="col"
                    square
                    outlined
                    v-model="data.address"
                    label="Business Address"
                    lazy-rules
                    :rules="[ val => !!val || 'Please complete the field']"
                  />
                  <q-input
                    @keydown.enter="updateBusiness({id:$route.params.id,data:{contact:data.contact}})"
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
            </q-tab-panel>
            <q-tab-panel name="user" class="no-padding">
              <user-index :business="$route.params.id"/>
            </q-tab-panel>
            <q-tab-panel name="exchange-rate" class="no-padding">
              <exchange-rate-index :business="$route.params.id"/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>
      <q-card-actions>
        <q-btn icon="arrow_back" dense color="grey" flat label="Go Back" no-caps v-go-back.single/>
      </q-card-actions>
    </q-card>
    <location-picker-maps @location="emmitLocation" ref="locationPicker"/>
  </q-page>
</template>

<script>
  import LocationPickerMaps from "components/LocationPicker";
  import UserIndex from "pages/business/user/UserIndex";
  import ExchangeRateIndex from "pages/business/exchange-rate/ExchangeRateIndex";

  export default {
    name: "BusinessReadUpdate",
    components: {ExchangeRateIndex, UserIndex, LocationPickerMaps},
    data() {
      return {
        isBack: false,
        formData: new FormData(),
        tab: 'home',
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
        self.formData.set('id', self.$route.params.id)
        self.formData.set('logo', val)
        self.$store.dispatch('business/updateBusinessLogo', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      emmitLocation(val) {
        let self = this;
        this.data.location = val.lat + ',' + val.lng;
        self.updateBusiness({id: self.$route.params.id, data: {location: self.data.location}})
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
      updateBusiness(data) {
        let self = this;
        self.$store.dispatch('business/updateBusiness', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
    },
    created() {
      let self = this;
      let business_id = self.$route.params.id;
      self.$store.dispatch('business/editBusiness', business_id).then(function (data) {
        let business = data.data;
        self.data.name = business.name;
        self.data.address = business.address;
        self.data.contact = business.contact;
        self.data.location = business.location;
        let filename = business.logo.split('images/')[1];
        fetch(business.logo)
          .then(res => res.blob())
          .then(blob => {
            self.data.logo = new File([blob], filename, {type: 'image/' + filename.split('.')[1]})
          });
      })
      self.$store.dispatch('user/fetchUserByBusiness',business_id)
      self.$store.dispatch('currency/fetchCurrencyByBusiness',business_id)
      self.$store.dispatch('exchange_rate/fetchExchangeRateByBusiness',business_id)
    }
  }
</script>

<style scoped>

</style>
