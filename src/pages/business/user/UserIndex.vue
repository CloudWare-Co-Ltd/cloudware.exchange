<template>
  <q-card-section>
    <q-table
      square
      class="table-virtual-scroll no-shadow"
      :data="Object.freeze(getUsers)"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
    >
      <template v-slot:top="props">
        <span class="text-h5">
          User List
        </span>
        <q-space/>
        <q-btn round color="secondary" icon="add" @click="$refs.userCreate.show(business)"/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="_id" :props="props" class="q-gutter-x-xs">
            <q-btn size="10px" outline round color="primary" dense icon="edit" @click="$refs.userReadEdit.show(business,props.row)"/>
            <q-btn size="10px" outline round color="negative" dense icon="delete"
                   @click="destroy(props.row._id)"/>
          </q-td>
          <q-td key="photo" :props="props">
            <q-avatar size="60px" class="shadow-1">
              <q-img :src="props.row.photo"/>
            </q-avatar>
          </q-td>
          <q-td key="role.value" :props="props">
            <q-badge outline align="middle" color="primary">
              {{props.row.role.label}}
            </q-badge>
          </q-td>
          <q-td key="name" :props="props">
            {{props.row.name}}
          </q-td>
          <q-td key="phone" :props="props">
            {{props.row.phone}}
          </q-td>
          <q-td key="date" :props="props">
            {{props.row.date}}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <user-create ref="userCreate"/>
    <user-read-edit ref="userReadEdit"/>
  </q-card-section>
</template>

<script>
  import {date} from "quasar";
  import UserCreate from "pages/business/user/UserCreate";
  import UserReadEdit from "pages/business/user/UserReadEdit";

  export default {
    name: "UserIndex",
    components: {UserReadEdit, UserCreate},
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
          {name: 'photo', align: 'left', field: 'photo'},
          {name: 'role.value', align: 'left', label: 'Role', field: 'role.value', sortable: true},
          {name: 'name', align: 'left', label: 'Full Name', field: 'name', sortable: true},
          {name: 'phone', align: 'left', label: 'Phone No', field: 'phone', sortable: true},
          {name: 'date', align: 'left', label: 'Registered Date', field: 'date', sortable: true},
        ],
        //end table
      }
    },
    computed: {
      getUsers() {
        let self = this;
        return self.$store.getters['user/getUsers'].map(function (x) {
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
          self.deleteUser(id)
        })
      },
      deleteUser(id) {
        let self = this;
        self.$store.dispatch('user/deleteUser', id).then(function (data) {
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
