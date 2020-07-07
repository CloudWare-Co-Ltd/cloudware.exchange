<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section>
        <q-table
          square
          class="table-virtual-scroll no-shadow"
          :data="getBusinesses"
          :columns="columns"
          row-key="name"
          :filter="filter"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          :virtual-scroll-sticky-size-start="48"
        >
          <template v-slot:top="props">
            <q-input class="col-md-5" outlined dense rounded v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
            <q-space/>
            <q-btn round color="secondary" icon="add" to="/business/create"/>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn size="10px" outline round color="primary" dense icon="fas fa-eye"
                       @click=""/>
                <q-btn size="10px" outline round color="negative" dense icon="delete"
                       @click="destroy(props.row._id)"/>
              </q-td>
              <q-td key="logo" :props="props">
                <q-avatar size="60px" class="shadow-1">
                  <q-img :src="props.row.logo"/>
                </q-avatar>
              </q-td>
              <q-td key="name" :props="props">
                {{props.row.name}}
              </q-td>
              <q-td key="address" :props="props">
                {{props.row.address}}
              </q-td>
              <q-td key="contact" :props="props">
                {{props.row.contact}}
              </q-td>
              <q-td key="location" :props="props">
                {{props.row.location}}
              </q-td>
              <q-td key="date" :props="props">
                {{props.row.date}}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from 'quasar'

  export default {
    name: 'BusinessIndex',
    data() {
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {name: '_id', align: 'left', label: '', field: '_id'},
          {name: 'logo', align: 'left', field: 'logo'},
          {name: 'name', align: 'left', label: 'Business Name', field: 'name', sortable: true},
          {name: 'address', align: 'left', label: 'Address', field: 'address', sortable: true},
          {name: 'contact', align: 'left', label: 'Contact', field: 'contact', sortable: true},
          {name: 'location', align: 'left', label: 'Location', field: 'location', sortable: true},
          {name: 'date', align: 'left', label: 'Registered Date', field: 'date', sortable: true},
        ],
      }
    },
    computed: {
      getBusinesses() {
        let self = this;
        return self.$store.getters['business/getBusinesses'].map(function (x) {
          return {
            ...x,
            date: self.formatDate(x.createdAt),
          }
        })
      }
    },
    methods: {
      formatDate(timeStamp) {
        return date.formatDate(timeStamp, 'DD/MM/YYYY')
      },
      destroy(id) {
        let self = this;
        self.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to process?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          self.deleteBusiness(id)
        })
      },
      deleteBusiness(id) {
        let self = this;
        self.$store.dispatch('business/deleteBusiness', id).then(function (data) {
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
