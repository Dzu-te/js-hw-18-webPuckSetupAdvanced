import Post from './post';
import './css/style.scss';
import logo from './assets/icon-square-big.png';
import fav from '../favicon.png';
import settings from './assets/data.json'

const post = new Post('Webpack Post Title!!!')

console.log('Post to string:', post.toString())
