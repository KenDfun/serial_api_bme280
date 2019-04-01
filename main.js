/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();


/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

/* 3. 以後、アプリケーション固有の処理 */

const uartData = require("./serial.js");
uartData.startParser();

// dataを取得するAPI

app.get("/api/bme280", function(req, res, next){
    let bme280=uartData.getBme280Data();
    res.json(bme280);
});

