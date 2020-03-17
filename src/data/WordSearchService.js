import {getJson} from "./api.js";

export default class WordSearchService {
  getWords() {
    return getJson("api/words");
  }
}
