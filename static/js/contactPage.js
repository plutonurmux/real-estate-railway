var csrfValueToken = document.querySelector("input[name=csrfmiddlewaretoken]").value

const app = Vue.createApp({
    data() {
      return {
        csrfValue : csrfValueToken,

        // Data For Messsge Component
        messageValue : "",
        messageStatus : "",
        showMessage : false,
      }
    },
    methods: {
      // Methods Goes Here
      showMessageFunction(msg,status){
        this.showMessage = true
        this.messageStatus = status
        this.messageValue = msg


        setTimeout(()=>{
          this.showMessage = false
          window.location.reload(true)
        },3000)


      }
    }
  })
  