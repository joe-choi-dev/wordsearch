import {word_search_views} from './Duolingo.json';

export default class WordSearchService {
  getWordSearchViews() {
    console.log(JSON.stringify(word_search_views))
    return word_search_views;
  }
}
