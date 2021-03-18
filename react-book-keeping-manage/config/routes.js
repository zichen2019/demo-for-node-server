module.exports = [
  { 
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/dynamicField/dynamicConfigure',
      },
      {
        path: '/dynamicField',
        name: 'dynamicField',
        icon: 'dynamicField',
        routes: [
          {
            path: '/',
            redirect: '/dynamicField/dynamicConfigure',
          },
          {
            name: 'dynamicConfigure',
            icon: 'smile',
            path: '/dynamicField/dynamicConfigure',
            // component: './dashboard/analysis',
            component: './dynamicConfigure',
          }
        ],
      }
    ]
  }
]