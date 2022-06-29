<template>
  <div id="app">
    <router-link to="/signup" v-show="!islogin">会員登録 |</router-link>
    <router-link to="/signin" v-show="!islogin">ログイン</router-link>
    <a href="#" @click="signout" v-show="islogin">ログアウト</a>
    <v-app>
      <v-container>
        <router-view />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: "app",
  data() {
    return {
      islogin: false
    }
  },
  updated: function() {
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      this.islogin = true;
    }
  },
  methods: {
    signout() {
      const ans = confirm('ログアウトしますか?');
      if(ans) {
        const auth = getAuth();
        signOut(auth).then(() => {
          this.islogin = false;
          alert("ログアウトしました");
          this.$router.push("/signin");
        }).catch(error => {
          alert(error);
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
