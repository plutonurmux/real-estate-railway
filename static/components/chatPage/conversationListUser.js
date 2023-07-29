app.component('conversation-item-box',{
    template:
    /* html */
    `   
    <li>
        <div class="cont">
            <div class="img_cont_usr" id="left_nav_img">
                <img :src="userimage" alt="user_image">
            </div>

            <div class="conv_list_cont">
                <h4>{{username}}</h4>
                <span class="lst_msg_con">{{lastmsg.substring(0,15)}}...</span>
                <span>last msg at:  {{lastmsgdate}}</span>
            </div>
        </div>
    </li>
    `,
    props : ["username","userimage","lastmsg","lastmsgdate"]
    ,
    data() {
        return {
            // Data Goes Here
        }
    },
    methods: {
    }
})
