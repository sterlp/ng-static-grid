import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-canvas-alt',
  templateUrl: './grid-canvas-s.component.html',
  styleUrls: ['./grid-canvas-s.component.scss']
})
export class GridCanvasSComponent implements OnInit {

  items = [
    { x: 5, y: 1, w: 8, h: 5, id: '# 1'},
    { x: 15, y: 1, w: 8, h: 5, id: '# 2'},
    { x: 21, y: 9, w: 8, h: 5, id: '# 3'},

    { x: 15,  y: 16, w: 8, h: 5, id: '# 4'},
    { x: 5,  y: 16, w: 8, h: 5, id: '# 5'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
