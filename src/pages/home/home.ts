import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SoftAPSetup } from "softap-setup-ts-demo";
import { Config } from "./config";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    var sap = new SoftAPSetup({ protocol: 'http', port: 4000, host: '127.0.0.1' });
    sap.deviceInfo(claim);

    function claim(err, dat) {
      if (err) {
        console.error('Error getting claim code', err);
        return;
      }
      console.log(dat);
      console.log('-------');
      console.log('Obtained device information. Setting claim code...');
      sap.setClaimCode('wat', key);
    }

    function key(err, dat) {

      if (err) {
        throw err;
      }
      console.log(dat);
      console.log('-------');
      console.log('Requesting public key...');
      sap.publicKey(scan);
    }

    function scan(err, dat) {

      if (err) {
        throw err;
      }
      console.log(dat);
      console.log('-------');
      console.log('Received public key. Scanning for APs...');
      sap.scan(configure);
    }

    function configure(err, dat) {

      if (err) {
        throw err;
      }
      console.log(dat);
      console.log('-------');
      console.log('Scanned APs. Configuring device...');

      var config = new Config();
      sap.configure({
        ssid: config.get('ssid')
        , channel: config.get('channel') || 11
        , password: config.get('password') || undefined
        , security: config.get('security') || undefined
      }, connect);

    }

    function connect(err, dat) {

      if (err) {
        throw err;
      }
      console.log('Configured device. Issuing connect request...');

      sap.connect(done);
    }

    function done(err, dat) {

      if (err) {
        throw err;
      }
      console.log('Successfully sent connect request. Now wait for breathing cyan!');

    }
  }

}