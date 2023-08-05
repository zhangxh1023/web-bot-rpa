import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/homeView.vue';
import createWorkflowView from '../views/createWorkflowView.vue';
import localWorkflowView from '../views/localWorkflow.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/createWorkflow',
      name: 'createWorkflow',
      component: createWorkflowView
    },
    {
      path: '/localWorkflow',
      name: 'localWorkflow',
      component: localWorkflowView
    }
  ]
});

export default router;
