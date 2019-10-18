import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit, ElementRef } from '@angular/core';
import { NgStaticGridPanelComponent } from 'projects/ng-static-grid/src/public-api';
declare var JSONEditor: any;

@Component({
  selector: 'app-save-restore',
  templateUrl: './save-restore.component.html',
  styleUrls: ['./save-restore.component.scss']
})
export class SaveRestoreComponent implements AfterContentInit, AfterViewInit {

  @ViewChild(NgStaticGridPanelComponent, {static: true}) panel: NgStaticGridPanelComponent;
  @ViewChild('jsonEditor', {static: true}) jsonEditorEl: ElementRef;
  jsonEditor: any;
  constructor() { }

  ngAfterContentInit(): void {
    this.jsonEditor = new JSONEditor(this.jsonEditorEl.nativeElement, {});
  }
  ngAfterViewInit(): void {
    this.doRead();
  }

  doRead(): void {
    this.jsonEditor.set(this.panel.getModel());
  }
  doSet(): void {
    this.panel.setModel(this.jsonEditor.get());
  }
}
