
app.component('edit-info-form-sec',{
    template:
    /* html */
    `   
    <label for=""><p>Actually Password</p>
        <div class="input-box" v-if="show_act_password">
            <input type="text"  name="" v-model="actuall_password" placeholder="Enter your Actuall Password">
            <i @click="toggleActPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye-slash"></i>
        </div>

        <div class="input-box" v-if="!show_act_password">
            <input type="password"  name="" v-model="actuall_password" placeholder="Enter your Actuall Password">
            <i @click="toggleActPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye"></i>
        </div>

        <span id="actPass-notify" v-show="!valide_actually_password">Your password is too short. It must contain at least 8 characters & maximum 15</span>
    </label>

    <label for=""><p>New Password</p>
        <div :class="{'input-box':true,has_error:!passwordMatching}" v-if="show_new_password" id="newPasswordBox">
            <input type="text" name="" v-model="new_password" placeholder="Enter your New Password">
            <i @click="toggleNewPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye-slash"></i>
        </div>
        <div :class="{'input-box':true,has_error:!passwordMatching}" v-if="!show_new_password" id="newPasswordBox">
            <input type="password" name="" v-model="new_password" placeholder="Enter your New Password">
            <i @click="toggleNewPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye"></i>
        </div>

        <span id="newPass-notify" v-show="!valide_new_password">Your password is too short. It must contain at least 8 characters & maximum 15</span>
    </label>

    <label for=""><p>Confirm Password</p>
        <div :class="{'input-box':true,has_error:!passwordMatching}" v-if="show_conf_password" id="confPasswordBox">
            <input type="text" name="" v-model="conf_password" placeholder="Enter The Same Password">
            <i @click="toggleConfPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye-slash"></i>
        </div>

        <div :class="{'input-box':true,has_error:!passwordMatching}" v-if="!show_conf_password" id="confPasswordBox">
            <input type="password" name="" v-model="conf_password" placeholder="Enter The Same Password">
            <i @click="toggleConfPassword($event)" style="font-size:20px;color: #333333;" class="fa-regular fa-eye"></i>
        </div>
        <span id="conf-notify" v-show="!valide_conf_password">Your password is too short. It must contain at least 8 characters. & maximum 15</span>
    </label>

    <button id="pri-btn" disabled v-if="!formValid">Save Changes</button>
    <button id="pri-btn" v-if="formValid" @click="submitForm">Save Changes</button>
    `,
    emits: ["show-msg"]
    ,
    props : ["csrf_token_value"]
    ,
    data() {
        return {
            //> Data Templates
            actuall_password : "",
            new_password : "",
            conf_password : "",


            //> Show Password Toggle
            show_act_password : false,
            show_new_password : false,
            show_conf_password : false,
        }
    },
    methods: {  
        // Methods Goes Here
        toggleActPassword(event){
            event.preventDefault()
            return this.show_act_password = !this.show_act_password
        },
        toggleNewPassword(event){
            event.preventDefault()
            return this.show_new_password = !this.show_new_password
        }
        ,
        toggleConfPassword(event){
            event.preventDefault()
            return this.show_conf_password = !this.show_conf_password
        }
        ,
        // Submitting
        emittingParent(res,sts){
            this.$emit("show-msg",res,sts)
        }
        ,
        submitForm(event){
            var that = this
            event.preventDefault()
            var xhr = new XMLHttpRequest();

            document.getElementById("pri-btn").style.backgroundColor = "#4a3aff9c"

            xhr.onload = function(){
                var response = xhr.responseText
                if (response == "Data has been saved successfully"){
                    that.emittingParent(response,"success")
                }
                else{
                    that.emittingParent(response,"error")
                }
            }

            xhr.open("POST","")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(`actuall_password=${this.actuall_password}&new_password=${this.new_password}&confirmation_password=${this.conf_password}&csrfmiddlewaretoken=${this.csrf_token_value}`)
        }
    },
    computed:{
        // Computed Proprety Goes Here
        valide_actually_password(){
            var password_length = this.actuall_password.length;
            if (password_length < 8 || password_length > 15){
                return false
            }
            return true
        }
        ,
        valide_new_password(){
            var password_length = this.new_password.length;
            if (password_length < 8 || password_length > 15){
                return false
            }
            return true
        }
        ,
        valide_conf_password(){
            var password_length = this.conf_password.length;
            if (password_length < 8 || password_length > 15){
                return false
            }
            return true
        }
        ,
        passwordMatching(){
            var password1 = this.new_password
            var password2 = this.conf_password
            if (password1 == password2){
                return true
            }
            return false 
        }
        ,
        formValid(){
            var that = this
            var act_pass_valid = that.valide_actually_password
            var new_pass_valid = that.valide_new_password
            var conf_pass_valid = that.valide_conf_password
            var password_match = that.passwordMatching

            if (act_pass_valid && new_pass_valid && conf_pass_valid && password_match){
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




