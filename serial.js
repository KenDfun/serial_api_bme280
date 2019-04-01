const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM4', { baudRate: 9600 })

const parser = new Readline()
port.pipe(parser)


let startParser = function(){
  parser.on('data', line => bme280Data(line));
}
exports.startParser=startParser;

let bmeDataJson=null;

let bme280Data = function(line){
  // console.log(`> ${line}`);
  let reg = /TEMP\s:\s(\d+\.\d+)\sDegC\s.PRESS\s:\s(\d+\.\d+)\shPa\s.HUM\s:\s(\d+\.\d+)\s%/;
  let result = line.match(reg);
  if(result!=null){
    bmeDataJson = {
      temperature: result[1],
      pressure: result[2],
      humidity: result[3]
    }
    console.log(bmeDataJson);
  };
}

let getBme280Data = function(){
  return bmeDataJson;
}
exports.getBme280Data=getBme280Data;
