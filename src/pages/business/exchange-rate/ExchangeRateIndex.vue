<template>
  <q-card-section>
    <q-table
      square
      class="table-virtual-scroll no-shadow"
      :data="Object.freeze(getExchangeRates)"
      :columns="columns"
      row-key="_id"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
    >
      <template v-slot:top="props">
        <span class="text-h6">
          Exchange List
        </span>
        <q-space/>
        <q-btn round color="secondary" icon="add" @click="$refs.exchangeRateCreate.show(business)"/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="_id" :props="props" class="q-gutter-x-xs">
            <q-btn size="10px" outline round color="primary" dense icon="edit" @click="$refs.exchangeRateReadUpdate.show(business,props.row)"/>
            <q-btn size="10px" outline round color="negative" dense icon="delete"
                   @click="destroy(props.row._id)"/>
          </q-td>
          <q-td key="base" :props="props">
            <q-badge outline align="middle" color="primary">
              {{props.row.base}}
            </q-badge>
          </q-td>
          <q-td key="date" :props="props">
            {{props.row.date}}
          </q-td>
          <q-td key="dateUpdate" :props="props">
            {{props.row.dateUpdate}}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <exchange-rate-create ref="exchangeRateCreate"/>
    <exchange-rate-read-update ref="exchangeRateReadUpdate"/>
  </q-card-section>
</template>

<script>
  import {date} from "quasar";
  import ExchangeRateCreate from "pages/business/exchange-rate/ExchangeRateCreate";
  import ExchangeRateReadUpdate from "pages/business/exchange-rate/ExchangeRateReadUpdate";

  export default {
    name: "UserIndex",
    components: {ExchangeRateReadUpdate, ExchangeRateCreate},
    props:{
      business:{
        type:String,
        required:true
      }
    },
    data() {
      return {
        //table
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {name: '_id', align: 'left', label: '', field: '_id'},
          {name: 'base', align: 'left', label: 'Base Currency', field: 'base', sortable: true},
          {name: 'date', align: 'left', label: 'Created Date', field: 'date', sortable: true},
          {name: 'dateUpdate', align: 'left', label: 'Updated Date', field: 'dateUpdate', sortable: true},
        ],
        //end table
      }
    },
    computed: {
      getExchangeRates() {
        let self = this;
        return self.$store.getters['exchange_rate/getExchangeRates'].map(function (x) {
          return {
            ...x,
            date: self.formatDate(x.createdAt),
            dateUpdate: self.formatDate(x.updatedAt),
          }
        })
      }
    },
    methods: {
      formatDate(timeStamp) {
        return date.formatDate(timeStamp, 'DD/MM/YYYY h:mm:ss a')
      },
      destroy(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.deleteExchangeRate(id)
        })
      },
      deleteExchangeRate(id) {
        let self = this;
        self.$store.dispatch('exchange_rate/deleteExchangeRate', id).then(function (data) {
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
      }
    }
  }
</script>

<style scoped>

</style>
