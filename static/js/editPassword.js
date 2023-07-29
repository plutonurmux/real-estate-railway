var csrfValue = document.querySelector("input[name=csrfmiddlewaretoken]").value


const app = Vue.createApp({
    data() {
      return {
        // Data Goes Here
        csrf_value : csrfValue,
        // Data For Messsge Component
        messageValue : "",
        messageStatus : null,
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
          window.location.reload(true)
        },2000)
      }

    }
})
  

