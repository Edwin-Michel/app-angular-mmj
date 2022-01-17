import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Temperature } from 'src/app/models/temperature.interface';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css'],
})
export class TemperaturesComponent implements OnInit {
  title : string = 'Historial de PH en Tanques';
  btnStart : boolean = true;
  btnStop : boolean = false;

  constructor(private api : ApiService) {  }

  private temperatures : Temperature[] = [];
  termocupla1 : Temperature[] = [];
  termocupla2 : Temperature[] = [];
  count = interval(7000);
  timer : any;
  lastTemp1 : number = 0.0;
  lastTemp2 : number = 0.0;


  obtenerValores(){
    this.timer = setInterval(() => {
      //console.log('Cada n tiempo en timer')
      this.temperatures.splice(0, this.temperatures.length)
      this.termocupla1.splice(0, this.termocupla1.length)
      this.termocupla2.splice(0, this.termocupla2.length)
        this.api.getAllTemps().subscribe(data =>{
        console.log(data);
        this.temperatures = data
        for(let i of this.temperatures){
          if(i.label == 'PH-1'){
            this.termocupla1.push(i);
            if(this.termocupla1.length > 0){
              this.termocupla1.sort()
              this.lastTemp1 = this.termocupla1[this.termocupla1.length - 1].value;
            }
          }else{
            this.termocupla2.push(i)
            if(this.termocupla2.length > 0){
              this.lastTemp2 = this.termocupla2[this.termocupla2.length - 1].value;
            }
          }
        }
      }, error => {
        console.log('Ha ocurrido un error ')
      })
    }, 7000);
  }

  clickBtnStart(){
    this.btnStart = false
    this.btnStop = true
    //this.api.showMessage('Se presiono el boton Star');
    this.obtenerValores()
  }

  clickBtnClearDatabase(){
    this.temperatures.splice(0, this.temperatures.length)
    this.termocupla1.splice(0, this.termocupla1.length)
    this.termocupla2.splice(0, this.termocupla2.length)
    this.api.clearDataBase()
  }

  clickBtnStop(){
    this.btnStop = false
    this.btnStart = true
    //this.api.showMessage('Se presiono el boton Stop');
    setTimeout(()=> this.count.pipe(), 2000);
    clearInterval(this.timer);
    this.temperatures = []
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.temperatures = []
  }
}
