import React from 'react';
import chplay_qr from "../images/chplay_baemin.png"
import appstore_qr from "../images/appstore_baemin.png"

function App() {
  return (
    <div>
        <h1>Bạn quá bận để ra ngoài sao? Tải Baemin ngay</h1>
        <div>CH Play</div>
        <img src={chplay_qr} style={{width:"200px", height:"200px"}}/>
        <div>App Store</div>
        <img src={appstore_qr} style={{width:"200px", height:"200px"}}/>
    </div>
  );
}

export default App;
