
app.component('recommandations-hero',{
    template:
    /* html */
    `
    <section id="hero-rec">
    <div class="container">
        <div class="heading">
            <h2>Recommendations</h2>
            <p>The most searched estates in Morocco.</p>
        </div>
        <div class="cities">
            <a href="/home/search/?city=Casablanca">
                <div class="card">
                    <h3>Casablanca</h3>
                    <img src="/media/casablanca.jpg" alt="">
                </div>
            </a>

            <a href="/home/search/?city=Rabat">
                <div class="card">
                    <h3>Rabat</h3>
                    <img src="/media/rabat.jpg" alt="">
                </div>
            </a>

            <a href="/home/search/?city=Agadir">
                <div class="card">
                    <h3>Agadir</h3>
                    <img src="/media/agadir.jpg" alt="">
                </div>
            </a>

            <a href="/home/search/?city=Tanger">
                <div class="card">
                    <h3>Tanger</h3>
                    <img src="/media/tanger.jpg" alt="">
                </div>
            </a>
            
            <a href="/home/search/?city=Kenitra">
                <div class="card">
                    <h3>Kénitra</h3>
                    <img src="/media/kenitra.jpg" alt="">
                </div>
            </a>

            <a href="/home/search/?city=Marrakech">
                <div class="card">
                    <h3>Marrakech</h3>
                    <img src="/media/marrakech.jpg" alt="">
                </div>
            </a>
        </div>
    </div>
</section>

    `,
    data() {
        return {
            
        }
    },
    methods: {
    }
})

