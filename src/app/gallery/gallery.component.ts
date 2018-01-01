import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent } from 'ngx-gallery';
import io from 'socket.io-client';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];


    @ViewChild(NgxGalleryComponent) ngxImageGallery: NgxGalleryComponent;

    socket: any;

    constructor(){
      this.socket = io('http://localhost:8000/analytics');
    }

    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async updateGallery(maleFaces:number,femaleFaces:number){
     
      if(maleFaces>0)
        this.ngxImageGallery.show(4);
      else if (femaleFaces>0)
        this.ngxImageGallery.show(0);
      
      //await this.delay(5000);

    }

    ngOnInit(){  

      this.socket.on('connect', function () {
         console.log('this is a socket');   
         this.socket.emit('statsdata', {data: 'I\'m connected!'});
      }.bind(this));

      this.socket.on('faces data', function (data) {  
        let streamData = JSON.parse(data)
        console.log(data); 

        this.updateGallery(streamData.maleFaces,streamData.femaleFaces);

      }.bind(this));



        this.galleryOptions = [
            {
                width: '600px',
                height: '780px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                imageAutoPlay: false,
                imageAutoPlayInterval: 2000,
                imageAutoPlayPauseOnHover: true,
                imageInfinityMove: true,
                fullWidth:true

            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '640px',
                imagePercent: 90,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            }
        ];
 
     this.galleryImages = [
          {
            small: '../assets/women/16-Paola_Espinosa-Pink_Teal_Grey_original.jpg',
            medium: '../assets/women/16-Paola_Espinosa-Pink_Teal_Grey_original.jpg',
            big: '../assets/women/16-Paola_Espinosa-Pink_Teal_Grey_original.jpg',
            url: '../assets/women/16-Paola_Espinosa-Pink_Teal_Grey_original.jpg'
          },
          {
            small: '../assets/women/22-Allyson_Felix-Black_and_Pink_Look_15643.jpg',
            medium: '../assets/women/22-Allyson_Felix-Black_and_Pink_Look_15643.jpg',
            big: '../assets/women/22-Allyson_Felix-Black_and_Pink_Look_15643.jpg',
            url: '../assets/women/22-Allyson_Felix-Black_and_Pink_Look_15643.jpg'
          },
          {
            small: '../assets/women/23-Nike_Cyclone_Jacket_15644.jpg',
            medium: '../assets/women/23-Nike_Cyclone_Jacket_15644.jpg',
            big: '../assets/women/23-Nike_Cyclone_Jacket_15644.jpg',
            url: '../assets/women/23-Nike_Cyclone_Jacket_15644.jpg'
          } ,
          {
            small: '../assets/women/26-Allyson_Felix-Grey_Look_15646.jpg',
            medium: '../assets/women/26-Allyson_Felix-Grey_Look_15646.jpg',
            big: '../assets/women/26-Allyson_Felix-Grey_Look_15646.jpg',
            url: '../assets/women/26-Allyson_Felix-Grey_Look_15646.jpg'
          },
          {
            small: '../assets/men/SP16_BSBL_VaporUni_WhtFrnt_UNC_original.jpg',
            medium: '../assets/men/SP16_BSBL_VaporUni_WhtFrnt_UNC_original.jpg',
            big: '../assets/men/SP16_BSBL_VaporUni_WhtFrnt_UNC_original.jpg',
            url: '../assets/men/SP16_BSBL_VaporUni_WhtFrnt_UNC_original.jpg'
          } ,
          {
            small: '../assets/men/SP18_FB_NovoFenomeno_MercurialVapor_Stmnt_921547-407_9Z_original.jpg',
            medium: '../assets/men/SP18_FB_NovoFenomeno_MercurialVapor_Stmnt_921547-407_9Z_original.jpg',
            big: '../assets/men/SP18_FB_NovoFenomeno_MercurialVapor_Stmnt_921547-407_9Z_original.jpg',
            url: '../assets/men/SP18_FB_NovoFenomeno_MercurialVapor_Stmnt_921547-407_9Z_original.jpg'
          } ,
          {
            small: '../assets/men/SP18_Global_Football_FTWR_AF_MENS_PURPLE_MERCURIAL_MEDIAL_0161-R2_native_1600.png',
            medium: '../assets/men/SP18_Global_Football_FTWR_AF_MENS_PURPLE_MERCURIAL_MEDIAL_0161-R2_native_1600.png',
            big: '../assets/men/SP18_Global_Football_FTWR_AF_MENS_PURPLE_MERCURIAL_MEDIAL_0161-R2_native_1600.png',
            url: '../assets/men/SP18_Global_Football_FTWR_AF_MENS_PURPLE_MERCURIAL_MEDIAL_0161-R2_native_1600.png'
          }      
        ]; 
    }

}
