<template>
  <q-page class="flex flex-center" padding style="background-image: url(auth-bg.jpg);background-position: center; background-repeat: no-repeat;background-size: cover;">
    <q-card
      square
      flat
      style="width: 500px" :class="!$q.screen.gt.sm?'full-width':''"
    >
      <q-card-section class="text-center">
        <q-avatar class="shadow-10 q-mb-lg" size="130px">
          <q-img src="../../assets/logo.png"/>
        </q-avatar>
        <q-banner class="bg-transparent q-mb-lg">
          Login to your account
        </q-banner>
        <q-form
          @submit="onSubmit"
          @reset=""
          class="q-gutter-y-lg"
        >
          <q-input
            square
            clearable
            outlined
            type="number"
            v-model="data.phone"
            label="Your Phone"
            hint="Please enter your phone"
            lazy-rules
            autofocus
            :rules="[ val => !!val||'Please enter your phone' ]"
          >
            <template v-slot:prepend>
              <q-icon name="call" />
            </template>
          </q-input>

          <q-input
            square
            clearable
            outlined
            :type="isPwd ? 'password' : 'text'"
            v-model="data.password"
            label="Your Password"
            hint="Please enter your password"
            lazy-rules
            :rules="[val => !!val||'Please enter your password']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="text-left">
            <q-btn color="primary" label="Register?" no-caps to="register" flat/>
          </div>
          <div class="text-right">
            <q-btn label="Login" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        isPwd: true,
        data:{
          phone:'',
          password:'',
          remember_me:false
        }
      }
    },
    methods:{
      onSubmit () {
        let self = this;
        self.$store.dispatch('auth/login',self.data).then(function (data) {
          if (data.status){
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.$router.push('/')
          }else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
          if (!data){
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Please check input again!'
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
