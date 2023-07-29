
app.component('overlay-sec',{
    template:
    /* html */
    `   
    <div class="overlay" @click.self="closeOverlay">
        <div class="card">
            <div class="container">
                <img src="/media/notify.png" alt="">
                <h3 id="attention">Attention !</h3>
                <p>You should never send money in advance to the seller by bank transfer or through a money transfer agency when purchasing goods available on the site.</p>
                <h3 id="callUser">Call {{this.phoneNumber.name}}</h3>
                <a :href="phoneNumberCall" style="display:block"><button id="call-btn">
                    <img src="/media/phoneIconBlue.png" alt="">
                    0{{phoneNumber.phone_number}}
                </button></a>
            </div>
        </div>
    </div>
    `,
    props : ["data"]
    ,
    data() {
        return {
            phoneNumber : this.data 
        }
    },
    methods: {
        closeOverlay(){
            this.$emit("close-overlay",false)
        }
    }
    ,
    computed : {
        phoneNumberCall(){
            var value = this.phoneNumber.phone_number
            return `tel:0${value}`
        }
    }
    ,
    mounted(){
        console.log(this.data)
    }
})




