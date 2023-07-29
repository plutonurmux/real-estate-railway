
app.component('pagination-section',{
    template:
    /* html */
    `
    <section id="buttons-section" @click="test">
            <div class="cont">
                <span v-if="prev">
                    <a :href="backForward"><button class="pg-prv"><i style="margin-right: 0.5em;" class="fa-solid fa-angle-left"></i>Previous</button></a>
                </span>
                <span v-if="!prev">
                    <button disabled class="pg-prv"><i style="margin-right: 0.5em;" class="fa-solid fa-angle-left"></i>Previous</button>
                </span>
                <span v-if="next">
                    <a :href="goForward"><button style="display:flex;align-items:center" class="pg-nxt">Next<i style="margin-left: 0.5em;" class="fa-solid fa-angle-right"></i></button></a>
                </span>
                <span v-if="!next">
                    <button style="display:flex;align-items:center" disabled class="pg-nxt">Next<i style="margin-left: 0.5em;" class="fa-solid fa-angle-right"></i></button>
                </span>

            </div>
    </section>
    `,
    props : ["next","prev","page","url_path"]
    ,
    data() {
        return {
        }
    },
    methods: {
        test(){
            
        }
    },
    computed : {
        goForward(){
            try{
                const domain = this.url_path;
                const page_url = window.location.href;
                var search_term = page_url.split("?")[1]
                var res = search_term.split("&page")[0]
    
                var res_url = `${domain}?${res}&page=${this.page+1}`
                console.log(res_url)
                return res_url
            }
            catch{
                const domain = `${this.url_path}?page=${this.page+1}`;
                return domain
            }
            
        },
        backForward(){
                const domain = this.url_path;
                const page_url = window.location.href;
                var res_url = `${domain}?&page=${this.page-1}`
                console.log(res_url)
                return res_url
        }
    }
    ,
    mounted(){
        console.log(this.url_path)
    }
})

