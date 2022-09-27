import React from 'react';
import chplay_qr from "../images/chplay_baemin.png"
import appstore_qr from "../images/appstore_baemin.png"
import ggplay from "../images/get_on_ggplay.png"
import appstore from "../images/get_on_appstore.png"
import food_01 from "../images/food_01.jpg"
import food_02 from "../images/food_02.jpg"
import food_03 from "../images/food_03.jpg"
import food_04 from "../images/food_04.jpg"
import '../App.css'

function App() {
  return (
    <div >
        <h1 className='scan' style={{ color:"#E43D91"}}>Bạn quá bận để ra ngoài sao? Tải ứng dụng gợi ý từ chúng tôi ngay</h1>
        <div style={{display:"flex"}}>
          <div className='inline'>
            <img src={chplay_qr} style={{width:"200px", height:"200px"}}/>
            <div><img src={ggplay} style={{width:"200px", height:"80px"}}/></div>
          </div>

          <div className='inline'>
            <img src={appstore_qr} style={{width:"200px", height:"200px"}}/>
            <div><img src={appstore} style={{width:"200px", height:"110px"}}/></div>
          </div>
        </div>
        <div style={{display:"flex", position:"relative", left:"100px"}}>
          <img src={food_01} style={{width:"220px", height:"220px", borderRadius:"8px",padding:"10px"}}/>
          <img src={food_02} style={{width:"220px", height:"220px", borderRadius:"8px",padding:"10px"}}/>
          <img src={food_03} style={{width:"220px", height:"220px", borderRadius:"8px",padding:"10px"}}/>
          <img src={food_04} style={{width:"220px", height:"220px", borderRadius:"8px",padding:"10px"}}/>
        </div>

    </div>
  );
}

export default App;
