import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LessonsView from '../views/LessonsView.vue'
import LessonDetailView from '../views/LessonDetailView.vue'
import CardsView from '../views/CardsView.vue'
import CardDetailView from '../views/CardDetailView.vue'
import PracticeView from '../views/PracticeView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                  component: HomeView },
    { path: '/lessons',           component: LessonsView },
    { path: '/lessons/:slug',     component: LessonDetailView },
    { path: '/cards',             component: CardsView },
    { path: '/cards/:slug',       component: CardDetailView },
    { path: '/practice',          component: PracticeView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
