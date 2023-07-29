var csrfVal = document.querySelector("input[name=csrfmiddlewaretoken]").value

const app = Vue.createApp({
  data() {
    return {
      csrfValue : csrfVal,
      test : dataTest
    }
  },
  methods: {
      
  }
})











