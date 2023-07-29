app.component('conversations-listing',{
    template:
    /* html */
    `   
    <div class="left_bar">
        <div class="left_bar_header">
            <div class="cont">
                <h3>Messages</h3>
                <span class="conversation_number">{{conversationNumber}} Conversations <svg @click="emitOpenChat" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M8.64645 19.3536C8.45118 19.1583 8.45118 18.8417 8.64645 18.6464L15.2929 12L8.64645 5.35355C8.45118 5.15829 8.45118 4.84171 8.64645 4.64645C8.84171 4.45118 9.15829 4.45118 9.35355 4.64645L16.3536 11.6464C16.5488 11.8417 16.5488 12.1583 16.3536 12.3536L9.35355 19.3536C9.15829 19.5488 8.84171 19.5488 8.64645 19.3536Z" fill="black" fill-rule="evenodd"/></svg></span>
                <div class="input-search-box">
                    <input type="text" v-model="search_input" name="" placeholder="Search by name" id="">
                </div>
                <span>> Pinned</span>
            </div>
        </div>
        <!--  -->
        <div class="left_bar_conv">
            <conversation-item-box v-for="(item,index) in all_data"  @click="active_conversation(item)" :username="item.participate_user" :userimage="item.image" :lastmsg="item.last_msg" :lastmsgdate="item.last_msg_date"></conversation-item-box>
        </div>
    </div>
    `,
    props : ["data"]
    ,
    data() {
        return {
            // Data Goes Here
            navBar_data : null,
            search_input : ""
        }
    },
    methods: {
        // Methods Goes Here
        active_conversation(item){
            var id_conversation = item.conv_id
            var url = `/chat/${id_conversation}/`
            window.location.assign(url)
        }
        ,
        emitOpenChat(){
            this.$emit("open-chat-room")
            console.log("hey there")
        }
    }
    ,
    computed: {
        conversationNumber(){
            if (this.data != null){
                var that = this
                var res = that.all_data.length
                return res
            }
        }
        ,
        all_data(){
            if (this.data != null){
                var search_pattren = this.search_input.toLowerCase()
                var res = this.data.filter(function(val){
                    return val.participate_user.toLowerCase().includes(search_pattren)
                })
                this.navBar_data = res
                return res
            }
        }
    }
    ,
    mounted(){
        // Here For Testing Purposes
    }
})
