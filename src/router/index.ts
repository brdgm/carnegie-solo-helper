import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'
import SetupGame from '@/views/SetupGame.vue'
import SetupPrepareGame from '@/views/SetupPrepareGame.vue'
import SetupPreparePlayer from '@/views/SetupPreparePlayer.vue'
import RoundTimelineSelection from '@/views/RoundTimelineSelection.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupPrepareGame',
    name: 'SetupPrepareGame',
    component: SetupPrepareGame
  },
  {
    path: '/setupPreparePlayer',
    name: 'SetupPreparePlayer',
    component: SetupPreparePlayer
  },
  {
    path: '/round/:round/timelineSelection',
    name: 'RoundTimelineSelection',
    component: RoundTimelineSelection
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')