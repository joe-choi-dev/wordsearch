import {word_search_views} from './Duolingo.json';

// Spec: You may bundle the game data inside your app instead of making a network request.
export default class WordSearchService {
  getWordSearchViews() {
    return word_search_views;
  }
}
