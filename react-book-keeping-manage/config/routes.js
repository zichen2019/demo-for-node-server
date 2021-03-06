module.exports = [
  {
    path: '/user',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './firstPage',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './firstPage',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './firstPage',
      },
      {
        component: './firstPage',
      },
    ],
  },
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
          },
          {
            name: 'monitor',
            icon: 'smile',
            path: '/dashboard/monitor',
            component: './firstPage',
          },
          {
            name: 'workplace',
            icon: 'smile',
            path: '/dashboard/workplace',
            component: './firstPage',
          },
        ],
      },
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/',
            redirect: '/form/basic-form',
          },
          {
            name: 'basic-form',
            icon: 'smile',
            path: '/form/basic-form',
            component: './firstPage',
          },
          {
            name: 'step-form',
            icon: 'smile',
            path: '/form/step-form',
            component: './firstPage',
          },
          {
            name: 'advanced-form',
            icon: 'smile',
            path: '/form/advanced-form',
            component: './firstPage',
          },
        ],
      },
    ]
  }
]