
app.component('create-post-second-step',{
    template:
    /* html */
    `
    <div class="form-step-two">
        <div class="info-data-num">
            <label for=""><p>Rooms</p>
                <div class="input-box" id="roomInpBox">
                    <input type="number" v-model="romms_num" @change="inputNumberCorrector('roomsInput','roomInpBox')" @keyup="inputNumberCorrector('roomsInput','roomInpBox')"  name="rooms" id="roomsInput"  min="0">
                </div>
            </label>

            <label for=""><p>Etage</p>
                <div class="input-box" id="etageInpBox">
                    <input type="number" v-model="etage_num" @change="inputNumberCorrector('etageInput','etageInpBox')" @keyup="inputNumberCorrector('etageInput','etageInpBox')" name="etage" id="etageInput"  min="0">
                </div>
            </label>

            <label for=""><p>Total surface</p>
                <div class="input-box" id="surfaceInpBox">
                    <input type="number" v-model="total_surface_num" @change="inputNumberCorrector('surfaceInput','surfaceInpBox')" @keyup="inputNumberCorrector('surfaceInput','surfaceInpBox')" name="total_surface" id="surfaceInput"  min="0">
                </div>
            </label>


            <label for=""><p>Toilettes</p>
                <div class="input-box" id="toilleteInpBox">
                    <input type="number" v-model="toilettes" @keyup="inputNumberCorrector('toilleteInput','toilleteInpBox')" name="toilettes" id="toilleteInput"  min="0">
                </div>
            </label>

            <label for=""><p>Living room</p>
                <div class="input-box" id="livingRoomInpBox">
                    <input type="number" v-model="living_room" @keyup="inputNumberCorrector('livingRoomInput','livingRoomInpBox')"  name="living_room" id="livingRoomInput"  min="0">
                </div>
            </label>


            <label for=""><p>Bedrooms</p>
                <div class="input-box" id="bedRoomInpBox">
                    <input type="number" v-model="bed_room" @keyup="inputNumberCorrector('bedRoomInput','bedRoomInpBox')"  name="bedRoom" id="bedRoomInput"  min="0">
                </div>
            </label>
        </div>


        <div class="other-detail">
            <h3>Other details</h3>
            <p>Select the right ones</p>

            <div class="checkboxes-cont">
                <div :class="{'has_selected' : this.select_data.has_elevator === 'True','info-check' : true}" @click="other_info_data_replacement('has_elevator')">
                    <label for="">Elevator</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_balcony === 'True','info-check' : true}" @click="other_info_data_replacement('has_balcony')">
                    <label for="">Balcony</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_furniture === 'True','info-check' : true}" @click="other_info_data_replacement('has_furniture')">
                    <label for="">Furniture</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_parking === 'True','info-check' : true}" @click="other_info_data_replacement('has_parking')">
                    <label for="">Parking</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_air_conditioner === 'True','info-check' : true}" @click="other_info_data_replacement('has_air_conditioner')">
                    <label for="">Air conditioner</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_furnished === 'True','info-check' : true}" @click="other_info_data_replacement('has_furnished')">
                    <label for="">Furnished</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_securite === 'True','info-check' : true}" @click="other_info_data_replacement('has_securite')">
                    <label for="">Sécurité</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_heater === 'True','info-check' : true}" @click="other_info_data_replacement('has_heater')">
                    <label for="">Heater</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_cuisine_equipee === 'True','info-check' : true}" @click="other_info_data_replacement('has_cuisine_equipee')">
                    <label for="">Cuisine équipée</label>
                </div>
                <div :class="{'has_selected' : this.select_data.has_terrace === 'True','info-check' : true}" @click="other_info_data_replacement('has_terrace')">
                    <label for="">Terrace</label>
                </div>
                <div v-if="hasConcierge" :class="{'has_selected' : this.select_data.has_concierge === 'True','info-check' : true}" @click="other_info_data_replacement('has_concierge')">
                    <label for="">Concierge</label>
                </div>
            </div>
        </div>


        <input type="hidden" name="elevator" v-model="select_data.has_elevator" id="id_rooms">
        <input type="hidden" name="balcony" v-model="select_data.has_balcony" id="id_rooms">
        <input type="hidden" name="Furniture" v-model="select_data.has_furniture" id="id_rooms">
        <input type="hidden" name="air_conditioner" v-model="select_data.has_air_conditioner" id="id_rooms">
        <input type="hidden" name="Furnished" v-model="select_data.has_furnished" id="id_rooms">
        <input type="hidden" name="Heater" v-model="select_data.has_heater" id="id_rooms">
        <input type="hidden" name="concierge" v-model="select_data.has_concierge" id="id_rooms">
        <input type="hidden" name="terrace" v-model="select_data.has_terrace" id="id_rooms">
        <input type="hidden" name="cuisine_equipee" v-model="select_data.has_cuisine_equipee" id="id_rooms">
        <input type="hidden" name="securite" v-model="select_data.has_securite" id="id_rooms">
        <input type="hidden" name="Parking" v-model="select_data.has_parking" id="id_rooms">




        <div class="buttons">
            <p @click="goBack" class="prv-btn">Back</p>
            <p @click="formValide" class="nxt-btn">Next</p>
        </div>

    </div>
    `,
    props : ["house_id","otherinfo"]
    ,
    data(){
        return {
            // Data Goes Here
            romms_num : 0,
            etage_num : 0,
            total_surface_num : 0,
            toilettes : 0,
            living_room : 0,
            bed_room : 0,

            select_data : {
                has_elevator : "False",
                has_balcony : "False",
                has_furniture : "False",
                has_parking : "False",
                has_air_conditioner : "False",
                has_furnished : "False",
                has_securite : "False",
                has_heater : "False",
                has_cuisine_equipee : "False",
                has_terrace : "False",
                has_concierge : "False",
            }
        }
    }
    ,
    methods: {
        //> For Selection House Feautures
        other_info_data_replacement(has_something){
            var value = this.select_data[has_something]
            if (value === "False"){
                this.select_data[has_something] = "True"
            }
            if (value === "True"){
                this.select_data[has_something] = "False"
            }
        }
        ,

        //> Input Correcter keyup
        inputNumberCorrector(ele,inpBox){
            var inputBox = document.querySelector("#"+inpBox+".input-box");
            var ourInput = document.getElementById(ele).value;

            if (ele === "surfaceInput"){
                if (ourInput < 0){
                    document.getElementById(ele).value = 0;
                    inputBox.style.border = "3px solid red"
                    setTimeout(()=>{
                        inputBox.style.border = "3px solid #685BFF"
                    },900)
                }
                else if (ourInput > 10000){
                    document.getElementById(ele).value = 10000;
                    inputBox.style.border = "3px solid red"
                    setTimeout(()=>{
                        inputBox.style.border = "3px solid #685BFF"
                    },900)
                }
                else if (ourInput > 0 && ourInput <= 10000){
                    inputBox.style.border = "3px solid #685BFF"
                }
            }
            else{
                if (ourInput < 0){
                    document.getElementById(ele).value = 0;
                    inputBox.style.border = "3px solid red"
                    setTimeout(()=>{
                        inputBox.style.border = "3px solid #685BFF"
                    },900)
                }
                else if (ourInput > 50){
                    document.getElementById(ele).value = 50;
                    inputBox.style.border = "3px solid red"
                    setTimeout(()=>{
                        inputBox.style.border = "3px solid #685BFF"
                    },900)
                }
                else if (ourInput > 0 && ourInput <= 50){
                    inputBox.style.border = "3px solid #685BFF"
                }
            }
        },

        //> For Checking Important Fields
        validateRoomInput(){
            var inputBox = document.getElementById("roomInpBox");
            var num = this.romms_num;
            if (num > 0){
                return true
            }
            else{
                inputBox.style.border = "3px solid red";
                return false
            }
        }
        ,
        validateSurfaceInput(){
            var inputBox = document.getElementById("surfaceInpBox");
            var num = this.total_surface_num;
            if (num > 0){
                return true
            }
            else{
                inputBox.style.border = "3px solid red";
                return false
            }
        },
        validateEtageInput(){
            var inputBox = document.getElementById("etageInpBox");
            var num = this.etage_num;
            if (num > 0){
                return true
            }
            else{
                inputBox.style.border = "3px solid red";
                return false
            }
        }
        ,
        //> Function For Validation
        formValide(){
            var that = this;
            var room_input_valide = that.validateRoomInput()
            var surface_input_valide = that.validateSurfaceInput()
            var etage_input_valide = that.validateEtageInput()


            if (room_input_valide && surface_input_valide && etage_input_valide){
                that.nextMove()
            }
        }
        ,
        //> Methods For Going back And Forward
        nextMove(){
            var step2 = document.getElementById("step2");
            var step3 = document.getElementById("step3");
            var bar2 = document.getElementById("bar2");
            
            step2.style.border = "none"
            step2.style.color = "white"
            step2.style.backgroundColor = "#4A3AFF"
            bar2.style.backgroundColor = "#4A3AFF"

            this.$emit("next-move","showSecond","showThird")

            step3.style.border = "3px solid #4A3AFF";
            step3.style.color = "#4A3AFF";
            step3.style.backgroundColor = "#EFF0F6";
        },
        goBack(){
            var step1 = document.getElementById("step1");
            var step2 = document.getElementById("step2");
            var bar1 = document.getElementById("bar1");
            step2.style.backgroundColor = "#EFF0F6";
            step2.style.border = "none";
            step2.style.color = "rgb(111, 108, 144)";

            this.$emit("back-move","showSecond","showFirst");

            bar1.style.backgroundColor = "#EFF0F6";
            console.log("hey there")
            step1.style.color = "rgb(74, 58, 255)";
            step1.style.border = "3px solid #4A3AFF";
            step1.style.backgroundColor = "#EFF0F6";
        }
        ,
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        ,
        getData(id){
            var that = this
            fetch(`/home/api/houseinfo/${id}`)
            .then(res=>res.json())
            .then((res)=>{
                this.romms_num = (res[0].rooms);
                this.etage_num = (res[0].etage);
                this.total_surface_num = (res[0].tSurface)
                this.toilettes = (res[0].toilettes)
                this.living_room = (res[0].living_room)
                this.bed_room = (res[0].bedRoom)
                // 
                this.select_data.has_elevator = that.capitalizeFirstLetter(res[0].selected_data.has_elevator.toString())
                this.select_data.has_balcony = that.capitalizeFirstLetter(res[0].selected_data.has_balcony.toString())
                this.select_data.has_furniture = that.capitalizeFirstLetter(res[0].selected_data.has_furniture.toString())
                this.select_data.has_parking = that.capitalizeFirstLetter(res[0].selected_data.has_parking.toString())
                this.select_data.has_air_conditioner = that.capitalizeFirstLetter(res[0].selected_data.has_air_conditioner.toString())
                this.select_data.has_furnished = that.capitalizeFirstLetter(res[0].selected_data.has_furnished.toString())
                this.select_data.has_securite = that.capitalizeFirstLetter(res[0].selected_data.has_securite.toString())
                this.select_data.has_heater = that.capitalizeFirstLetter(res[0].selected_data.has_heater.toString())
                this.select_data.has_cuisine_equipee = that.capitalizeFirstLetter(res[0].selected_data.has_cuisine_equipee.toString())
                this.select_data.has_terrace = that.capitalizeFirstLetter(res[0].selected_data.has_terrace.toString())
                this.select_data.has_concierge = that.capitalizeFirstLetter(res[0].selected_data.has_concierge.toString())
            })
        },
    }
    ,
    computed : {
        hasConcierge(){
            var value = this.otherinfo
            if (value == false){
                this.select_data.has_concierge = "False"
            }
            return this.otherinfo
        }
    }
    ,
    mounted(){
        var that = this
        that.getData(this.house_id)
    },
})


