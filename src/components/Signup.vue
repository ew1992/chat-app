<template>
  <div>
    <h4 class="title">会員登録画面</h4>
    <div>
      <div>メールアドレス</div>
      <input class="form-input form-control" type="email" placeholder="E-mail" v-model="email" />
    </div>
    <div>
      <div>パスワード</div>
      <input class="form-input form-control" type="password" placeholder="Password" v-model="password" />
    </div>
    <button class="btn btn-info" @click="createUserAccount">会員登録</button>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: "singup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    createUserAccount() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,this.email, this.password).then(() => {
        alert("会員登録に成功しました。");
        this.$router.push("/chat");
      }).catch(() => {
        alert("会員登録に失敗しました。");
      });
    }
  }
};
</script>