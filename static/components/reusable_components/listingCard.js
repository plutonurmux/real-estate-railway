app.component('listing-card',{
    template:
    /* html */
    `   
    <div class="house-card" :id="status">
        <div class="left-cont" @click="postInfoRedirect">
            <img :src="image" alt="">
        </div>

        <div class="right-cont">
            <div class="cont">
                <div class="header-post">
                    <div class="price-btn">
                        <a :href="linkPostInfo"><h2>{{price}} DH</h2></a>
                        <div class="other-options">
                            <i v-if='showdelete=="true"' class="fa-solid fa-trash" @click="deleteItem"></i>
                            <a v-if='edit=="true"' :href="editPostPage" style="margin-right: 0.8em;"><i class="fa-solid fa-pen"></i></a>
                            <svg @click="dislikePost" v-if="savedPost" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path style="fill: #DE2D7B" d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                            </svg>

                            <svg @click="likePost" v-if="!savedPost"  viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path style="fill: #a9a9a9" d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                            </svg>
                        </div>
                    </div>
                    <a :href="linkPostInfo"><h3 class="post-title">{{title.substring(0,30)}}...</h3></a>
                </div>
                <!--  -->
                <div class="bottom-post">
                    <h4>Maison & {{category}} </h4>
                    <hr>
                    <div class="location-house">
                    <img src="/media/location.png" alt="">
                        <a :href="linkPostInfo"><h3>{{location.substring(0,25)}}...</h3></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props : ["username","edit","showdelete","image","price","title","location","category","saved_people","username","identifier","status"]
    ,
    data() {
        return {
            savedPost : false,
            domain : "http://127.0.0.1:8000/"
        }
    },
    methods: {
        postInfoRedirect(){
            var url = `${this.domain}home/house/${this.identifier}`
            return window.location.assign(url)
        }
        ,
        deleteItem(){
            return this.$emit("delete-item",this.identifier)
        }
        ,
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
        likePost(){
            var that = this
            that.submitForm(this.identifier)
            return this.savedPost = true
        },
        dislikePost(){
            var that = this
            that.submitForm(this.identifier)
            return this.savedPost = false
        }
    }
    ,
    computed : {
        editPostPage(){
            return `${this.domain}home/edit/post/${this.identifier}/`
        }
        ,
        linkPostInfo(){
            return `${this.domain}home/house/${this.identifier}`
        }
    }
    ,
    mounted(){
        var people_list = this.saved_people
        var userExist = people_list.includes(this.username)
        if (userExist ===  true){
            this.savedPost = userExist
        }
    }
})