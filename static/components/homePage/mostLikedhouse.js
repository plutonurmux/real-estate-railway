
app.component('most-liked-house',{
    template:
    /* html */
    `
        <section id="hero-mst-ldh">
            <div class="container">
                <div class="heading">
                    <h2>Explore Most Liked House</h2>
                    <p>The most liked estates in Morocco</p>
                </div>

                <div  class="house-cards-cont">
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>
                    <house-card-no-data v-if="data == null"></house-card-no-data>


                    <house-card @opencard="openCard" v-for="house in data" @update_house="savingPost" :id_house="house.id" :user="house.is_auth" :saved_list="house.saved" :images="house.images" :location="house.city" :title="house.title" :price="house.price" :surface="house.tsurface" :bedNum="house.bedroom" :toilletes="house.toilettes"></house-card>
                </div>
            </div>
        </section>

    `,
    props : ["data"]
    ,
    data() {
        return {
            // Data Goes Here
            domain : "http://127.0.0.1:8000/",
        }
    },
    methods: {
        // Methods Goes Here
        openCard(){
            this.$emit("login_card_activate")
        }
        ,
        submitForm(id){
            var xhr = new XMLHttpRequest;
            xhr.onreadystatechange = function(){
                var request_state = xhr.readyState;

                if (request_state === 4){
                    var response = xhr.responseText
                    console.log(response)
                }
            }
            xhr.open("GET",`/home/api/savedposts/add/${id}`)
            xhr.send()
        }
        ,
        savingPost(id,state){
            var that = this
            var username = this.user_auth
            var house_list = this.data



            house_list.forEach(function(house){
                if (house.id === id){
                    if (state === true){
                        house.saved.push(username)
                        that.submitForm(id)
                    }
                    if (state === false){
                        var res = []
                        house.saved.forEach(function(user){
                            if (user === username){
                                console.log("Found the user")
                            }
                            if (user != username){
                                res.push(user)
                            }
                        })
                        house.saved = res
                        that.submitForm(id)
                    }
                }
            })
        }
    }
    ,
    computed : {
        noData(){
            if (this.data == null){
                return true
            }
            return false
        }
    }
})

