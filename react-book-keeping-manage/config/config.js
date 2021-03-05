import { defineConfig } from 'umi';
import getRoutes from './router';

export default defineConfig({
  routes: getRoutes()
})