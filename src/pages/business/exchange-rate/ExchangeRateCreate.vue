<template>
  <q-dialog v-model="isShow">
    <q-card>
      <q-bar>
        <h6>Add Exchange Base</h6>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form
          ref="addForm"
          @submit="onSubmit(isBack)"
          @reset=""
          class="q-gutter-y-lg"
        >
          <div class="row q-gutter-x-xs">
            <q-select
              class="col-12"
              v-model="data.base"
              use-input
              input-debounce="0"
              label="Base Currency"
              :options="base_option"
              @filter="filterFn"
              lazy-rules
              :rules="[ val => !!val||'Please enter your name' ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <currency-create :business="data.business"/>
              </template>
            </q-select>
          </div>
          <q-list bordered separator dense class="no-margin">
            <q-item-label class="row" header>
              <q-space/>
              <q-btn round color="secondary" dense icon="add" class="cursor-pointer" @click="plusRate"/>
            </q-item-label>
            <q-item v-for="(item,index) in data.rate" :key="index">
              <q-item-section>
                <q-select
                  class="full-width"
                  v-model="item.currency"
                  use-input
                  input-debounce="0"
                  label="Base Currency"
                  :options="base_option"
                  @filter="filterFn"
                  lazy-rules
                  :rules="[ val => !!val||'Please enter your name' ]"
                  dense
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <currency-create :business="data.business"/>
                  </template>
                </q-select>
              </q-item-section>
              <q-item-section>
                <q-input
                  class="full-width"
                  v-model="item.rate"
                  label="Rate"
                  type="number"
                  dense
                  min="0"
                  lazy-rules
                  :rules="[ val => !!val||'Please enter your name' ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="money"/>
                  </template>
                </q-input>
              </q-item-section>
              <q-item-section side>
                <q-icon v-if="data.rate.length!==1" color="negative" name="delete" class="cursor-pointer"
                        @click="minusRate(index)"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-actions class="bg-grey-3">
        <q-btn class="q-ml-sm" icon="close" dense label="Save and Close" color="primary" no-caps
               @click="$refs.addForm.submit();isBack=true"/>
        <q-btn icon="save" dense color="secondary" label="Save" no-caps @click="$refs.addForm.submit();isBack=false"/>
        <q-btn icon="close" dense color="grey" flat label="Close" no-caps v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import CurrencyCreate from "pages/business/exchange-rate/CurrencyCreate";

  export default {
    name: "ExchangeRateCreate",
    components: {CurrencyCreate},
    data() {
      return {
        isPwd: true,
        isBack: false,
        isShow: false,
        formData: new FormData(),
        data: {
          base: null,
          rate: [{currency: null, rate: null}],
          business: null,
        },
        base_option: []
      }
    },
    computed: {
      getCurrencies() {
        return this.$store.getters['currency/getCurrencies'].map(function (x) {
          return x.abbr
        })
      }
    },
    methods: {
      show(business) {
        this.isShow = true
        this.data.business = business
      },
      plusRate() {
        let self = this;
        self.data.rate.push({currency: null, rate: null})
      },
      minusRate(index) {
        let self = this;
        self.data.rate.splice(index, 1)
      },
      onSubmit(isBack) {
        let self = this;
        self.$store.dispatch('exchange_rate/storeExchangeRate', self.data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            if (isBack) {
              self.isShow = false;
              self.clearForm()
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
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.base_option = this.getCurrencies
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          this.base_option = this.getCurrencies.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
      clearForm() {
        let self = this;
        for (let key of Object.keys(self.data)) {
          self.data[key] = null
        }
        self.data.rate = [{currency: null, rate: null}]
      },
    }
  }
</script>

<style scoped>

</style>
