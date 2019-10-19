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

  @Input() gridSize = 24;

  @Input() gridStartX = 2;
  @Input() gridStartY = 6;
  @Input() gridEndX = 22;
  @Input() gridEndY = 20;
  /**
   * Takes the min of width or hight and mutiplies it with this number.
   * So that the line scales with the available screen size.
   */
  @Input() strokeGidFactor = 3;

  private _timerHandle: any;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    // select the parent if possible, if no element to cover was set
    if (!this.coverElement) {
      if (this.hostElement.nativeElement.parentNode) {
        this.coverElement = new ElementRef(this.hostElement.nativeElement.parentNode);
      } else {
        this.coverElement = this.hostElement;
      }
    } //else console.info('coverElement set ...', this.coverElement);
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
      //console.info('adjustCanvas', rect, width, height);
      this.canvas.nativeElement.height = height - rect.y;
      this.canvas.nativeElement.width = width - rect.x;

      this.drawCurvedArrow();
    }
    this._timerHandle = null;
  }

  drawCurvedArrow() {
    const canvas = this.canvas.nativeElement;
    const context: CanvasRenderingContext2D = canvas.getContext('2d');

    context.lineWidth = Math.min(canvas.width, canvas.height) / 7;
    // https://www.w3schools.com/graphics/canvas_gradients.asp
    context.strokeStyle = this.strokeStyle;
    if (this.shadowColor) context.shadowColor = this.shadowColor;
    if (this.alpha) context.globalAlpha = NUMBER_PARSER(this.alpha);

    const step = this.gridSize;
    const gridStepFactor = this.gridSize / 6;
    const oneX = canvas.width / step; // one step in X
    const oneY = canvas.height / step; // one step in Y
    const startX = oneX * this.gridStartX;
    const startY = oneY * this.gridStartY;
    const endX = oneX * this.gridEndX;
    const endY = oneY * this.gridEndY;

    context.lineWidth = Math.min(oneX, oneY) * this.strokeGidFactor;
    if (this.shadowColor) context.shadowBlur = context.lineWidth / this.strokeGidFactor;

    function animate(current: number) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      // <----
      context.moveTo(endX, startY);
      context.lineTo(startX + oneX * gridStepFactor, startY);

      //   --
      //  |
      //   --
      // https://www.w3schools.com/tags/canvas_beziercurveto.asp
      context.bezierCurveTo(
        startX - oneX / gridStepFactor, startY,
        startX - oneX / gridStepFactor, endY,
        startX + oneX * gridStepFactor, endY);

      // --->
      context.lineTo(endX - oneX * 2, endY);

      // >
      context.lineTo(endX - oneX * 1.99, endY);
      context.lineTo(endX - oneX * 3.5, endY - oneY * 2);
      context.stroke();
      context.closePath();
    }
    animate(1);
  }
}
