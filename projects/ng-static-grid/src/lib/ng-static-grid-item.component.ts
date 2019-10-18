import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { NUMBER_PARSER } from './shared/attribute.model';
import { NgStaticGridItemModel } from './panel/panel.model';

/**
 * Any item can have x and y coordinates and a width and hight.
 *
 * x / y are 0 based.
 */
@Component({
  selector: 'ng-static-grid-item',
  template: `<ng-content></ng-content>`,
  styles: [`
  :host {
    position: absolute;
  }`]
})
/* tslint:disable:curly*/
export class NgStaticGridItemComponent implements OnInit {
  /**
   * To save and restore the postion each items needs an ID to be identified.
   */
  @Input() id ?: string;
  @Input() x ? = 0;
  @Input() y ? = 0;
  @Input() width ? = 1;
  @Input() height ? = 1;

  set model(val: NgStaticGridItemModel) {
    this.x = val.x;
    this.y = val.y;
    this.height = val.height;
    this.width = val.width;
    this.ngOnInit();
  }

  constructor(private renderer: Renderer2,
              private hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'static-grid-item');
  }

  ngOnInit() {
    this.width = NUMBER_PARSER(this.width);
    this.height = NUMBER_PARSER(this.height);
    this.x = NUMBER_PARSER(this.x) || 0;
    this.y = NUMBER_PARSER(this.y) || 0;
  }

  doPosition(width: number, height: number) {
    this.renderer.setStyle(this.hostElement.nativeElement, 'width', (width * this.width) + '%');
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', (height * this.height) + '%');

    this.renderer.setStyle(this.hostElement.nativeElement, 'left', (width * this.x) + '%');
    this.renderer.setStyle(this.hostElement.nativeElement, 'top', (height * this.y) + '%');
  }
}
