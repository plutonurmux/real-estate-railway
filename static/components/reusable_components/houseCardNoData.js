
app.component('house-card-no-data',{
    template:
    /* html */
    `
    
    <div class="house-card">
        <div class="house-img">
                <a>
                    <img src="" alt="">
                </a>
                
                <span class="icon-svd-heart">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.755836 5.40664C-0.587873 3.68273 -0.13997 1.09687 2.09955 0.234919C4.33906 -0.627034 5.68277 1.09687 6.13067 1.95883C6.57858 1.09687 8.37019 -0.627034 10.6097 0.234919C12.8492 1.09687 12.8492 3.68273 11.5055 5.40664C10.1618 7.13055 6.13067 10.5784 6.13067 10.5784C6.13067 10.5784 2.09955 7.13055 0.755836 5.40664Z" fill="#DE2D7B"/>
                    </svg>
                </span>
        </div>

        <div class="hs-inf-sec">
            <a  class="cont">
                <div class="location-info" style="background: #eaeaea">
                    <h2 style="color: #eaeaea">test test test ...</h2>
                </div>
                <h3 class="pub-title" style="background: #eaeaea;color: #eaeaea">lorem test test test ...</h3>
                <h3 class="house-price" style="background: #eaeaea;color: #eaeaea;width: 50%;">lorem test</h3>

                <div class="extra-info">
                    <div class="meter" style="background: #eaeaea">
                    </div>
                    <div class="bed-num" style="background: #eaeaea">
                    </div>
                    <div class="toilet-num" style="background: #eaeaea">
                    </div>
                </div>
            </a>
        </div>

    </div>

    `,
    data() {
        return {
            
        }
    }
})

