<template>
  <q-btn
    dense
    round
    flat
    icon="add"
    class="cursor-pointer"
  >
    <q-popup-edit v-model="currency_data.name" ref="addCurrency">
      <q-form
        ref="formAddCurrency"
        @submit="addCurrency"
        @reset=""
      >
        <div class="row">
          <q-input
            v-model="currency_data.name"
            label="Currency name"
            placeholder="eg. Khmer Riel"
            dense
            lazy-rules
            :rules="[ val => !!val||'Please enter your name' ]"
          />
        </div>
        <div class="row">
          <q-input
            v-model="currency_data.abbr"
            label="Currency abbr"
            placeholder="eg. KHR"
            dense
            lazy-rules
            :rules="[ val => !!val||'Please enter your name' ]"
          />
        </div>
        <div class="row">
          <q-btn v-close-popup color="primary" flat label="Cancel"/>
          <q-btn color="primary" flat label="Add" @click="$refs.formAddCurrency.submit()"/>
        </div>
      </q-form>
    </q-popup-edit>
  </q-btn>
</template>

<script>
  export default {
    name: "CurrencyCreate",
    props: {
      business: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        currency_data: {
          name: null,
          abbr: null,
          business: this.business
        },
      }
    },
    methods: {
      addCurrency() {
        let self = this;
        self.$store.dispatch('currency/storeCurrency', self.currency_data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.$refs.addCurrency.cancel()
            self.clearFormCurrency()
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
      clearFormCurrency() {
        let self = this;
        for (let key of Object.keys(self.currency_data)) {
          self.currency_data[key] = null
        }
      },
    }
  }
</script>

<style scoped>

</style>
