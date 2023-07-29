
app.component('register-card',{
    template:
    /* html */
    `
    <message-request v-if="show" :message="message" :status="status"></message-request>

    <div class="register-card">
        <div class="card-container">
            <h1 class="heading-card">Register Now </h1>

            <form action="" method="POST">
                <register-form-first-step @place-data="replace_data"   @move-to-next-step="move_to_second_step" v-if="show_first_step" ref="formOne"></register-form-first-step>
                <register-form-second-step @display-message="showMessage" v-if="show_second_step" :uname="user_name" :uphoneNumber="phoneNumber" :ucity="city" :csrf_token_value="csrf_token_value"></register-form-second-step>
            </form>
        </div>
    </div>
    `,
    props : ["csrf_token"]
    ,
    data() {
        return {
            show_first_step : true,
            show_second_step : false,
            //> First Form Data
            user_name : "",
            phoneNumber : null,
            city : null,
            //> CSRF TOKEN
            csrf_token_value : this.csrf_token,

            //> For Message Display
            show : false,
            message : "",
            status : null
        }
    },
    methods: {
        showMessage(msg,status){
            this.status = status
            this.message = msg
            this.show = true
            console.log(msg,status)
        },
        replace_data(username,phoneNumber,city){
            this.user_name = username
            this.phoneNumber = phoneNumber
            this.city = city
        },
        move_to_second_step(){
            this.show_first_step = !this.show_first_step
            this.show_second_step = !this.show_second_step
            document.querySelector(".register-card").style.height = "631px"
            document.querySelector(".register-card .card-container").style.height = "81%"
            document.querySelector("p#privacy-info").style.top = "0px"
        }
    }
})


