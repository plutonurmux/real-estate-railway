
app.component('navigation-sec',{
    template:
    /* html */
    `   
    <div class="profile-nav">
        <a href="/account/listing/"><button :class="{ active: activateListing}" id="myListing">My listings</button></a>
        <a href="/account/saveditem/"><button :class="{ active: activateSaved}" id="savedHome">Saved Homes</button></a>
        <a href="/account/settings/profile/"><button :class="{ active: activateAccount}" id="account">Account settings</button></a>
    </div>
    `,
    props : ["active_listing","active_saved","active_settings"]
    ,
    data() {
        return {
            activateListing : false,
            activateSaved : false,
            activateAccount : false
        }
    },
    methods: {
    }
    ,
    mounted(){
        if (this.active_listing === "true"){
            this.activateListing = true
        }
        if (this.active_saved === "true"){
            this.activateSaved = true
        }
        if (this.active_settings === "true"){
            this.activateAccount = true
        }

    }
})




