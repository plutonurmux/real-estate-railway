var csrfVal = document.querySelector("input[name=csrfmiddlewaretoken]").value

app.component('overlay-login',{
    template:
    /* html */
    `   
    <div class="overlay" @click.self="closeOverlay">
        <div class="container">
            <login-card :csrfval="csrfValue_token"></login-card>
        </div>
    </div>
    `,
    data() {
        return {
            csrfValue_token : csrfVal
        }
    },
    methods: {
        //> Methods Goes Here
        closeOverlay(){
            this.$emit("closeoverlay")
        }
    }
    ,
    mounted(){
        var body = document.body
        body.style.overflow = "hidden"        
    }
    ,
    unmounted(){
        var body = document.body
        body.style.overflow = "auto"
    }
})



