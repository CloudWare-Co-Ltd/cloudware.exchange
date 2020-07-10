<template>
  <q-dialog v-model="isShow">
    <q-card>
      <q-bar>
        <h6>Update User</h6>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-gutter-y-sm">
        <div class="row q-gutter-x-xs">
          <q-file
            @input="setPhoto"
            class="col"
            square
            outlined
            v-model="data.photo"
            label="Profile"
            hint="Attach profile"
            lazy-rules
            :rules="[ val => !!val || 'Please complete the field']"
          >
            <template v-slot:prepend>
              <q-icon name="image"/>
            </template>
          </q-file>
          <q-input
            @keydown.enter="updateUser({id:data.id,data:{name:data.name}})"
            class="col"
            square
            clearable
            outlined
            v-model="data.name"
            label="Full name"
            hint="Add user full name"
            lazy-rules
            :rules="[ val => !!val||'Please enter your name' ]"
          >
            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>
          </q-input>
        </div>
        <div class="row q-gutter-x-xs">
          <q-input
            @keydown.enter="updateUser({id:data.id,data:{phone:data.phone}})"
            class="col"
            square
            clearable
            outlined
            type="number"
            v-model="data.phone"
            label="Your phone"
            hint="Add user phone"
            lazy-rules
            :rules="[ val => !!val||'Please enter your phone' ]"
          >
            <template v-slot:prepend>
              <q-icon name="call"/>
            </template>
          </q-input>
          <q-input
            @keydown.enter="updateUser({id:data.id,data:{password:data.password}})"
            autocomplete="off"
            class="col"
            square
            clearable
            outlined
            :type="isPwd ? 'password' : 'text'"
            v-model="data.password"
            label="Your Password"
            hint="Add user password"
            lazy-rules
            :rules="[val => !!val||'Please enter your password']"
          >
            <template v-slot:prepend>
              <q-icon name="lock"/>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="row q-gutter-x-xs">
          <q-select
            @input="updateUser({id:data.id,data:{role:data.role}})"
            :options="Object.freeze(getRoles)"
            class="col"
            square
            clearable
            outlined
            v-model="data.role"
            label="User role"
            hint="Select user role"
            lazy-rules
            :rules="[ val => !!val||'Please select user role' ]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-users-cog"/>
            </template>
          </q-select>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "UserReadUpdate",
    data() {
      return {
        isPwd: true,
        isShow: false,
        formData: new FormData(),
        data: {
          id: null,
          name: '',
          photo: null,
          phone: '',
          password: '',
          role: null,
          business: null,
        }
      }
    },
    computed: {
      getRoles() {
        return this.$store.getters['user/getRoles']
      }
    },
    methods: {
      show(business, data) {
        let self = this
        self.isShow = true
        self.data.id = data._id
        self.data.business = business
        self.data.name = data.name
        self.data.phone = data.phone
        self.data.role = data.role
        self.data.business = data.business
        let filename = data.photo.split('images/')[1];
        fetch(data.photo)
          .then(res => res.blob())
          .then(blob => {
            self.data.photo = new File([blob], filename, {type: 'image/' + filename.split('.')[1]})
          });
      },
      setPhoto(val) {
        let self = this;
        self.formData.set('id', self.data.id)
        self.formData.set('photo', val)
        self.$store.dispatch('user/updateUserPhoto', self.formData).then(function (data) {
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
      updateUser(data) {
        let self = this;
        self.$store.dispatch('user/updateUser', data).then(function (data) {
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
