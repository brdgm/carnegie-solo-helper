import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import TimelineTile from './TimelineTile'
import Region from './enum/Region'
import Event from './enum/Event'

const timelineTiles : TimelineTile[] = [
  {
    id: 1,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.EAST }
    ],
    back: [
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ]
  },
  {
    id: 2,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.WEST }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.DONATION] }
    ]
  },
  {
    id: 3,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.DONATION] }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ]
  },
  {
    id: 4,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.DONATION] }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.EAST }
    ]
  },
  {
    id: 5,
    front: [
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.WEST }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ]
  },
  {
    id: 6,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST }
    ],
    back: [
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.WEST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.TAKE_INCOME], region: Region.EAST }
    ]
  },
  {
    id: 7,
    front: [
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH },
      { events: [Event.DONATION] }
    ]
  },
  {
    id: 8,
    front: [
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.SOUTH }
    ],
    back: [
      { events: [Event.TAKE_INCOME], region: Region.MIDWEST },
      { events: [Event.DONATION] },
      { events: [Event.TAKE_INCOME], region: Region.EAST },
      { events: [Event.TAKE_INCOME], region: Region.WEST }
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
