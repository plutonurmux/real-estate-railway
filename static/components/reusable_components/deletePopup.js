
app.component('delte-popup',{
    template:
    /* html */
    `   
    <div class="overlay" @click.self="closeOverlay">
        <div class="card">
            <div class="container-card">
                <img src="/media/delete-icon.png" alt="">
                <h3>Deleting Post Id {{identifier}}</h3>
                <p>Are you sure you want to delete this post Once deleted they cannot be recovered</p>

                <div class="buttons">
                    <button class="btn" id="cancel-btn" @click.self="closeOverlay">Cancel</button>
                    <a :href="deletePostUrl"><button class="btn" id="delete-btn">Yes! Delete</button></a>
                </div>
            </div>
        </div>
    </div>
    `,
    props : ["identifier","yvalue"]
    ,
    data() {
        return {
            // Data Goes Here
            domain : "/"
        }
    },
    methods: {
        closeOverlay(){
            this.$emit("close-overlay",false)
        }    
    }
    ,
    computed : {
        deletePostUrl(){
            return `${this.domain}home/delete/post/${this.identifier}/`
        }
    }
    ,
    mounted(){
        var body = document.body
        var overlayElement = document.querySelector(".overlay")
        var hiddenInput_value = document.getElementById("yvalueInput").value
        body.style.overflowY = "hidden"
        overlayElement.style.top = `${hiddenInput_value}px`
    }
    ,
    unmounted(){
        var body = document.body
        body.style.overflow = "auto"
    }
})




