<template>
  <div>
    
    <v-row no-gutters>
      <v-col cols="3">
        <v-navigation-drawer class="deep-purple accent-4"  width="100%" dark permanent >
          <v-list dense rounded >
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              link
              @click="logout(item.title)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <v-col cols="9">
        <div>
          <v-app-bar color="gray" dense >
            <v-spacer></v-spacer>

            <v-menu
              left
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout('Logout')">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      menuItems: [
          { title: this.username, icon: 'mdi-view-dashboard' },
          { title: 'Dashboard', icon: 'mdi-forum' },
          { title: 'Logout', icon: 'mdi-forum' },
        ],
    }
  },
  mounted() {
    this.menuItems[0].title = this.username;
  },
  computed: {
    ...mapState(["isLoggedIn", "username"])
  },
  methods: {
    ...mapMutations(["clearLoginData"]),

    logout(title) {
      if(title == 'Logout') {
        localStorage.removeItem("loginData");
        this.clearLoginData(true);
        this.$router.push({name: 'Login'})
      }

    }
  }
  
}
</script>
<style scoped>
  .w-100 {
    width: 100%;
  }
</style>