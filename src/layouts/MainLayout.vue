<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space/>
        <q-btn-dropdown
          icon="account_circle"
          flat
        >
          <div class="row no-wrap q-pa-md">

            <div class="column items-center">
              <q-avatar size="72px">
                <q-img :src="$store.state.auth.user.photo"/>
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{$store.state.auth.user.name}}</div>
              <div class="q-mb-xs">{{$store.state.auth.user.phone}}</div>

              <q-btn
                @click="logout"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="250"
    >
      <q-list>
        <q-item-label
          class="text-grey-8 q-py-sm q-pl-sm"
        >
          <q-avatar size="200" class="q-mr-sm">
            <q-img src="../assets/logo.png"/>
          </q-avatar>
          <span class="text-bold text-orange">
            CloudWare
          </span>
          <span class="text-bold text-primary">
             Exchange
          </span>
        </q-item-label>

        <q-item :active="currentRoute==link.link" v-for="(link,index) in essentialLinks"
                :key="index"
                clickable
                :to="link.link"
                exact
        >
          <q-item-section
            avatar
          >
            <q-icon :name="link.icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{link.title}}</q-item-label>
            <q-item-label caption>
              {{link.caption}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {LocalStorage} from "quasar";

  export default {
    name: 'MainLayout',

    data() {
      return {
        currentRoute:'/',
        leftDrawerOpen: false,
        essentialLinks: [
          {
            title: 'Home',
            caption: 'Browse the home page',
            icon: 'home',
            link: '/'
          },
          {
            title: 'Business',
            caption: 'Manage registered business',
            icon: 'business',
            link: '/business'
          },
          {
            title: 'User',
            caption: 'Manage registered user',
            icon: 'people',
            link: '/user'
          },
          {
            title: 'Notification',
            caption: 'Manage notification',
            icon: 'notification_important',
            link: '/notification'
          },
        ]
      }
    },
    methods: {
      logout() {
        LocalStorage.remove('userInfo');
        this.$router.push('/login')
      },
    },
    async created() {
      let self = this;
      let user_info = LocalStorage.getItem('userInfo');
      await self.$store.dispatch('auth/updateUserData', user_info);
      await self.$store.dispatch('business/fetchBusiness');
    },
    updated() {
      this.currentRoute = this.$router.currentRoute.meta;
    }
  }
</script>
