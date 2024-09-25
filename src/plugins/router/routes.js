export const routes = [
  { path: '/', redirect: '/home' },

  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'student',
        component: () => import('@/pages/student.vue'),
      },
      {
        path: 'stock',
        component: () => import('@/pages/stock.vue'),
      },
      {
        path: 'expend',
        component: () => import('@/pages/expend.vue'),
      },
      {
        path: 'transaction',
        component: () => import('@/pages/transaction.vue'),
      },
      {
        path: 'users',
        component: () => import('@/pages/users.vue'),
      },
      {
        path: 'setting',
        component: () => import('@/pages/setting.vue'),
      },      
      {
        path: 'home',
        component: () => import('@/pages/home.vue'),
      },
      {
        path: 'cp422101',
        component: () => import('@/pages/cp422101.vue'),
      },
      {
        path: 'cp422021',
        component: () => import('@/pages/cp422021.vue'),
      },
      {
        path: 'attendancecheck',
        component: () => import('@/pages/attendancecheck.vue'),
      },
      {
        path: 'attendancecheck/:courseid',
        component: () => import('@/pages/attendancecheck.vue'),
      },
      {
        path: 'home_std',
        component: () => import('@/pages/home_std.vue'),
      },
      {
        path: 'cp422021std',
        component: () => import('@/pages/cp422021std.vue'),
      },
      {
        path: 'cp422101std',
        component: () => import('@/pages/cp422101std.vue'),
      },
            
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
