
app.component('notify-section',{
    template:
    /* html */
    `
    <section id="notify-sec">
        <div class="container">
            <div class="heading">
                <h2>Want to sell your estate in our platform?</h2>
                <p>Easily list your home and benefit from our market</p>
            </div>

            <button id="btn-list-estate" @click="redirect_addItemPage">
                List your estate Now
            </button>
        </div>
    </section>

    `,
    data() {
        return {
        }
    },
    methods: {
        redirect_addItemPage(){
            let url = "/home/add/post";
            window.location.href = url;
        }
    }
})

