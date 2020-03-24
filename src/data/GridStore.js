import {observable, action, computed} from 'mobx';
import WordSearchService from './WordSearchService';

export class GridStore {

  //data
  @observable wordSearchViews = []; 


  @observable currentWordIndex = 0;
  @observable currentWordView;
  // @observable currentCharacterGrid = [];
  @observable currentWord = "";
  @observable totalCurrentSolutions = "";
  @observable currentSolutions; //OBJECT

  @observable foundSolutions = [];
  @observable drawnSolutions = [];

  //coordinates
  @observable coordinates = []; //{x, y, canvasX, canvasY}

  // may eventually move to view state
  @observable isDown = false;

  @observable offsetX;
  @observable offsetY;

  @observable start; //{x, y, canvasX, canvasY}
  @observable current;
  @observable end;

  constructor () {
    this.wordSearchService = new WordSearchService();
  }

  @action
  loadNextWordView() {
    this.currentWordIndex++;
    this.foundSolutions.clear();
    this.drawnSolutions.clear();
    return this.getWordSearchViews();
  }

  @computed get foundAllSolutions() {
    return this.foundSolutions.length === this.totalCurrentSolutions;
  }

  @action
  getWordSearchViews() {
    this.wordSearchViews = this.wordSearchService.getWordSearchViews();

    this.currentWordView = this.wordSearchViews[this.currentWordIndex];
    this.currentSolutions = this.currentWordView.word_locations;
    this.totalCurrentSolutions = Object.keys(this.currentWordView.word_locations).length;
    this.currentWord = this.currentWordView.word;
  }

  getNearestCoordinates(x, y) {
    // console.log(this.wordSearchService.getWordSearchViews());
    const coords = this.coordinates.filter(function (entry) { 
      return ((x > entry.canvasX-10) && (x < 10+entry.canvasX)) && ((y > entry.canvasY-10) && (y < 10+entry.canvasY)); 
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