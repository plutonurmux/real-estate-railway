
app.component('create-post-fourth-step',{
    template:
    /* html */
    `
    <div class="step-four">
        
        <div class="step-four custom__form">
            <h3 class="upload-img-not">Upload photos</h3>

            <div class="custom__image-container">
                <label id="add-img-label" for="add-single-img">
                    <i class="fa-solid fa-image" id="icon-msg"></i>
                    <h3>Add Images</h3>
                </label>
                <input type="file" id="add-single-img" @change="uploadFilesChecker" name="images" accept="image/*" multiple>
            </div>
            <br />
        </div>

        <div class="buttons" id="buttons-last">
            <p class="prv-btn" @click="goBack($event)">Back</p>
            <button class="nxt-btn" type="submit">Next</button>
        </div>
    </div>
    `
    ,
    data(){
        return{
            // Data Goes Here
        }
    }
    ,
    methods: {
        checkingImage(){
            var mime_types = [ 'image/jpeg', 'image/png' ];

            var selected_file = document.querySelector('#add-single-img');
            if(selected_file.files.length == 0) {
                alert('Please select file to upload.');
                return;
            }
            if(selected_file.files.length > 6) {
                alert('Please select Images Maximum 6 Photos');
                return;
            }
            // Get the file uploaded
            var file = selected_file.files[0];
            if(mime_types.indexOf(file.type) == -1) {
                alert('Please select jpeg or png files only.');
                return;
            }
            // max 5 MB size allowed
            if(file.size > 5*1024*1024) {
                alert('Please select file having less than 5MB size.');
                return;
            }
        }
        ,
        uploadFilesChecker(){
            var selected_file = document.querySelector('#add-single-img');

            if(selected_file.files.length == 0) {
                alert('Please select file to upload.');
            }
            else if (selected_file.files.length > 0){
                var ele = document.querySelector("#add-img-label > i")
                ele.style.transition = ".1s ease"
                ele.className = "fa-solid fa-circle-check"
                ele.style.color = "#4a3affed"

                var text = document.querySelector(".custom__image-container label h3")
                text.innerHTML = "Image Uploaded Successfully"
                text.style.textAlign = "center"
            }
        }
        ,
        goBack(event){
            event.preventDefault();

            var step4 = document.getElementById("step4");
            var step3 = document.getElementById("step3");
            var bar3 = document.getElementById("bar3");
            step3.style.border = "3px solid #4A3AFF"
            step3.style.color = "rgb(74, 58, 255)"
            step3.style.backgroundColor = "#EFF0F6"
            bar3.style.backgroundColor = "#EFF0F6"

            this.$emit("back-move","showFourth","showThird")
            
            step4.style.backgroundColor = "#EFF0F6"
            step4.style.border = "none"
            step4.style.color = "#6F6C90"
        },
        //> 
        
    },
    mounted(){
        var buttons = document.querySelector("#buttons-last.buttons")
        buttons.style.marginTop = "30px";                                             
    }
})



















// submitForm(event){
//     event.preventDefault();
//     var csrf_value = document.querySelector("input[name=csrfmiddlewaretoken]").value
//     var selected_file = document.querySelector('#add-single-img');

//     var form_data = new FormData();
//     form_data.append('images', selected_file.files[0]);

//     var that = this
//     var xhr = new XMLHttpRequest();    

//     xhr.onreadystatechange = function(){
//         var request_state = xhr.readyState;
//         if (request_state === 3){
//             console.log("Waiting For Request Processing")
//         }
//         if (request_state === 4){
//             var state = xhr.status
//             if (state === 200){
//                 var response = xhr.response;
//                 console.log(response)

//             }
//         }
//     }

//     xhr.open("POST" ,"")
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.send(`images=${form_data}&category=House&city=Casablanca&addresse=asasasa&titleAd=aaaaaaaaaaaaaaaaa&price=100000&transaction=Vente&rooms=2&etage=2&bedRoom=2&toilettes=2&living_room=2&total_surface=2&elevator=True&balcony=True&air_conditioner=True&Furnished=True&Furniture=True&Heater=True&concierge=True&terrace=True&cuisine_equipee=True&securite=True&Parking=True&csrfmiddlewaretoken=${csrf_value}`)
// }