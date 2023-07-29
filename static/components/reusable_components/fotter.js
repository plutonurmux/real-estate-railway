
app.component('fotter-sec',{
    template:
    /* html */
    `   
    <footer class="fotter">
        <div class="container">
            <p id="copyRight">Copyright © 2022 Real Estate World</p>

            <p>All Rights Reserved | <span>Terms and Conditions | Privacy Policy</span></p>
        </div>
    </footer>
    `
    ,
    props : ["test"]
    ,
    data() {
        return {
            // Data goes here
        }
    },
    methods: {
    }
    ,
    mounted(){
        var size_pos = this.test
        document.querySelector(".fotter").style.marginTop = `${size_pos}px`
    }
})




