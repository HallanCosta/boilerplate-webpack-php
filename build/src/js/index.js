
import '../css/style.scss';

import { 
    $event, 
    $addClass, 
    $removeClass, 
    $el, 
    $els,
    $hasClass,
    $attr,
    $removeAttr
} from './utils';

import { Home } from './pages/home';

/**
 * Init the code 
 */
DomReady.ready(function()
{
    switch ($$page) {
        case 'home':
            Home();
            break;
        default:
            break;
    }
});
