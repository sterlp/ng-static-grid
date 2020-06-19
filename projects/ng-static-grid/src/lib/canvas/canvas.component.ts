import {AfterContentInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {INT_PARSER, NUMBER_PARSER} from '../shared/attribute.model';


enum LineType {
    U_TYPE = 'u-type',
    S_TYPE = 's-type'
}

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
     * Optional color of the shadow.
     * @optional default #343a40
     */
    @Input() shadowColor ? = '#343a40';
    /**
     * Optional global alpha to set.
     */
    @Input() alpha ?: number;
    @Input() gridStartX: number;
    @Input() gridEndX: number;
    @Input() gridStartY: number;
    @Input() gridEndY: number;
    /**
     * Takes the min of width or hight and mutiplies it with this number.
     * So that the line scales with the available screen size.
     */
    @Input() strokeGridFactor: number;
    /**
     * Position of the error head
     * @values bottom | top
     * @memberof NgStaticGridCanvasComponent
     */
    @Input() arrowHead = 'bottom';
    private _xFactor: number;
    private _yFactor: number;
    private _contentSet = false;

    constructor(private hostElement: ElementRef) {
    }

    private _reversed = false;

    @Input('reversed')
    get reversed(): boolean {
        return this._reversed;
    }

    set reversed(value: boolean) {
        this._reversed = '' + value !== 'false';
    }

    private _lineType = LineType.U_TYPE;

    @Input() set lineType(type: string) {
        switch (type) {
            case LineType.U_TYPE:
                this._lineType = type;
                break;
            case LineType.S_TYPE:
                this._lineType = type;
                break;
            default:
                this._lineType = LineType.U_TYPE;
        }
    }

    private _strokeStyle: string | CanvasGradient | CanvasPattern = '#ae2424';

    get strokeStyle() {
        return this._strokeStyle;
    }

    /**
     * Set the color of the line.
     * @see https://www.w3schools.com/colors/colors_picker.asp
     */
    @Input() set strokeStyle(val: string | CanvasGradient | CanvasPattern) {
        if (this._strokeStyle !== val) {
            this._strokeStyle = val;
            this.doRedraw();
        }
    }

    private _gridSizeX = 24;

    get gridSizeX() {
        return this._gridSizeX;
    }

    /**
     * Int number how many columns
     * @memberof NgStaticGridCanvasComponent
     */
    @Input() set gridSizeX(val: number) {
        this._gridSizeX = INT_PARSER(val) || 24;
    }

    get columns() {
        return this.gridSizeX;
    }

    @Input() set columns(val: number) {
        this.gridSizeX = val;
    }

    private _gridSizeY = 24;

    get gridSizeY() {
        return this._gridSizeY;
    }

    @Input() set gridSizeY(val: number) {
        this._gridSizeY = INT_PARSER(val) || 24;
    }

    get rows() {
        return this.gridSizeY;
    }

    @Input() set rows(val: number) {
        this.gridSizeY = val;
    }

    ngOnInit() {
        this._xFactor = Math.floor(this.gridSizeX / 12);
        this._yFactor = Math.floor(this.gridSizeY / 12);
        if (this.strokeGridFactor == null) {
            this.strokeGridFactor = Math.min(this._xFactor, this._yFactor, 1);
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
        this._contentSet = true;
        this.doRedraw();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.adjustCanvas(event.target.innerHeight, event.target.innerWidth);
    }

    doRedraw() {
        if (window && this._contentSet) {
            this.adjustCanvas(window.innerHeight, window.innerWidth);
            // console.info('doRedraw ...');
        }
    }

    adjustCanvas(height: number, width: number): void {
        if (this.canvas) {
            const rect: DOMRect = this.coverElement.nativeElement.getBoundingClientRect();
            // console.info('adjustCanvas', rect, width, height, width - rect.left, height - rect.top);
            this.canvas.nativeElement.height = height - rect.top || 0;
            this.canvas.nativeElement.width = width - rect.left || 0;

            this.prepareLine();
        }
    }

    prepareLine() {
        if (this.canvas && this.canvas.nativeElement
            && this.canvas.nativeElement.getContext('2d')) {

            const canvas = this.canvas.nativeElement;
            const context: CanvasRenderingContext2D = canvas.getContext('2d');

            // https://www.w3schools.com/graphics/canvas_gradients.asp
            context.strokeStyle = this.strokeStyle;
            context.fillStyle = this.strokeStyle;
            if (this.shadowColor) context.shadowColor = this.shadowColor;
            if (this.alpha) context.globalAlpha = NUMBER_PARSER(this.alpha);

            const oneX = canvas.width / this.gridSizeX; // one step in X
            const oneY = canvas.height / this.gridSizeY; // one step in Y

            context.lineWidth = Math.min(oneX, oneY) * this.strokeGridFactor;
            if (this.shadowColor) context.shadowBlur = context.lineWidth / this.strokeGridFactor;

            const startX = oneX * this.gridStartX;
            const startY = oneY * this.gridStartY;
            const endX = oneX * this.gridEndX;
            const endY = oneY * this.gridEndY;

            // console.info(this.gridStartX, this.gridStartY, this.gridEndX, this.gridEndY);
            // console.info(startX, startY, endX, endY);
            switch (this._lineType) {
                case LineType.U_TYPE:
                    if (this.reversed) {
                        this.drawReversedULine(context, canvas,
                            startX, endX,
                            startY, endY,
                            oneX, oneY);
                    } else {
                        this.drawULine(context, canvas,
                            startX, endX,
                            startY, endY,
                            oneX, oneY);
                    }
                    break;
                case LineType.S_TYPE:
                    if (this.reversed) {
                        this.drawReversedSLine(context, canvas,
                            startX, endX,
                            startY, endY,
                            oneX, oneY);
                    } else {
                        this.drawSLine(context, canvas,
                            startX, endX,
                            startY, endY,
                            oneX, oneY);
                    }
                    break;

            }
        }
    }

    private drawReversedSLine(
        context: CanvasRenderingContext2D,
        canvas: any,
        startX: number,
        endX: number,
        startY: number,
        endY: number,
        oneX: number,
        oneY: number) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const lineX = oneX * this.strokeGridFactor;
        const lineY = oneY * this.strokeGridFactor;
        const radius = 40;
        const curvesAmount = 2;

        const curveStep = (endY - startY) / curvesAmount;

        context.lineWidth = 1;

        context.beginPath();

        if (this.arrowHead === 'bottom') {
            context.moveTo(endX, startY);
            context.lineTo(endX, startY + lineY);
        } else {
            context.moveTo(endX - lineY, startY);
            this.drawCanvasArrow(context, endX, startY, lineX, lineY, 'right');
        }

        // first inner u-turn
        this.drawCurve(context, startX + lineY, startY + lineY, radius, 'bottom', 'left');
        this.drawCurve(context, startX + lineY, startY + curveStep, radius, 'right', 'left');

        // first u-turn
        this.drawCurve(context, endX, startY + curveStep, radius, 'bottom', 'right', lineY);
        this.drawCurve(context, endX, endY + lineY, radius, 'left', 'right', lineY);

        if (this.arrowHead === 'bottom') {
            this.drawCanvasArrow(context, startX, endY, lineX, lineY, 'left');
        } else {
            context.lineTo(startX, endY + lineY);
            context.lineTo(startX, endY);
        }

        // second inner u-turn
        this.drawCurve(context, endX - lineY, endY, radius, 'top', 'left');
        this.drawCurve(context, endX - lineY, startY + curveStep + lineY, radius, 'left', 'left');

        // second u-turn
        this.drawCurve(context, startX, startY + curveStep + lineY, radius, 'top', 'right', lineY);
        this.drawCurve(context, startX, startY, radius, 'right', 'right', lineY);

        context.closePath();
        context.fill();
    }


    private drawSLine(context: CanvasRenderingContext2D, canvas: any,
                      startX: number, endX: number,
                      startY: number, endY: number,
                      oneX: number, oneY: number) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const lineX = oneX * this.strokeGridFactor;
        const lineY = oneY * this.strokeGridFactor;
        const radius = 40;
        const curvesAmount = 2;

        const curveStep = (endY - startY) / curvesAmount;

        context.lineWidth = 1;

        context.beginPath();

        if (this.arrowHead === 'bottom') {
            context.moveTo(startX, startY + lineY);
            context.lineTo(startX, startY);
        } else {
            context.moveTo(startX + lineX, startY + lineY);
            this.drawCanvasArrow(context, startX, startY, lineX, lineY, 'left');
        }

        // first u-turn
        this.drawCurve(context, endX, startY, radius, 'bottom', 'right', lineY);
        this.drawCurve(context, endX, startY + curveStep + lineY, radius, 'left', 'right', lineY);

        // first inner u-turn
        this.drawCurve(context, startX + lineY, startY + curveStep + lineY, radius, 'bottom', 'left');
        this.drawCurve(context, startX + lineY, endY, radius, 'right', 'left');

        if (this.arrowHead === 'bottom') {
            this.drawCanvasArrow(context, endX, endY, lineX, lineY, 'right');
        } else {
            context.lineTo(endX, endY);
            context.lineTo(endX, endY + lineY);
        }

        // second u-turn
        this.drawCurve(context, startX, endY + lineY, radius, 'top', 'right', lineY);
        this.drawCurve(context, startX, startY + curveStep, radius, 'right', 'right', lineY);

        // second inner u-turn
        this.drawCurve(context, endX - lineY, startY + curveStep, radius, 'top', 'left');
        this.drawCurve(context, endX - lineY, startY + lineY, radius, 'left', 'left');

        context.closePath();
        context.fill();
    }

    private drawULine(context: CanvasRenderingContext2D, canvas: any,
                      startX: number, endX: number,
                      startY: number, endY: number,
                      oneX: number, oneY: number) {

        context.clearRect(0, 0, canvas.width, canvas.height);
        const lineX = oneX * this.strokeGridFactor;
        const lineY = oneY * this.strokeGridFactor;
        const radius = 40;

        context.lineWidth = 1;

        // ---->
        context.beginPath();

        if (this.arrowHead === 'bottom') {
            context.moveTo(startX, startY + lineY);
            context.lineTo(startX, startY);
        } else {
            this.drawCanvasArrow(context, startX, startY, lineX, lineY, 'left');
        }
        // first u-turn
        this.drawCurve(context, endX, startY, radius, 'bottom', 'right', lineY);
        this.drawCurve(context, endX, endY + lineY, radius, 'left', 'right', lineY);

        // arrow head bottom
        if (this.arrowHead === 'bottom') {
            this.drawCanvasArrow(context, startX, endY, lineX, lineY, 'left');
        } else {
            context.lineTo(startX, endY + lineY);
            context.lineTo(startX, endY);
        }

        // first inner u-turn
        this.drawCurve(context, endX - lineY, endY, radius, 'top', 'left');
        this.drawCurve(context, endX - lineY, startY + lineY, radius, 'left', 'left');

        context.closePath();
        context.fill();

    }

    private drawReversedULine(context: CanvasRenderingContext2D, canvas: any,
                              startX: number, endX: number,
                              startY: number, endY: number,
                              oneX: number, oneY: number) {

        context.clearRect(0, 0, canvas.width, canvas.height);
        const lineX = oneX * this.strokeGridFactor;
        const lineY = oneY * this.strokeGridFactor;
        const radius = 40;
        context.lineWidth = 1;

        // ---->
        context.beginPath();

        if (this.arrowHead === 'bottom') {
            context.moveTo(endX, startY);
            context.lineTo(endX, startY + lineY);
        } else {
            this.drawCanvasArrow(context, endX, startY, lineX, lineY, 'right');
        }
        // first inner u-turn
        this.drawCurve(context, startX + lineY, startY + lineY, radius, 'bottom', 'left');
        this.drawCurve(context, startX + lineY, endY, radius, 'right', 'left');

        // arrow head bottom
        if (this.arrowHead === 'bottom') {
            this.drawCanvasArrow(context, endX, endY, lineX, lineY, 'right');
        } else {
            context.lineTo(endX, endY);
            context.lineTo(endX, endY + lineY);
        }

        // first u-turn
        this.drawCurve(context, startX, endY + lineY, radius, 'top', 'right', lineY);
        this.drawCurve(context, startX, startY, radius, 'right', 'right', lineY);

        context.closePath();
        context.fill();
    }

    /**
     * A method to draw an arrow on the canvas
     * @param context is the canvas context
     * @param leftArrowPointX is the X coordinate of the Point which is located on the left bottom part of the arrow
     * @param leftArrowPointY is the Y coordinate of the Point which is located on the left bottom part of the arrow
     * @param lineWidthX is X coordinate Width of the arrow
     * @param lineWidthY is Y coordinate Width of the arrow
     * @param direction is the direction in which the arrow should point to
     */
    private drawCanvasArrow(context, leftArrowPointX, leftArrowPointY, lineWidthX, lineWidthY, direction: 'left' | 'right') {
        if (direction === 'left') {
            context.lineTo(leftArrowPointX + lineWidthX, leftArrowPointY + lineWidthY);
            context.lineTo(leftArrowPointX + lineWidthX, leftArrowPointY + lineWidthY + (lineWidthY / 2));
            context.lineTo(leftArrowPointX, leftArrowPointY + lineWidthY / 2);
            context.lineTo(leftArrowPointX + lineWidthX, leftArrowPointY - lineWidthY / 2);
            context.lineTo(leftArrowPointX + lineWidthX, leftArrowPointY);
        }
        if (direction === 'right') {
            context.lineTo(leftArrowPointX - lineWidthX, leftArrowPointY);
            context.lineTo(leftArrowPointX - lineWidthX, leftArrowPointY - lineWidthY / 2);
            context.lineTo(leftArrowPointX, leftArrowPointY + lineWidthY / 2);
            context.lineTo(leftArrowPointX - lineWidthX, leftArrowPointY + lineWidthY + (lineWidthY / 2));
            context.lineTo(leftArrowPointX - lineWidthX, leftArrowPointY + lineWidthY);
        }
    }

    /**
     * A Method to draw from a specific corner a curve
     * @param context is the canvas context
     * @param cornerX is the X coordinate of the corner
     * @param cornerY is the Y coordinate of the corner
     * @param radius is the radius of the curve
     * @param direction is the direction in which the final curve should point to
     * @param curve specifies if it should be a left or a right curve
     * @param lineWidth for outer line curves the lineWidth is needed to adjust the radius
     */
    private drawCurve(
        context,
        cornerX: number,
        cornerY: number,
        radius: number,
        direction: 'top' | 'right' | 'bottom' | 'left',
        curve: 'right' | 'left',
        lineWidth?: number
    ) {
        if (lineWidth) {
            radius = radius + lineWidth;
        }
        let startX = cornerX;
        let startY = cornerY;
        let endX = cornerX;
        let endY = cornerY;
        switch (direction) {
            case 'top':
                if (curve === 'right') {
                    startX = startX + radius;
                    endY = endY - radius;
                } else {
                    startX = startX - radius;
                    endY = endY - radius;
                }
                break;
            case 'right':
                if (curve === 'right') {
                    startY = startY + radius;
                    endX = endX + radius;
                } else {
                    startY = startY - radius;
                    endX = endX + radius;
                }
                break;
            case 'bottom':
                if (curve === 'right') {
                    startX = startX - radius;
                    endY = endY + radius;
                } else {
                    startX = startX + radius;
                    endY = endY + radius;
                }
                break;
            case 'left':
                if (curve === 'right') {
                    startY = startY - radius;
                    endX = endX - radius;
                } else {
                    startY = startY + radius;
                    endX = endX - radius;
                }
                break;
        }
        context.lineTo(startX, startY);
        context.quadraticCurveTo(cornerX, cornerY, endX, endY);
    }
}
