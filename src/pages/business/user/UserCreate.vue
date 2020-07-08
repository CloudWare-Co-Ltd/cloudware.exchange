<template>
  <q-dialog v-model="isShow">
    <q-card>
      <q-bar>
        <h6>Add User</h6>
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
  export default {
    name: "UserCreate",
    data() {
      return {
        isPwd: true,
        isBack: false,
        isShow: false,
        formData: new FormData(),
        data: {
          name: '',
          photo: null,
          phone: '',
          password: '',
          role: null,
          business: null,
        }
      }
    },
    computed:{
      getRoles(){
        return this.$store.getters['user/getRoles']
      }
    },
    methods: {
      show(business) {
        this.isShow = true
        this.data.business = business
      },
      setPhoto(val) {
        let self = this;
        self.formData.set('photo', val)
      },
      onSubmit(isBack) {
        let self = this;
        let postData = JSON.stringify(self.data);
        self.formData.set("data", postData);
        self.$store.dispatch('user/storeUser', self.formData).then(function (data) {
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
