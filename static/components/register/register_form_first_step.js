
app.component('register-form-first-step',{
    template:
    /* html */
    `
    <div class="first-step">
        <div class="label">
            <span class="labelName">User name</span>
            <div class="input-box" id="usernameInput">
                <input type="text" v-model="username" maxlength="20" placeholder="Enter your user name">
            </div>
            <span id="usernameError">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
        </div>


        <div class="label">
            <span class="labelName">Phone Number </span>
            <div class="input-box" id="phone-input-box">
                <span style="color: #828282;">+212</span>
                <input type="number" v-model="phoneNumber" ref="phone_number" maxlength="9" placeholder="Enter your phone number">
            </div>
            <span id="phoneNumberError">Required. Must be a Valid Phone number</span>
        </div>

        <div class="label">
            <span class="labelName">City</span>
            <div class="input-box">
                <select name="" id="city" v-model="city"> 
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                    <option value="Chefchaouen">Chefchaouen</option>
                    <option value="Essaouira">Essaouira</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Ouarzazate">Ouarzazate</option>
                    <option value="Asilah">Asilah</option>
                    <option value="Tétouan">Tétouan</option>
                    <option value="Merzouga">Merzouga</option>
                    <option value="El Jadida">El Jadida</option>
                    <option value="Tinghir">Tinghir</option>
                    <option value="Ifrane">Ifrane</option>
                    <option value="Taroudant ">Taroudant</option>
                    <option value="Larache">Larache</option>
                    <option value="Aït Ben Haddou">Aït Ben Haddou</option>
                    <option value="Al Hoceïma">Al Hoceïma</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Sidi Ifni">Sidi Ifni</option>
                    <option value="Azrou">Azrou</option>
                    <option value="Béni Mellal">Béni Mellal</option>
                    <option value="Midelt">Midelt</option>
                    <option value="Safi">Safi</option>
                    <option value="Taza">Taza</option>
                    <option value="Martil">Martil</option>
                    <option value="Oued Zem">Oued Zem</option>
                    <option value="Sefrou">Sefrou</option>
                    <option value="Taourirt">Taourirt</option>
                    <option value="Guercif">Guercif</option>
                    <option value="Tiflet">Tiflet</option>
                    <option value="Ouazzane">Ouazzane</option>
                    <option value="Youssoufia">Youssoufia</option>
                    <option value="Ksar El-Kébir">Ksar El-Kébir</option>
                    <option value="Fnideq">Fnideq</option>
                    <option value="Sidi Kacem">Sidi Kacem</option>
                    <option value="Saïdia">Saïdia</option>
                    <option value="M'diq">M'diq</option>
                    <option value="Tiznit">Tiznit</option>
                    <option value="Moulay Idriss">Moulay Idriss</option>
                    <option value="Zerhoun">Zerhoun</option>
                    <option value="Guelmim">Guelmim</option>
                    <option value="Mohammédia">Mohammédia</option>
                    <option value="Imlil">Imlil</option>
                    <option value="Nador">Nador</option>
                    <option value="Berrchid">Berrchid</option>
                    <option value="Settat">Settat</option>
                    <option value="Berkane">Berkane</option>
                </select>
            </div>    
        </div>

        <p id="privacy-info" @click="validatePhoneNumber">
            We’ll text you to confirm your number. Standard message and data rates apply. Privacy Policy
        </p>


        <input type="button" class="nxt-btn" value="Next Step" @click="validateForm">
        <!--button class="nxt-btn" @click="validateForm">Next Step</!--button-->
    </div>
    `,
    data() {
        return {
            username : "",
            phoneNumber : "",
            city : "Casablanca",
        }
    },
    methods: {
        //--- Emitting Event
        sendData(user_name,phoneNumber,city){
            this.$emit("place-data",user_name,phoneNumber,city)
        }
        ,
        moveNextStep(){
            this.$emit("move-to-next-step")
        },
        //> Function For Removing Error Showing 
        removePhoneNumberError(){
            document.getElementById("phone-input-box").style.border = "2px solid #F2F2F2"
            document.getElementById("phone-input-box").style.backgroundColor = "#F2F2F2"
            document.getElementById("phoneNumberError").style.color = "#626161"
        },
        removeUserNameError(){
            document.getElementById("usernameInput").style.border = "2px solid #F2F2F2"
            document.getElementById("usernameInput").style.backgroundColor = "#F2F2F2"
            document.getElementById("usernameError").style.color = "#626161"
        },
        //> Function For Showing Error For The User
        showPhoneNumberError(){
            document.getElementById("phone-input-box").style.border = "2px solid #FF6B6B"
            document.getElementById("phone-input-box").style.backgroundColor = "#FFE4E4"
            document.getElementById("phoneNumberError").style.color = "#FF6B6B"
        },
        showUserNameError(){
            document.getElementById("usernameInput").style.border = "2px solid #FF6B6B"
            document.getElementById("usernameInput").style.backgroundColor = "#FFE4E4"
            document.getElementById("usernameError").style.color = "#FF6B6B"
        }
        //> Function For Validation 
        ,
        validatePhoneNumber(){
            var isIntNum = Number.isInteger(this.phoneNumber);
            var numLength = this.phoneNumber.toString().length;
            if (isIntNum && numLength === 9){
                return true
            }
            else{
                return false
            }
        }
        ,
        validateForm(){
            var that = this
            var username_length = this.username.length;
            var valideNumber = that.validatePhoneNumber();

            if (username_length >= 5 && valideNumber){
                that.removePhoneNumberError()
                that.removeUserNameError()

                that.sendData(this.username,this.phoneNumber,this.city)
                return that.moveNextStep()
            }
            else{
                if (username_length < 4 && !valideNumber){
                    that.showPhoneNumberError()
                    that.showUserNameError()
                }
                else if (username_length > 4 && !valideNumber){
                    that.showPhoneNumberError()
                    that.removeUserNameError()
                }

                else if (valideNumber && username_length < 4){
                    that.showUserNameError()
                    that.removePhoneNumberError()
                }
            }
            // console.log("validate the form")
        }
    }
})