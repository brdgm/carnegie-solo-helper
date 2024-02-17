import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from 'brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupPrepareGame from '@/views/SetupPrepareGame.vue'
import SetupPreparePlayer from '@/views/SetupPreparePlayer.vue'
import RoundTimelineSelectionPlayer from '@/views/RoundTimelineSelectionPlayer.vue'
import RoundTimelineSelectionBot from '@/views/RoundTimelineSelectionBot.vue'
import RoundActionPlayer from '@/views/RoundActionPlayer.vue'
import RoundActionBot from '@/views/RoundActionBot.vue'
import EndOfGame from '@/views/EndOfGame.vue'

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
    path: '/round/:round/timelineSelection/player',
    name: 'RoundTimelineSelectionPlayer',
    component: RoundTimelineSelectionPlayer
  },
  {
    path: '/round/:round/timelineSelection/bot',
    name: 'RoundTimelineSelectionBot',
    component: RoundTimelineSelectionBot
  },
  {
    path: '/round/:round/action/player',
    name: 'RoundActionPlayer',
    component: RoundActionPlayer
  },
  {
    path: '/round/:round/action/bot',
    name: 'RoundActionBot',
    component: RoundActionBot
  },
  {
    path: '/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')