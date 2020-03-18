import {observable, action} from 'mobx';


export class WordSearchStore {

  @observable words = [];

  @action
  getWords() {
    this.words = [];
  }

}

const gridStore = new WordSearchStore();
export default gridStore;