const app = Vue.createApp({
    data() {
      return {
        fname : true,
        payload : test_data,
        recommandtion_data : rec_data,
        showPhoneNumber : false,
      }
    },
    methods: {
      // Methods Goes Here
      submitForm(id){
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function(){
            var request_state = xhr.readyState;

            if (request_state === 4){
                var response = xhr.responseText
                console.log("Request Response " + response)
            }
        }
        xhr.open("GET",`/home/api/savedposts/add/${id}`)
        xhr.send()
      }
      ,
      updateLikes(state){
        var that = this
        var post_id = this.payload.id
        console.log(post_id)
        
        var user = this.payload.userAuth
        if (this.payload.saved.includes(user)){
          var new_list = []
          this.payload.saved.forEach(function(usr){
              if (usr == user){
                console.log("Skipp")
                that.submitForm(post_id)
              }
              if (usr != user){
                new_list.push(usr)
              }
          })
          this.payload.saved = new_list
        }
        else{
          this.payload.saved.push(user)
          that.submitForm(post_id)
        }
        console.log(this.payload.saved)
      }
      ,
      toggleOverlay(state){
        var body = document.body
        if (state){
          body.style.overflow = "hidden"
        }
        else{
          body.style.overflow = "auto"
        }
        this.showPhoneNumber = !this.showPhoneNumber
      }
    }
    ,
    mounted(){
      // console.log(this.fname)
    }
})


