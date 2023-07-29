
app.component('register-form-second-step',{
    template:
    /* html */
    `
    <div class="second-step">
        <div class="label">
            <span class="labelName">Email</span>
            <div class="input-box" id="emailBox">
                <input type="text" v-model="user_email" placeholder="Enter your email">
            </div>
            <span id="usernameError">Required. Must be a Valid Email</span>
        </div>


        <div class="label">
            <span class="labelName">Password</span>
            <div class="input-box" id="passwordBox">
                <input type="password" v-model="user_password" placeholder="Enter your password At least 8 chars">
            </div>
            <span id="phoneNumberError1">At least 8 characters</span><br>
            <!--span id="phoneNumberError2">Your password can’t be too similar to your other personal information.</span-->
            <!--span id="phoneNumberError3">Your password can’t be a commonly used password.</span-->
            <span id="phoneNumberError4">Your password can’t be entirely numeric.</span><br>
        </div>

        <div class="label">
            <span class="labelName">Confirm Password</span>
            <div class="input-box" id="passwordBoxConf">
                <input type="password" v-model="user_password_conf" placeholder="Enter your password Confirmation">
            </div>
            <span id="passwordConftext">Enter the same password as before, for verification.</span>    
        </div>

        <p id="privacy-info">
            We’ll text you to confirm your number. Standard message and data rates apply. Privacy Policy
        </p>

        <input type="button" class="nxt-btn" id="submit_register_btn" :disabled="btn_disabled" value="Create Account" @click="validateForm">
    </div>
    `,
    data() {
        return {
            user_email : "",
            user_password : "",
            user_password_conf : "",
            btn_disabled : false,
        }
    },
    props : ["uname","uphoneNumber","ucity","csrf_token_value"]
    ,
    methods: {
        //--- Redirecting The User
        redirectUser(pageName){
            return window.location.href = `/${pageName}`;
        },
        //--- Emitting Event
        showMessage(msg,status){
            this.$emit("display-message",msg,status)
        }
        ,
        //--- Functions For Disabling Error
        hidePasswordMatchingError(){
            var that = this
            that.hidePasswordError()

            document.getElementById("passwordBoxConf").style.backgroundColor = "#F2F2F2"
            document.getElementById("passwordBoxConf").style.border = "2px solid #F2F2F2"
            document.getElementById("passwordConftext").style.color = "#626161"
        }
        ,
        hidePasswordError(){
            document.getElementById("passwordBox").style.backgroundColor = "#F2F2F2"
            document.getElementById("passwordBox").style.border = "2px solid #F2F2F2"
            document.getElementById("phoneNumberError1").style.color = "#626161"
            //* document.getElementById("phoneNumberError2").style.color = "#626161"
            // document.getElementById("phoneNumberError3").style.color = "#626161"
            document.getElementById("phoneNumberError4").style.color = "#626161"
        }
        ,
        hideEmailError(){
            document.getElementById("emailBox").style.backgroundColor = "#F2F2F2"
            document.getElementById("emailBox").style.border = "2px solid #F2F2F2"
            document.getElementById("usernameError").style.color = "#626161"
        }
        //--- Functions For Form Validation Error
        ,
        showEmailError(){
            document.getElementById("emailBox").style.backgroundColor = "#FFE4E4"
            document.getElementById("emailBox").style.border = "2px solid #FF6B6B"
            document.getElementById("usernameError").style.color = "#FF6B6B"
        },
        showPasswordError(){
            document.getElementById("passwordBox").style.backgroundColor = "#FFE4E4"
            document.getElementById("passwordBox").style.border = "2px solid #FF6B6B"
            document.getElementById("phoneNumberError1").style.color = "#FF6B6B"
            // document.getElementById("phoneNumberError3").style.color = "#FF6B6B"
            document.getElementById("phoneNumberError4").style.color = "#FF6B6B"
        }
        ,
        showPasswordMatchingError(){
            var that = this
            that.showPasswordError()
            document.getElementById("passwordBoxConf").style.backgroundColor = "#FFE4E4"
            document.getElementById("passwordBoxConf").style.border = "2px solid #FF6B6B"
            document.getElementById("passwordConftext").style.color = "#FF6B6B"            
        }
        ,
        //--- Functions For Form Validation
        validateUserEmail(){
            var that = this
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var res = re.test(this.user_email)
            if (res){
                that.hideEmailError()
                return true
            }
            that.showEmailError()
            return false
        },
        validatePassword(){
            var that = this
            var password_length = this.user_password.length;
            var isNumber = Number.isInteger(parseInt(this.user_password));
            if (!isNumber && password_length >= 8){
                that.hidePasswordError()
                return true
            }
            that.showPasswordError()
            return false
        },
        passwordMatching(){
            var that = this
            var isNumber = Number.isInteger(parseInt(this.user_password));
            if ((this.user_password.length >= 8) && (this.user_password === this.user_password_conf) && (!isNumber)){
                that.hidePasswordMatchingError()
                return true
            }
            if (this.user_password.length == 0 || this.user_password_conf.length == 0){
                that.showPasswordMatchingError()
                return false
            }    
            else{
                that.showPasswordMatchingError()
                return false
            }
        }
        ,
        submitForm(){
            var that = this
            var xhr = new XMLHttpRequest();    

            xhr.onreadystatechange = function(){
                var request_state = xhr.readyState;
                if (request_state === 3){
                    console.log("Waiting For Request Processing")
                }
                if (request_state === 4){
                    var state = xhr.status
                    if (state === 200){
                        var response = xhr.response;
                        if (response === "User Created Succefully"){
                            that.showMessage(response,"success")

                            // Drive The User To Home Page
                            setTimeout(() => {
                                that.redirectUser("login")
                            }, 2000);
                        }
                        else if ( (response === "User Alreay Exist") || (response === "User Not Created Successfully") ){
                            that.showMessage(response,"error")

                            // Drive The User To Home Page
                            setTimeout(() => {
                                that.redirectUser("register")
                            }, 2000);
                        }
                    }
                }
            }


            xhr.open("POST","")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`username=${this.uname}&password1=${this.user_password}&password2=${this.user_password_conf}&email=${this.user_email}&phoneNumber=${this.uphoneNumber}&city=${this.ucity}&csrfmiddlewaretoken=${this.csrf_token_value}`)
        }
        ,
        validateForm(){
            var that = this
            var valideEmail = that.validateUserEmail()
            var validePassword = that.validatePassword()
            var password_matched = that.passwordMatching()


            console.log(validePassword)

            if (valideEmail && validePassword && password_matched){
                // Disable The Button When Submitting
                this.btn_disabled = true
                document.getElementById("submit_register_btn").style.backgroundColor = "#8079cf"
                that.submitForm()
                return true
            }
            return false
        }
    }
})