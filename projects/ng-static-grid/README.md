# NgStaticGrid

A librariy for a simple and more static grid than gridstack.js. Main goal is that the elements can be position static on the remaining screen and stay in their position.

Main purpose are full screen dashboards -- where the user wan't to have a static postion of the widgets, like on a table.

# Links

- **[Launch Live Preview](https://sterlp.github.io/static-grid-library/)**
- [Link to NPM](https://www.npmjs.com/package/ng-static-grid)

# How to use

## Install npm module
```
npm install ng-static-grid --save
```
## Adjust app.module.ts
```ts
import { NgStaticGridModule } from 'ng-static-grid'

  imports: [
    // ... omitted
    NgStaticGridModule
  ],
```
## Use it
Default is a 12 x 12 grid with 100% width and 100% hight, if nothing set.
```html
<ng-static-grid-panel>
    <ng-static-grid-item width="2" height="2">
        Top Left
    </ng-static-grid-item>
    <ng-static-grid-item x="10" width="2" height="2">
        Top Right
    </ng-static-grid-item>

    <ng-static-grid-item x="4" y="4" width="3" height="3">
        Center
    </ng-static-grid-item>

    <ng-static-grid-item x="1" y="11" width="10">
        Footer
    </ng-static-grid-item>
</ng-static-grid-panel>
```
Setting the default would be look like:
```html
<ng-static-grid-panel rows="12" columns="12" width="100%" height="100%">
</ng-static-grid-panel>
```