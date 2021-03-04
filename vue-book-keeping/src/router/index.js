import Vue from 'vue';
import Router from 'vue-router';
import BookList from '@/views/book-list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'book-list',
      component: BookList
    }
  ]
})