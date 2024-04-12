import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-header-with-back",
  templateUrl: "./header-with-back.component.html",
  styleUrls: ["./header-with-back.component.scss"],
})
export class HeaderWithBackComponent implements OnInit {
  constructor(private navCtrl: NavController,private location: Location) {}

  @Input() title: string = "";
  @Input() backURL: string = "/main/home";

  ngOnInit() {}

  goback() {
    // this.navCtrl.navigateBack(this.backURL);
    this.location.back();
  }
}
