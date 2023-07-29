
app.component('main-content',{
    template:
    /* html */
    `   
    <section class="main-post">
        <div class="container">
            <!--  -->
            <div class="house-img-card">
            
                <div class="dir-btns" v-if="showDirectionButtons">
                    <div class="left-icon" :class="{dis:!showLeftDirectionBtn}" @click="leftDirection">
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>

                    <div class="right-icon" :class="{dis:!showRightDirectionBtn}" @click="rightDirection">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>

                <img :src="images_array[counter]" alt="">


                <div class="saved-icon">
                    <svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.76448 12.7554C-0.37237 9.00718 0.673245 3.38487 5.90132 1.51077C11.1294 -0.36333 14.2662 3.38487 15.3119 5.25898C16.3575 3.38487 20.5399 -0.36333 25.768 1.51077C30.9961 3.38487 30.9961 9.00718 27.8592 12.7554C24.7224 16.5036 15.3119 24 15.3119 24C15.3119 24 5.90132 16.5036 2.76448 12.7554Z" fill="white" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <!--  -->
            <div class="owner-card">
                <div class="cont">
                    <div class="head-card">
                        <a :href="profileLink"><div class="image-user">
                            <img :src="owner_pic" alt="">
                        </div></a>
                        <a :href="profileLink"><h3 id="username">{{owner_name}}</h3></a>
                        <p id="bio">{{owner_bio.substring(0,85)}}...</p>
                    </div>

                    <div class="buttons">
                        <button class="phone-num-btn" @click="openOverlay">
                            <img src="/media/phoneIcon.png" alt="">
                            Phone Number
                        </button>
                        <a :href="chatLinkUrl"><button v-if="user_auth" class="chat-btn">
                            <img src="/media/chatIcon.png" alt="">
                            Chat
                        </button></a>

                        <a href="/login"><button v-if="!user_auth" class="chat-btn">
                            <img src="/media/chatIcon.png" alt="">
                            Chat
                        </button></a>
                    </div>
                </div>
            </div>
            <!--  -->
        </div>
    </section>
    `,
    props : ["images","owner_name","owner_pic","owner_bio","user_auth","owner_chat"]
    ,
    data() {
        return {
            counter : 0,
            images_array : this.images
        }
    },
    methods: {
        openOverlay(){
            this.$emit("open-overlay",true)
        },
        rightDirection(){
            var images_length = this.images_array.length-1;

            if (this.counter >= 0 && this.counter < images_length){
                this.counter = this.counter + 1
            }
        },
        leftDirection(){
            var images_length = this.images_array.length-1;

            if (this.counter > 0 && this.counter <= images_length){
                this.counter = this.counter - 1
            }
        }
    }
    ,
    computed:{
        showDirectionButtons(){
            var images_length = this.images_array.length
            if (images_length > 1){
                return true
            }
            return false
        }
        ,
        showLeftDirectionBtn(){
            if (this.counter === 0){
                return false
            }
            console.log(this.counter)
            return true
        }
        ,
        showRightDirectionBtn(){
            if (this.counter < this.images_array.length-1){
                return true
            }
            return false
        },
        chatLinkUrl(){
            if (this.owner_chat != null){
                var url = `/chat/${this.owner_chat}`
                return url
            }
            var url = `/chat/conversation/add/${this.owner_name}`
            return url
        },
        profileLink(){
            var url = `/account/boutique/${this.owner_name}`
            return url
        }
    }
})