<style>
.form textarea,.send-button{
  border-radius: 5px;
  border: 1px solid #282828;
  vertical-align: middle;
}
.form textarea{
  width: 60%;
  padding: 0 10px;
}
.send-button{
  margin: 0 10px;
  padding: 2px 15px;
}
.date span{
  padding-left: 15px;
  color: red;
  font-size: 20px;
}

</style>

<template>
  <div>
    <header class="header">
      <h1>Chat</h1>
    </header>

    <v-list three-line>
      <template v-for="(message, index) in messages">
        <v-list-item
            :key="index"
            user
        >
          <v-list-item-avatar>
            <img :src="message.user">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle class="text--primary subheading">
              {{message.message}}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="date" style="display: flex; justify-content: flex-start; align-items: center;">
              {{message.created_at.toDate().toLocaleString()}}
              <span v-if="message.uid === userId" color="red" @click="deleteMessage(message.id)" small>×</span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="message.id"></v-divider>
      </template>
    </v-list>
  
    <!-- 入力フォーム -->
    <form action="" @submit.prevent="doSend" class="form">
      <textarea
        v-model="input" 
        @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
  import firebase from '../plugins/firebase';
  import { getAuth } from 'firebase/auth';
  import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";

  export default {
    name: "Chat",
    data() {
      return {
        messages: '',
        input: '',
        userId: ''
      }
    },
    mounted: async function() {
      this.getUserId();
      const messagesRef = collection(firebase.getFirestore(), "messages");
      const q = query(messagesRef, orderBy("created_at"));
      await onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        this.messages = data;
      });
    },
    updated() {
      this.scrollBottom();
    },
    methods: {
      scrollBottom: function() {
        this.$nextTick(() => {
          const Area = document.documentElement
          if (!Area) return
          Area.scrollTop = Area.scrollHeight
        })
      },
      getUserId: function() {
        const auth = getAuth();
        const user = auth.currentUser;
        this.userId = user.uid;
      },
      doSend: function() {
        if (this.input.length) {
          const now = new Date()
          addDoc(collection(firebase.getFirestore(), "messages"),{
            message: this.input,
            uid: this.userId,
            user: 'https://picsum.photos/50?image=' + (Math.floor(Math.random() * 400) + 1),
            created_at: now
          });
          this.input = '';
        }
      },
      deleteMessage: async function(id) {
        if (!confirm('コメントを削除してよろしいですか？')) {
          return
        }
        await deleteDoc(doc(firebase.getFirestore(), "messages", id))
      }
    }
  }
</script>
