import RegionMetadata from '@/services/RegionMetadata'
import Region from '@/services/enum/Region'

/**
 * Get color code for region.
 * @param region Region
 * @returns Color code
 */
export default function(region: Region) : RegionMetadata {
  switch (region) {
    case Region.EAST:
      return { backgroundColor: '#886088', borderColor: '#7e653c', eventBackgroundColor: '#a77984' }
    case Region.MIDWEST:
      return { backgroundColor: '#c1503d', borderColor: '#783113', eventBackgroundColor: '#c67a54' }
    case Region.SOUTH:
      return { backgroundColor: '#64a86c', borderColor: '#416937', eventBackgroundColor: '#93b67f' }
    case Region.WEST:
      return { backgroundColor: '#c2b59b', borderColor: '#5c3940', eventBackgroundColor: '#ddbe93' }
    default:
      throw new Error(`Invalid region: ${region}.`)
  }
}
