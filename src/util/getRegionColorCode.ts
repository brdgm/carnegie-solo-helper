import Region from '@/services/enum/Region'

/**
 * Get color code for region.
 * @param region Region
 * @returns Color code
 */
export default function(region: Region) : string {
  switch (region) {
    case Region.EAST:
      return '#886088'
    case Region.MIDWEST:
      return '#c1503d'
    case Region.SOUTH:
      return '#64a86c'
    case Region.WEST:
      return '#c2b59b'
    default:
      throw new Error(`Invalid region: ${region}.`)
  }
}
