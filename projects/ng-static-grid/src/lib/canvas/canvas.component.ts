import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, Input, HostListener } from '@angular/core';
import { NUMBER_PARSER } from '../shared/attribute.model';

@Component({
  selector: 'ng-static-grid-canvas',
  styleUrls: ['./canvas.component.css'],
  template: `
  <canvas #canvas class="canvas">
  </canvas>
  `,
})
/* tslint:disable:curly variable-name*/
export class NgStaticGridCanvasComponent implements OnInit, AfterContentInit {

  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  /** The element to cover */
  @Input() coverElement ?: ElementRef;

  /**
   * Set the color of the line.
   * @see https://www.w3schools.com/colors/colors_picker.asp
   */
  @Input() strokeStyle: string | CanvasGradient | CanvasPattern = '#ae2424';
  /**
   * Optional color of the shadow.
   * @optional default #343a40
   */
  @Input() shadowColor ? = '#343a40';
  /**
   * Optional global alpha to set.
   */
  @Input() alpha ?: number;

  @Input() gridSizeX = 24;
  @Input() gridSizeY = 24;

  @Input() gridStartX: number;
  @Input() gridEndX: number;

  @Input() gridStartY: number;
  @Input() gridEndY: number;
  /**
   * Takes the min of width or hight and mutiplies it with this number.
   * So that the line scales with the available screen size.
   */
  @Input() strokeGidFactor: number;

  private _timerHandle: any;
  private _xFactor: number;
  private _yFactor: number;
  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this._xFactor = Math.floor(this.gridSizeX / 12);
    this._yFactor = Math.floor(this.gridSizeY / 12);
    if (this.strokeGidFactor === null) {
      this.strokeGidFactor = Math.min(this._xFactor, this._yFactor);
    }
    if (this.gridStartX == null) {
      this.gridStartX = this._xFactor;
    }
    if (this.gridEndX == null) {
      this.gridEndX = this.gridSizeX - this.gridStartX;
    }
    if (this.gridStartY == null) {
      this.gridStartY = this._yFactor;
    }
    if (this.gridEndY == null) {
      this.gridEndY = this.gridSizeY - this.gridStartY;
    }
  }

  ngAfterContentInit(): void {
    // select the parent if possible, if no element to cover was set
    if (!this.coverElement) {
      if (this.hostElement.nativeElement.parentNode) {
        this.coverElement = new ElementRef(this.hostElement.nativeElement.parentNode);
      } else {
        this.coverElement = this.hostElement;
      }
    } // else console.info('coverElement set ...', this.coverElement);
    if (window) this.adjustCanvas(window.innerHeight, window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this._timerHandle) clearTimeout(this._timerHandle);
    this._timerHandle = setTimeout(
      this.adjustCanvas.bind(this, event.target.innerHeight, event.target.innerWidth), 125);
  }

  adjustCanvas(height: number, width: number): void {
    if (this.canvas) {
      const rect: DOMRect = this.coverElement.nativeElement.getBoundingClientRect();
      // console.info('adjustCanvas', rect, width, height);
      this.canvas.nativeElement.height = height - rect.y;
      this.canvas.nativeElement.width = width - rect.x;

      this.drawCurvedArrow();
    }
    this._timerHandle = null;
  }

  drawCurvedArrow() {
    if (this.canvas && this.canvas.nativeElement
      && this.canvas.nativeElement.getContext('2d')) {

      const canvas = this.canvas.nativeElement;
      const context: CanvasRenderingContext2D = canvas.getContext('2d');

      context.lineWidth = Math.min(canvas.width, canvas.height) / 7;
      // https://www.w3schools.com/graphics/canvas_gradients.asp
      context.strokeStyle = this.strokeStyle;
      context.fillStyle = this.strokeStyle;
      if (this.shadowColor) context.shadowColor = this.shadowColor;
      if (this.alpha) context.globalAlpha = NUMBER_PARSER(this.alpha);

      const oneX = canvas.width / this.gridSizeX; // one step in X
      const oneY = canvas.height / this.gridSizeY; // one step in Y

      context.lineWidth = Math.min(oneX, oneY) * this.strokeGidFactor;
      if (this.shadowColor) context.shadowBlur = context.lineWidth / this.strokeGidFactor;

      const halfLine = context.lineWidth / 2; // we have to take the line with into account
      const startX = oneX * this.gridStartX;
      const startY = oneY * this.gridStartY;
      const endX = oneX * this.gridEndX;
      const endY = oneY * this.gridEndY;

      // console.info(this.gridStartX, this.gridStartY, this.gridEndX, this.gridEndY);
      // console.info(startX, startY, endX, endY);

      this.draw(context, canvas,
                startX, endX,
                startY, endY,
                oneX, oneY);
    }
  }

  private draw(context: CanvasRenderingContext2D, canvas: any,
               startX: number, endX: number,
               startY: number, endY: number,
               oneX: number, oneY: number) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const lineX = oneX * this.strokeGidFactor;
    const lineY = oneY * this.strokeGidFactor;

    startX = startX - 1;
    context.lineWidth = 1;

    // ---->
    context.beginPath();
    context.moveTo(startX , startY);
    context.lineTo(endX - lineX * 3, startY);

    //   --
    //     |
    //   --
    // https://www.w3schools.com/tags/canvas_beziercurveto.asp

    context.bezierCurveTo(
      endX + lineX, startY,
      endX + lineX, endY + lineY,
      endX - lineX * 3, endY + lineY);

    // <---
    context.lineTo(startX + lineX, endY + lineY);

    // arrow head
    context.lineTo(startX + lineX, endY + lineY * 1.5 );
    context.lineTo(startX, endY + lineY / 2);
    context.lineTo(startX + lineX, endY - lineY / 2 );
    context.lineTo(startX + lineX, endY);
    // --->
    context.lineTo(endX - lineX * 3, endY);
    // --
    //   |
    // --
    context.bezierCurveTo(
      endX - lineX / 3, endY,
      endX - lineX / 3, startY + lineY,
      endX - lineX * 3, startY + lineY);

    context.lineTo(startX, startY + lineY);

    context.closePath();
    context.fill();
  }
}
