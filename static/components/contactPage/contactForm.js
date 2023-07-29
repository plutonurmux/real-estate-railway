
app.component('contact-form',{
    template:
    /* html */
    `
    <form method="POST">
        <div class="row">
            <label for="">
                <p>Your Name</p>
                <div class="input-box" id="usernameInputBox">
                    <input type="text" name="username_msg" v-model="username" @keyup="usernameChecker" maxlength="20" placeholder="Enter your name" id="">
                </div>
            </label>

            <label for="">
                <p>Your Email</p>
                <div class="input-box" id="emailInputBox">
                    <input type="text" name="email_msg" v-model="user_email" @keyup="emailChecker" placeholder="Enter your email" id="">
                </div>
            </label>
        </div>

        <label for="">
            <p>Subject</p>
            <div class="input-box">
                <select name="subject_msg" id="" v-model="subject_msg">
                    <option value="Bug problem">Bug problem</option>
                    <option value="partnership">partnership</option>
                    <option value="Just Saying Hello">Just Saying Hello</option>
                </select>
            </div>
        </label>

        <label for="">
            <p>Message</p>
            <div class="input-box" id="messageBox">
                <textarea name="content_msg" id="" v-model="contact_message" @keyup="messageChecker" cols="30" rows="10" placeholder="Let us know your message about"></textarea>
            </div>
        </label>

        <button id="pri" v-if="!formValid" disabled>Enter Valid Inputs</button>
        <button id="pri" v-if="formValid" type="submit" @click="submitForm($event)">Send Message</button>
    </form>
    `,
    props : ["csrf_token_value"]
    ,
    data() {
        return {
            disabled : true,
            username : "",
            user_email : "",
            subject_msg : "Bug problem",
            contact_message : "",
        }
    },
    methods: {
        emittingParent(res,sts){
            this.$emit("show-msg",res,sts)
        }
        ,
        submitForm(event){
            var that = this
            event.preventDefault()
            var xhr = new XMLHttpRequest();

            document.getElementById("pri").style.backgroundColor = "#4a3aff9c"
            document.getElementById("pri").innerHTML = "Please Wait..."

            xhr.onload = function(){
                var response = xhr.responseText
                if (response == "Your Message Has Been Sent Succefully"){
                    return that.emittingParent(response,"success")
                }
                else{
                    return that.emittingParent(response,"error")
                }
            }
            xhr.open("POST","")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(`username_msg=${this.username}&email_msg=${this.user_email}&subject_msg=${this.subject_msg}&content_msg=${this.contact_message}&csrfmiddlewaretoken=${this.csrf_token_value}`)
        }
        ,
        emailChecker(){
            var that = this
            var ele = document.querySelector("#emailInputBox.input-box")
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var res = re.test(this.user_email)
            if (res){
                ele.style.border = "2px solid #4A3AFF"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return true
            }
            else{
                ele.style.border = "2px solid red"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return false
            }
        }
        ,
        usernameChecker(){
            var username_length = this.username.length
            ele = document.querySelector("#usernameInputBox.input-box")
            if (username_length >= 5){
                ele.style.border = "2px solid #4A3AFF"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return true
            }
            else if (username_length >= 0 || username_length < 5){
                ele.style.border = "2px solid red"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return false
            }
        }
        ,
        messageChecker(){
            var message_length = this.contact_message.length;
            var ele = document.querySelector("#messageBox.input-box")

            if (message_length >= 8){
                ele.style.border = "2px solid #4A3AFF"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return true
            }
            else if (message_length >= 0 || message_length < 5){
                ele.style.border = "2px solid red"
                setTimeout(function(){
                    ele.style.border = "2px solid #F2F2F2";
                },3000)
                return false
            }
        }
    }
    ,
    computed : {
        username_isvalid(){
            var username_length = this.username.length
            if (username_length >= 5){
                return true
            }
            else if (username_length >= 0 || username_length < 5){
                return false
            }
        }
        ,
        email_isvalid(){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var res = re.test(this.user_email)
            if (res){
                return true
            }
            else{
                return false
            }
        }
        ,
        message_isvalid(){
            var message_length = this.contact_message.length;
            if (message_length >= 8 && message_length < 750){
                return true
            }
            else{
                return false
            }
        }
        ,
        formValid(){
            var that = this
            var valide_username = that.username_isvalid
            var valide_email = that.email_isvalid
            var valide_message = that.message_isvalid

            if (valide_username === true && valide_email === true && valide_message === true){
                return true
            }
            return false
        }
    }
    ,
    mounted(){
        console.log(this.csrf_token_value)
    }
})

