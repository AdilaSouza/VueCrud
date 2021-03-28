
<template>
  <BarChart
    :datasets="this.mountChartDataActual()"
    :labels="this.mountChartLabes()"
    :height="500"
    :width="500"
  ></BarChart>
</template>

<script>
import axios from "axios";
import BarChart from "./customChart";
import router from "../router";
// import Chart from "chart.js";
export default {
  components: { BarChart },
  name: "Grafico",

  beforeMount() {
    // console.log(this.$route.params);
    this.init();
  },
  methods: {
    async init() {
      await this.updatChartsData(this.pegarToken(), this.$route.params.id);
    },

    updatChartsData(token, id) {
      if(!token){
        alert('você não está logado. Clique ok para seguir para login!')
        router.push({ path: "/" });
        return;
      }
      
      axios
        .get(`https://api.elcoma.com.br/api/visits/get_client_data/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          this.datasets = [
            {
              backgroundColor: this.datasets.backgroundColor,
              label: `Dados do client ${id}`,
              data: [...resp.data.data],
            },
          ];
        })
        .catch((err) => alert(err));
    },

    pegarToken() {
      return this.$store.state.token;
    },
    mountChartDataActual() {
      return this.datasets;
    },
    mountChartLabes() {
      return this.labels;
    },
  },
  data: () => ({
    datasets: [
      {
        label: "Data Default",
        backgroundColor: [
          "#41B883",
          "#E46651",
          "#00D8FF",
          "red",
          "yellow",
          "gray",
          "blue",
          "purple",
          "green",
          "gray",
          "black",
          "gray",
        ],
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    ],
    labels: [
      "um",
      "dois",
      "tres",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
      "dez",
      "onze",
      "doze",
    ],
  }),
};
</script>
