app.component('chat-room',{
    template:
    /* html */
    `   
    <div class="conv_chat_room">
        <div class="nav_user_conv">
            <div class="cont">
                <svg @click="openChatRoom" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M16.3536 4.64645C16.5488 4.84171 16.5488 5.15829 16.3536 5.35355L9.70711 12L16.3536 18.6464C16.5488 18.8417 16.5488 19.1583 16.3536 19.3536C16.1583 19.5488 15.8417 19.5488 15.6464 19.3536L8.64645 12.3536C8.45118 12.1583 8.45118 11.8417 8.64645 11.6464L15.6464 4.64645C15.8417 4.45118 16.1583 4.45118 16.3536 4.64645Z" fill="black" fill-rule="evenodd"/></svg>
                
                <a :href="profileLink"><div class="img_cont_usr">
                    <img :src="participate_image" alt="">
                </div></a>
                <div class="nav_cont">
                    <a :href="profileLink"><h3>{{participate_user}}</h3></a>
                    <h2>last message {{cpnv_lud}}</h2>
                </div>
            </div>
        </div>

        <div class="msgs_block" id="box">
            <div class="msg_chat_cont">
                <!--div class="msg_line" :class="{user_msg_request:msg.my_msg}"-->
                <div class="msg_line" v-for="msg in messages" :class="{user_msg_request:msg.my_msg}">
                    <span class="msg_cont">
                        {{msg.content}}
                    </span>
                </div>
                

            </div>
        </div>

        <div class="nav_message_input">
            <div class="cont">
                <div class="input-box-msg">
                    <input type="text" v-model="messageInput" placeholder="Type message here..." @keyup.enter="sendMessage">
                </div>
                <button id="send-msg-btn" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
    `,
    props : ["convid","data","participate_user","participate_image","cpnv_lud"]
    ,
    data() {
        return {
            // Data Goes Here
            messages : null,
            messageInput : "",

            firstDataRequest : false,
        }
    }
    ,
    methods : {
        scrollToBottom(){
            var objDiv = document.getElementById("box");
            var value = objDiv.scrollHeight
            $('#box').stop().animate({
                scrollTop: value + 10000
            }, 800);            
        }
        ,
        openChatRoom(){
            this.$emit("open-list-conversations")
        }
        ,
        reloadData(value){
            fetch(`/chat/conversation/messages/${value}/`)
            .then(res=>res.json())
            .then((res)=>{
                if (this.messages != null && this.firstDataRequest == false){
                    let oldMessageLength = (this.messages.length);
                    let requestDataLength = (res[0].length);
                    if (oldMessageLength === requestDataLength){
                        return console.log("the same data number")
                    }
                    console.log("assign data to the message data object")
                    return this.messages =  res[0];
                }
                else if (this.messages == null){
                    this.firstDataRequest = true;
                    this.messages = res[0]
                    this.firstDataRequest = false;
                }
            })
        }
        ,
        sendMessage(){
            if (this.messageInput.length > 0){
                var xhr = new XMLHttpRequest
                var url = `/chat/addMessage/${this.convid}/${this.messageInput}`
                xhr.onload = function(){
                    var res = xhr.response
                }
                xhr.open("GET",url)
                xhr.send()
                this.messageInput = ""
            }
        }
        ,
        testFunc(){
            console.log("send message")
        }
    }
    ,
    computed : {
        profileLink(){
            var url = `/account/boutique/${this.participate_user}`
            return url
        }
    }
    ,
    mounted(){
        var that = this
        var id_conversation = this.convid
        setInterval(function(){
            that.reloadData(id_conversation)
        },300)
        that.scrollToBottom()
    }
})
