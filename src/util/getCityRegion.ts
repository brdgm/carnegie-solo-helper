import City from '@/services/enum/City'
import Region from '@/services/enum/Region'

/**
 * Get region for city.
 * @param city City
 * @returns Region
 */
export default function(city: City) : Region {
  switch (city) {
    case City.SEATTLE:
    case City.HELENA:
    case City.PORTLAND:
    case City.BOISE:
    case City.SAN_FRANCISCO:
    case City.RENO:
    case City.SALT_LAKE_CITY:
    case City.LOS_ANGELES:
    case City.PHOENIX:
    case City.SANTA_FE:
      return Region.WEST
    case City.FARGO:
    case City.DULUTH:
    case City.OMAHA:
    case City.ST_PAUL:
    case City.CHICAGO:
    case City.KANSAS_CITY:
    case City.ST_LOUIS:
    case City.CINCINNATI:
      return Region.MIDWEST
    case City.ALBANY:
    case City.BOSTON:
    case City.PITTSBURGH:
    case City.NEW_YORK:
    case City.WASHINGTON:
      return Region.EAST
    case City.EL_PASO:
    case City.DALLAS:
    case City.MEMPHIS:
    case City.ATLANTA:
    case City.CHARLESTON:
    case City.SAN_ANTONIO:
    case City.HOUSTON:
    case City.NEW_ORLEANS:
      return Region.SOUTH
    default:
      throw new Error(`Invalid city: ${city}.`)
  }
}
