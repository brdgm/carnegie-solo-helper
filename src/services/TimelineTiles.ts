import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import TimelineTile from './TimelineTile'
import Region from './enum/Region'
import Event from './enum/Event'

const timelineTiles : TimelineTile[] = [
  {
    id: 1,
    front: [
      { id:'1f1', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'1f2', events: [Event.DONATION] },
      { id:'1f3', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'1f4', events: [Event.TAKE_INCOME], region: Region.EAST }
    ],
    back: [
      { id:'1b1', events: [Event.DONATION] },
      { id:'1b2', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'1b3', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'1b4', events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ]
  },
  {
    id: 2,
    front: [
      { id:'2f1', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'2f2', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'2f3', events: [Event.DONATION] },
      { id:'2f4', events: [Event.TAKE_INCOME], region: Region.WEST }
    ],
    back: [
      { id:'2b1', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'2b2', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'2b3', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'2b4', events: [Event.DONATION] }
    ]
  },
  {
    id: 3,
    front: [
      { id:'3f1', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'3f2', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'3f3', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'3f4', events: [Event.DONATION] }
    ],
    back: [
      { id:'3b1', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'3b2', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'3b3', events: [Event.DONATION] },
      { id:'3b4', events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ]
  },
  {
    id: 4,
    front: [
      { id:'4f1', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'4f2', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'4f3', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'4f4', events: [Event.DONATION] }
    ],
    back: [
      { id:'4b1', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'4b2', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'4b3', events: [Event.DONATION] },
      { id:'4b4', events: [Event.TAKE_INCOME], region: Region.EAST }
    ]
  },
  {
    id: 5,
    front: [
      { id:'5f1', events: [Event.DONATION] },
      { id:'5f2', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'5f3', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'5f4', events: [Event.TAKE_INCOME], region: Region.WEST }
    ],
    back: [
      { id:'5b1', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'5b2', events: [Event.DONATION] },
      { id:'5b3', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'5b4', events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ]
  },
  {
    id: 6,
    front: [
      { id:'6f1', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'6f2', events: [Event.DONATION] },
      { id:'6f3', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'6f4', events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ],
    back: [
      { id:'6b1', events: [Event.DONATION] },
      { id:'6b2', events: [Event.TAKE_INCOME], region: Region.WEST },
      { id:'6b3', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'6b4', events: [Event.TAKE_INCOME], region: Region.EAST }
    ]
  },
  {
    id: 7,
    front: [
      { id:'7f1', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'7f2', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'7f3', events: [Event.DONATION] },
      { id:'7f4', events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ],
    back: [
      { id:'7b1', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'7b2', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'7b3', events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { id:'7b4', events: [Event.DONATION] }
    ]
  },
  {
    id: 8,
    front: [
      { id:'8f1', events: [Event.DONATION] },
      { id:'8f2', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'8f3', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'8f4', events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ],
    back: [
      { id:'8b1', events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { id:'8b2', events: [Event.DONATION] },
      { id:'8b3', events: [Event.TAKE_INCOME], region: Region.EAST },
      { id:'8b4', events: [Event.TAKE_INCOME], region: Region.WEST }
    ]
  },
]

const timelineTilesMap = new Map<number,TimelineTile>()
timelineTiles.forEach(timelineTile => timelineTilesMap.set(timelineTile.id, timelineTile))

export default {

  /**
   * Get timeline tile by ID
   * @param id ID
   * @returns timeline tile
   */
  get(id: number) : TimelineTile {
    return findMandatory(timelineTilesMap, id)
  },

  /**
   * Get all timeline tiles
   * @returns timeline tiles
   */
  getAll() : TimelineTile[] {
    return timelineTiles
  }

}
