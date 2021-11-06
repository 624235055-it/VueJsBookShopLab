import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '../components/Books.vue'
import BookAddNew from '../components/BookAddNew.vue'
import BookEdit from '../components/BookEdit.vue'
import Students from '../components/Students.vue'
import StudentAddNew from '../components/StudentAddNew.vue'
import StudentEdit from '../components/StudentEdit.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: BookAddNew
  },  
  {
    path: '/editbook/:bookid',
    name: 'EditBook',
    component: BookEdit
  },  
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
  {
    path: '/addstudent',
    name: 'StudentAddNew',
    component: StudentAddNew
  }, 
  {
    path: '/editstudent/:number',
    name: 'EditStudent',
    component: StudentEdit
  },  
  {
    path: '*',
    name: 'NotFound',
    component: Login    
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router