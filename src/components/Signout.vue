<template>
  <div>
    <h1>SING OUT</h1>
    <button @click="singout">Sing out Now!!</button>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: "signout",
  methods: {
    singout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        alert("Logout!");
        this.$router.push("/signin");
      }).catch(error => {
        alert(error);
      });
    }
  }
};
</script>