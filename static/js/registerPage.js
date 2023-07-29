var csrfVal = document.querySelector("input[name=csrfmiddlewaretoken]").value



const app = Vue.createApp({
    data() {
      return {
        csrf_token : csrfVal
      }
    },
    methods: {
    }
  })
  
