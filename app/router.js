import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts');
  this.route('home', { path: "/" });
  this.route('about', { path: "/about" });
  this.route('contact', { path: "/contact" });
});

export default Router;
