import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Any item can have x and y coordinates and a width and hight.
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

  @Input() x ? = 0;
  @Input() y ? = 0;
  @Input() width ? = 1;
  @Input() height ? = 1;

  constructor(private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'static-grid-item');
  }

  ngOnInit() {
    if (typeof this.width !== 'number') this.width = this.width * 1;
    if (typeof this.height !== 'number') this.height = this.height * 1;
    if (typeof this.x !== 'number') this.x = this.x * 1;
    if (typeof this.y !== 'number') this.y = this.y * 1;
  }

  doPosition(width: number, height: number) {
    this.renderer.setStyle(this.hostElement.nativeElement, 'width', (width * this.width) + '%');
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', (height * this.height) + '%');

    this.renderer.setStyle(this.hostElement.nativeElement, 'left', (width * this.x) + '%');
    this.renderer.setStyle(this.hostElement.nativeElement, 'top', (height * this.y) + '%');
  }
}
