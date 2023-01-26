import './css/styles.css';
import debounce from 'lodash.debounce';
import { refs } from'./js/DOM.js'
import { onInput } from './js/on-input';

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



