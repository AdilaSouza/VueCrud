<template>
  <div class="vue-tempalte">
    <!-- <form> -->
    <h3>Sign In</h3>

    <div class="form-group">
      <label>Email address</label>
      <input v-model="email" type="text" class="form-control form-control-lg" />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        v-model="senha"
        type="password"
        class="form-control form-control-lg"
      />
    </div>

    <button @click="this.fazerLogin" class="btn btn-dark btn-lg btn-block">
      Sign In
      <!-- <router-link to="/forgot-password"></router-link> -->
    </button>

    <p class="forgot-password text-right mt-2 mb-4">
      <router-link to="/forgot-password">Forgot password ?</router-link>
    </p>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  created() {
    this.init();
  },

  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    async enviarPostLogin(email, senha) {
      return axios.post("https://api.elcoma.com.br/api/visits/login", {
        username: email,
        password: senha,
      });
    },

    async fazerLogin() {
      // email e senha pra api
      await this.enviarPostLogin(this.email, this.senha)
        .then((resp) => {
          //sucesso salva token e redireciona
          console.log(resp);
          const token = resp.data.token;
          console.log(token);

          //salvar no store
          this.$store.dispatch("setToken", token);
          //redirecionar para app
          router.push({ path: "list" });
        })
        .catch((err) => {
          //catch da erro e mostra no alert
          alert("usuario ou senha incorretos!");
          console.log(err);
        });
    },

    async init() {
      //pega token
      const token = this.$store.state.token;
      //se tem token vai pra lista
      if (token) {
        router.push({ path: "list" });
      }
    },
  },
};
</script>