
app.component('boutique-card',{
    template:
    /* html */
    `
    <section id="profile-info-user">
        <div class="card-user">
            <div class="user-prf-picture">
                <img :src="image_url" alt="">
            </div>
            <div class="user-prf-picture" v-if="image_url == null" style="background: #eaeaea;color: #eaeaea">
                <img :src="image_url" alt="">
            </div>

            <h2>Boutique {{boutique_name}} (ID:{{profile_id}})</h2>
            <h2 v-if="boutique_name==null" style="background: #eaeaea;color: #eaeaea">lorem test test test </h2>
            
            <p>{{boutique_bio.substring(0,300)}}</p>
            <p v-if="boutique_bio == null" style="background: #eaeaea;color: #eaeaea">lorem test test test lorem test test test .. lorem test test test lorem test test test ..lorem test test test lorem test test test ..lorem test test test lorem test test test ..lorem test test test lorem test test test ..lorem test test test lorem test test test ..lorem test test test lorem test test test .. lorem test test test lorem test test test ..</p>
            <div class="buttons-prf">
                <button @click="openOverlay" class="btn_prf" id="phone_btn">
                    Phone Number                        
                </button>

                <button @click="chatRedirect" v-if="userauth && !myBoutiquePage" class="btn_prf" id="chat_btn">
                    Chat                      
                </button>
                
                <button v-if="userauth && myBoutiquePage" class="btn_prf" :class="{ disable: myBoutiquePage }" id="chat_btn">
                    Chat                    
                </button>

                <button @click="loginRedirect" v-if="!userauth" class="btn_prf" id="chat_btn">
                    Chat                       
                </button>
            </div>
        </div>
    </section>
    `,
    props : ["profile_id","userauth"]
    ,
    data() {
        return {
            image_url : null,
            boutique_name : null,
            boutique_bio : "",
            boutique_chat : null,
            boutique_phone_number : null
        }
    },
    methods: {
        // updateParent Component Data 
        overLayData(data){
            this.$emit("overlay-data-update",data)
        },
        openOverlay(){
            this.$emit("open-overlay")
        }
        ,
        chatRedirect(){
            if (this.boutique_chat != null){
                var url = `http://127.0.0.1:8000/chat/${this.boutique_chat}`
                return window.location.assign(url)
            }
            var url = `http://127.0.0.1:8000/chat/conversation/add/${this.boutique_name}`
            return window.location.assign(url)
        }
        ,
        loginRedirect(){
            return window.location.assign("/login")
        }
    }
    ,
    computed : {
        myBoutiquePage(){
            var boutiqueName = this.boutique_name
            var user_request = this.userauth
            if (boutiqueName == user_request){
                return true
            }
            return false
        }
    }
    ,
    mounted(){
        var that = this
        var url = `http://127.0.0.1:8000/home/api/boutique/info/${this.profile_id}`
        fetch(url)
            .then(res=>res.json())
            .then((res)=>{
                this.image_url = res[0].image
                this.boutique_name = res[0].username
                this.boutique_bio = res[0].bio
                this.boutique_chat = res[0].chat_info
                this.boutique_phone_number = res[0].phoneNumber


                that.overLayData({
                    "name" : this.boutique_name,
                    "phone_number" : this.boutique_phone_number,
                })
            })
    }
})

