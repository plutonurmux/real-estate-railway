
app.component('our-form',{
    template:
    /* html */
    `   
    <label for=""><p>User Name</p>
        <div class="input-box" :class={errorInput:!valideUserName}>
            <input type="text" name="" id="" v-model="username" placeholder="Enter your User Name Here" maxlength="20">
        </div>
        <span id="username-notify" v-show="!valideUserName">Must be at least 5 characters and not used name</span>
    </label>

    <label for=""><p>Location</p>
        <div class="input-box">
            <select name="" id="city" v-model="location">
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
    </label>

    <label for=""><p>Email</p>
        <div class="input-box" id="addresseBox">
            <input type="text" name="" v-model="email" readonly disabled id="" placeholder="E-mail">
        </div>
    </label>


    <label for=""><p>Bio</p>
        <div class="input-box">
            <input type="text" name="" v-model="biographie" id="" placeholder="Your bio here" maxlength="299">
        </div>
        <span id="phoneNumber-notify" v-show="!valideBio">Required. Must be at least 10 Character</span>
    </label>

    

    <label for=""><p>Phone Number</p>
        <div class="input-box">
            <input type="number" name="" v-model="phoneNumber" id="" placeholder="Enter your Phone Number">
        </div>
        <span id="phoneNumber-notify" v-show="!validePhoneNumber">Required. Must be a Valid Phone number</span>
    </label>

    <button id="pri-btn" v-if="formValide" @click="test($event)">Save Changes</button>
    <button id="pri-btn" disabled v-if="!formValide">Save Changes</button>
    `,
    emits: ["show-msg"]
    ,
    props : ["csrf_token_value"]
    ,
    data() {
        return {
            domain : "http://127.0.0.1:8000/",
            all_usernames : [],
            persData : [],

            // Data Templates
            username : "",
            location : "",
            email : "",
            biographie : "",
            phoneNumber : 691233082,
        }
    },
    methods: {  
        // Methods Goes Here
        emittingParent(res,sts){
            this.$emit("show-msg",res,sts)
        }
        ,
        test(event){
            var that = this
            event.preventDefault()
            var xhr = new XMLHttpRequest

            xhr.onload = function(){
                var response = xhr.responseText
                if (response === "The User Data Saved Successfully"){
                    that.emittingParent("Profile updated successfully","success")
                }
                else if (response === "Data Has not been saved Please Try Again!"){
                    that.emittingParent("Profile updated unsuccessfully","error")
                }
            }
            xhr.open("POST","")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(`username=${this.username}&city=${this.location}&phoneNumber=${this.phoneNumber}&biographie=${this.biographie}&csrfmiddlewaretoken=${this.csrf_token_value}`)
        }
    }
    ,
    computed:{
        userNameExist(){
            var usernames_list =  this.all_usernames
            var i = 0;
            for (i; i < usernames_list.length ; i++){
                if (usernames_list[i] === this.username.trim()){ return true } 
            }
            return false
        }
        ,
        valideUserName(){
            var that = this
            var username_exist = that.userNameExist
            var username_length = this.username.trim().length;
            if (username_length >= 5 && username_length <= 20 && !username_exist){
                return true
            }
            return false
        }
        ,
        validePhoneNumber(){
            var isIntNum = Number.isInteger(this.phoneNumber);
            var numLength = this.phoneNumber.toString().length;
            if (isIntNum && numLength === 9){ return true }
            else{ return false }
        }
        ,
        valideBio(){
            if (this.biographie.length >= 5 && this.biographie.length < 300){
                return true
            }
            return false
        }
        ,
        formValide(){
            var that = this
            valide_username = that.valideUserName
            valide_phoneNumber = that.validePhoneNumber
            valide_bio = that.valideBio

            if (valide_username && valide_phoneNumber && valide_bio){ return true }
            return false
        }
    }
    ,
    mounted(){
        var that = this
        var url = `/home/api/allusers`
        var user_data_url = `/home/api/personalInfoApi`

        new_list = []
        fetch(url)
            .then(res=>res.json())
            .then(res=>res.forEach(function(item){
                var name = item.username
                new_list.push(name)
            }))
            .then(()=>{ this.all_usernames = new_list })

        
        n_dict = {}
        fetch(user_data_url)
            .then(res=>res.json())
            .then((res)=>{
                this.persData = res
                this.username = this.persData[0].username
                this.location = this.persData[0].city
                this.email = this.persData[0].email
                this.biographie = this.persData[0].bio.substring(0,299)
                this.phoneNumber = parseInt(this.persData[0].phoneNumber)
            })
    }
})




