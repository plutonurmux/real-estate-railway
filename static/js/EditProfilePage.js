var csrfValue = document.querySelector("input[name=csrfmiddlewaretoken]").value

const app = Vue.createApp({
    data() {
      return {
        // Data Goes Here
        csrf_value : csrfValue,
        dataList : [],
        domain : "http://127.0.0.1:8000/",

        // Data For Messsge Component
        messageValue : "hey there",
        messageStatus : "success",
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
        },2000)
      }
    },
    mounted(){
      
    }
})
  

