import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgStaticGridPanelComponent } from 'projects/ng-static-grid/src/public-api';

@Component({
  selector: 'app-save-restore',
  templateUrl: './save-restore.component.html',
  styleUrls: ['./save-restore.component.scss']
})
export class SaveRestoreComponent implements AfterViewInit {

  @ViewChild(NgStaticGridPanelComponent, {static: true}) panel: NgStaticGridPanelComponent;
  constructor() { }

  panelData = '';

  ngAfterViewInit(): void {
    setTimeout(() => this.doRead());
  }

  doRead(): void {
    this.panelData = JSON.stringify(this.panel.model);
  }
  doSet(): void {
    this.panel.model = JSON.parse(this.panelData);
  }
}
