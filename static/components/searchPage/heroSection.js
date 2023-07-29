
app.component('hero-section',{
    template:
    /* html */
    `
    <section id="hero">
        <div class="hero-context">
            <h1>Let’s Find A Home That’s Perfect For You</h1>

            <div class="search-bar">
                <form action="">
                    <!--  -->
                    <div class="input-box">
                        <label for="">location
                            <select name=""  v-model="location">
                                <option value="">All</option>
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
                        </label>
                    </div>
                    <!--  -->
                    <!--  -->
                    <div class="input-box">
                        <label for="">Type
                            <select v-model="type_estate">
                                <option value="">Choose</option>
                                <option value="Appartement">Appartement</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Duplex">Duplex</option>
                            </select>
                        </label>
                    </div>
                    <!--  -->
                    <div class="input-box">
                        <label for="">Price
                            <select v-model="price_order">
                                <option value="desc">Decreasing price</option>
                                <option value="asc">Ascending price</option>
                            </select>
                        </label>
                    </div>
                    <!--  -->
                    <div class="input-box">
                        <label for="">Transaction
                            <select v-model="transaction">
                                <option value="">All</option>
                                <option value="Vente">Sell</option>
                                <option value="Location (Per Day)">Rent Per Day</option>
                                <option value="Location (Per Month)">Rent Per Month</option>
                            </select>
                        </label>
                    </div>
                    

                </form>
                <button @click="test" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i>Search</button>                        
            </div>

        </div>
    </section>   

    `,
    props : ["location_param","cat_param","ord_param","trans_param"]
    ,
    data() {
        return {
            location : "",
            type_estate : "",
            price_order : "asc",
            transaction : ""
        }
    },
    methods: {
        test(){
            const domain = document.location.hostname;
            var url = window.location.pathname;
            var page_url = domain+url
            var searchUrl = `/home/search/?city=${this.location}&category=${this.type_estate}&transaction=${this.transaction}&price=${this.price_order}`;

            window.location.assign(searchUrl)
        }
    }
    ,
    mounted(){
        this.type_estate = this.cat_param
        if (this.ord_param == ""){
            this.price_order = "asc"
        }

        else if (this.ord_param != ""){
            console.log("hey there")
            this.price_order = this.ord_param
        }
        this.location = this.location_param
        this.transaction = this.trans_param
    }
})

