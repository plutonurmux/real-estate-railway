
app.component('house-card',{
    template:
    /* html */
    `
    
    <div class="house-card">
        <div class="house-img">
            
                <a>
                    <img :src="this.images[counter]" alt="" @click="goInfoPage">

                    <div class="dir-btns" v-if="showDirectionButtons">

                        <div class="left-icon" :class="{dis:!showLeftDirectionBtn}" @click="leftDirection">
                            <i class="fa-solid fa-chevron-left"></i>
                        </div>

                        <div class="right-icon" :class="{dis:!showRightDirectionBtn}" @click="rightDirection">
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </a>


            
                <span v-if="username !== false" class="icon-svd-heart"  @click="savePost">
                    <svg v-if="saved_post" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style="fill: #DE2D7B" d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                    </svg>

                    <svg v-if="!saved_post" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                    </svg>
                </span>

                <!-- Add a Link for login -->
                <span v-if="username === false" class="icon-svd-heart"  @click="loginRedirect">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                    </svg>
                </span>


        </div>

        <div class="hs-inf-sec">
            <a :href="linkHouseInfo" class="cont">
                <div class="location-info">
                    <img src="/media/location.png" alt="">
                    <h2>{{location.substring(0,20)}}...</h2>
                </div>
                <h3 class="pub-title">{{title.substring(0,28)}}...</h3>
                <h3 class="house-price">{{price}} MAD</h3>

                <div class="extra-info">
                    <div class="meter">
                        <img src="/media/space.png" alt="">
                        <p>{{surface}}m2</p>
                    </div>
                    <div class="bed-num">
                        <img src="/media/bed.png" alt="">
                        <p>{{bedNum}}</p>
                    </div>
                    <div class="toilet-num">
                        <img src="/media/toilet.png" alt="">
                        <p>{{toilletes}}</p>
                    </div>
                </div>
            </a>
        </div>

    </div>

    `,
    props : ["id_house","user","saved_list","images","location","title","price","surface","bedNum","toilletes"]
    ,
    data() {
        return {
            image_url : this.images[0],
            username : this.user,
            saved_post : false,
            counter : 0,
        }
    },
    methods: {
        goInfoPage(){
            var that = this
            var url = that.linkHouseInfo
            window.location.assign(url)
        }
        ,
        loginRedirect(){
            window.location.assign("/login")
        }
        ,
        savePost(){
            this.$emit("update_house",this.id_house,!this.saved_post)
            this.saved_post = !this.saved_post
        }
        ,
        rightDirection(){
            var images_length = this.images.length-1;

            if (this.counter >= 0 && this.counter < images_length){
                this.counter = this.counter + 1
            }
        }
        ,
        leftDirection(){
            var images_length = this.images.length-1;
            if (this.counter > 0 && this.counter <= images_length){
                this.counter = this.counter - 1
            }
        }
    }
    ,
    computed : {
        linkHouseInfo(){
            var domain = `http://127.0.0.1:8000/home/house/${this.id_house}`
            return domain
        }
        ,
        showDirectionButtons(){
            var images_length = this.images.length
            if (images_length > 1){
                return true }
            return false
        }
        ,
        showLeftDirectionBtn(){
            if (this.counter === 0){ return false }
            return true
        }
        ,
        showRightDirectionBtn(){
            if (this.counter < this.images.length-1){ return true }
            return false
        }
    }
    ,
    mounted(){
        var username = this.user
        if (username !== false){
            this.saved_post = this.saved_list.includes(this.username)
        }
    }
})

