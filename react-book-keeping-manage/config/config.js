import { defineConfig } from 'umi';
import getRoutes from './router';
// console.log('getRoutes:', getRoutes())

export default defineConfig({
  hash: true,
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  routes: getRoutes(),
  theme: {
    'primary-color': '#1890ff',
  },
})