const express = require('express')
const WebSocket = require('ws');
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.json())
  .post('/', (req, res) => {
    var caller = req.body.caller;
    const ws = new WebSocket('wss://adisyo.com//api//CloudCallerId',{protocolVersion:13});
    ws.on('error', function (err) { console.error(err)});
    ws.on('message', function incoming(message) {
        console.log('received for %s', message);
      message = JSON.parse(message);
      const response = Buffer.from(message.FuncInOutParameter, 'base64');
      var result = JSON.parse(response.toString("UTF-8"));
      var sendPhoneMessage = {
        Token : result.Token,
        MessagaType : 1,
        Message : req.body.caller
      };
      let buff2 = new Buffer.from(JSON.stringify(sendMessage(13,sendPhoneMessage)));
      ws.send(buff2,err=> console.error(err));
      ws.close();
      res.statusCode= 200;
      res.send();
      });
      var authData = {
        ClVer : "AdisyoCloudPrinter, Version=0.0.28.0, Culture=neutral, PublicKeyToken=null",
        Name : "yilmaz@decobt.com",
        Pass : "Adisyo2021*"
      };
     
    ws.on("open" ,p=> {
      var authReq = sendMessage(1,authData);
      console.log("Connected");
      console.log(authReq);
      let buff2 = new Buffer.from(JSON.stringify(authReq));
    
      ws.send(buff2,err=> console.error(err));
    
    
    });
    


  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  function sendMessage(id,data){
    let buff = new Buffer.from(JSON.stringify(data));
    let base64data = buff.toString('base64');
      return {
        Func: id,
        FuncInOutParameter : base64data
      };
  }