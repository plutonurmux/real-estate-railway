// var csrfValue = document.getElementById("csrfValue").value

const app = Vue.createApp({
    data() {
      return {
        // Data Goes Here
        left_navbar_data : null,
        conversation_name : test_data.participate_user,
        conversation_image : test_data.image,
        conversation_last_update : test_data.last_msg_date,
        conversation_id : id_chat,
      }
    },
    methods: {
      getWidth() {
        if (self.innerWidth) {
          return self.innerWidth;
        }
        if (document.documentElement && document.documentElement.clientWidth) {
          return document.documentElement.clientWidth;
        }
        if (document.body) {
          return document.body.clientWidth;
        }
      }
      ,
      loadData(){
        fetch("/chat/conversation/")
        .then((res)=>res.json())        
        .then((res)=>{
            this.left_navbar_data = res
        }) 
      },
      openLeftnavBar(){
        var leftnavbar = document.querySelector(".conversation_section > .left_bar")
        var chatRoom = document.querySelector(".conversation_section > .conv_chat_room")
        leftnavbar.style.display = "flex"
        chatRoom.style.display = "none"
      },
      openChatRoom(){
        var leftnavbar = document.querySelector(".conversation_section > .left_bar")
        var chatRoom = document.querySelector(".conversation_section > .conv_chat_room")
        leftnavbar.style.display = "none"
        chatRoom.style.display = "flex"
      }
    }
    ,
    mounted(){
        var that = this
        that.loadData()
        setInterval(function(){
          that.loadData()
        },500)

        //> This prevent us hidding chat room when user goes from responsive to Desktop
        window.addEventListener('resize', function(event) {
          var value = that.getWidth()
          var chatRoom_tag = document.querySelector(".conversation_section > .conv_chat_room")
          var left_nav_bar = document.querySelector(".conversation_section > .left_bar")
          if (value <= 680){
            chatRoom_tag.style.display = "flex"
            left_nav_bar.style.display = "none"
          }  
          else if (value > 680){
            chatRoom_tag.style.display = "flex"
            left_nav_bar.style.display = "flex"
          }
        }, true);
    }
})










