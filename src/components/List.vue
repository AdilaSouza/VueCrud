<template>
  <div id="list">
    <li v-for="cliente in listaDeClients" :key="cliente.id">
      {{ cliente.name }}
      <button @click="cliente.redirectGraph" class="btn btn-outline-primary">
        Grafico
      </button>
      <!-- <router-link to=/grafico/client.id>Forgot password ?</router-link> -->
    </li>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "List",
  beforeMount() {
    this.getClients(this.pegarToken());
    // this.getClients2();
  },
  methods: {
    //pega o token do store, não é assincrono
    pegarToken() {
      return this.$store.state.token;
    },

    async getClients(token) {
      console.log("token", token);
      await axios
        .get("https://api.elcoma.com.br/api/visits/get_clients", {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          this.listaDeClients = resp.data.clients.map((client) => ({
            ...client,
            redirectGraph: () => {
              router.push({ path: `/graph/${client.id}` });
            },
          }));
        })
        .catch((err) => {
          alert(err).then(() => router.push({ path: "list" }));
        });
    },
  },
  data: () => ({
    listaDeClients: [],
  }),
};
</script>