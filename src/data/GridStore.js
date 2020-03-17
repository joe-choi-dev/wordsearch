import {observable, action} from 'mobx';
// import {WordSearchService} from './WordSearchService';

export class GridStore {
  @observable solutions = [];
  @observable letters = []; 
  @observable foundWords = [];

  @observable coordinates = [];

  // may eventually move to view state
  @observable isDown = false;

  @observable offsetX;
  @observable offsetY;

  @observable startX;
  @observable startY;
  @observable currentX;
  @observable currentY;
  @observable endX;
  @observable endY;

  getNearestCoordinates(x, y) {
    const coords = this.coordinates.filter(function (entry) { 
      return ((x > entry.xCoor-20) && (x < 20+entry.xCoor)) && ((y > entry.yCoor-20) && (y < 20+entry.yCoor)); 
    });
    if (coords.length > 0) 
      return coords[0] 
    else 
      return {};
  }

}

const gridStore = new GridStore();
export default gridStore;