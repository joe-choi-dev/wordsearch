import {observable, action} from 'mobx';
// import {WordSearchService} from './WordSearchService';

export class GridStore {
  @observable solutions = [];
  @observable letters = []; 
  @observable foundWords = [];

  @observable coordinates = []; //{x, y, canvasX, canvasY}

  // may eventually move to view state
  @observable isDown = false;

  @observable offsetX;
  @observable offsetY;

  @observable start; //{x, y, canvasX, canvasY}
  @observable current;
  @observable end;

  getNearestCoordinates(x, y) {
    const coords = this.coordinates.filter(function (entry) { 
      return ((x > entry.canvasX-20) && (x < 20+entry.canvasX)) && ((y > entry.canvasY-20) && (y < 20+entry.canvasY)); 
    });
    if (coords.length > 0) 
      return coords[0] 
    else 
      return {};
  }

  isValidPath(x1, y1, x2, y2) {
    return x1 === x2 || y1 === y2 || (Math.abs(x1-x2) === Math.abs(y1-y2));
  }

}

const gridStore = new GridStore();
export default gridStore;