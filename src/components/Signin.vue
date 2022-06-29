<template>
  <div>
    <h4 class="title">ログイン画面</h4>
    <div>
      <div>メールアドレス</div>
      <input class="form-input form-control" type="email" placeholder="E-mail" v-model="email" />
    </div>
    <div>
      <div>パスワード</div>
      <input class="form-control form-input" type="password" placeholder="Password" v-model="password" />
    </div>
    <button class="btn btn-primary" @click="userSingIn">ログイン</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: "singin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    userSingIn() {
      try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,this.email, this.password).then(() => {
          alert("ログイン成功!");
          this.$router.push("/chat");
        }).catch(() => {
          alert("メールアドレスもしくはパスワードが違います");
          this.password = "";
        });
      } catch (e) {
        alert("メールアドレスもしくはパスワードが違います");
      }
    }
  }
};
</script>