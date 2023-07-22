import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/homeView.vue';
import communityView from '../views/communityView.vue';
import createWorkflowView from '../views/createWorkflowView.vue';
import settingsView from '../views/settingsView.vue';
import userInfoView from '../views/userInfoView.vue';
import userWorkflowsView from '../views/userWorkflowViews.vue';

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
      path: '/userWorkflows',
      name: 'userWorkflows',
      component: userWorkflowsView
    },
    {
      path: '/community',
      name: 'community',
      component: communityView
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfoView
    },
    {
      path: '/settings',
      name: 'settings',
      component: settingsView
    },
  ]
});

export default router;
