import React from 'react';
import chplay_qr from "../images/chplay_baemin.png"
import appstore_qr from "../images/appstore_baemin.png"
import ggplay from "../images/get_on_ggplay.png"
import appstore from "../images/get_on_appstore.png"

function App() {
  return (
    <div>
        <h1 style={{ color:"#E43D91"}}>Bạn quá bận để ra ngoài sao? Tải ứng dụng gợi ý từ chúng tôi ngay</h1>
        <div>
          <div className='inline'>
            <img src={chplay_qr} style={{width:"200px", height:"200px"}}/>
            <div><img src={ggplay} style={{width:"200px", height:"80px"}}/></div>
          </div>

          <div className='inline'>
            <img src={appstore_qr} style={{width:"200px", height:"200px"}}/>
            <div><img src={appstore} style={{width:"200px", height:"110px"}}/></div>
          </div>
        </div>

    </div>
  );
}

export default App;
