import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReportsView from '../views/ReportsView.vue'
import LoginView from '../views/login/LoginView.vue'

//added register view and admin dashboard view
import RegisterView from '../views/login/RegisterView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import adminReports from '../views/admin/AdminReportsView.vue'
import adminUsers from '../views/admin/AdminUsersView.vue'
import AdminCategoriesView from '../views/admin/AdminCategoriesView.vue'
import AdminSettingsView from '../views/admin/AdminSettingsView.vue'
import Adminprofile from '../views/admin/AdminProfileView.vue'

//added warga dashboard view
import WargaDashboardView from '../views/warga/WargaDashboardView.vue'
import WargaProfileView from '../views/warga/EditProfileView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
     path: '/register',
     name: 'register',
     component: RegisterView,
   },
   {
     path: '/admin',
     name: 'admin',
     component: AdminDashboardView,
   },
   {
     path: '/admin/reports',
     name: 'admin-reports',
     component: adminReports,
   },
   {
     path: '/admin/users',
     name: 'admin-users',
     component: adminUsers,
   },
   {
     path: '/admin/categories',
     name: 'admin-categories',
     component: AdminCategoriesView,
   },
   {
     path: '/admin/settings',
     name: 'admin-settings',
     component: AdminSettingsView,
   },
   {
     path: '/admin/profile',
     name: 'admin-profile',
     component: Adminprofile,
   },
   {
     path: '/warga',
     name: 'warga',
     component: WargaDashboardView,
   },
   {
     path: '/warga/edit-profile',
     name: 'warga-edit-profile',
     component: WargaProfileView,
   },

  ],
})

export default router