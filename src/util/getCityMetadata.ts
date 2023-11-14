import CityMetadata from '@/services/CityMetadata'
import City from '@/services/enum/City'
import Region from '@/services/enum/Region'

/**
 * Get metadata for city.
 * @param city City
 * @returns City metadata
 */
export default function(city: City) : CityMetadata {
  switch (city) {
    case City.SEATTLE:
      return { region: Region.WEST, slots: 1 }
    case City.HELENA:
      return { region: Region.WEST, slots: 1 }
    case City.PORTLAND:
      return { region: Region.WEST, slots: 1 }
    case City.BOISE:
      return { region: Region.WEST, slots: 1 }
    case City.SAN_FRANCISCO:
      return { region: Region.WEST, slots: 5 }
    case City.RENO:
      return { region: Region.WEST, slots: 1 }
    case City.SALT_LAKE_CITY:
      return { region: Region.WEST, slots: 1 }
    case City.DENVER:
      return { region: Region.WEST, slots: 3 }
    case City.LOS_ANGELES:
      return { region: Region.WEST, slots: 3 }
    case City.PHOENIX:
      return { region: Region.WEST, slots: 1 }
    case City.SANTA_FE:
      return { region: Region.WEST, slots: 1 }
    case City.FARGO:
      return { region: Region.MIDWEST, slots: 1 }
    case City.DULUTH:
      return { region: Region.MIDWEST, slots: 1 }
    case City.OMAHA:
      return { region: Region.MIDWEST, slots: 1 }
    case City.ST_PAUL:
      return { region: Region.MIDWEST, slots: 1 }
    case City.CHICAGO:
      return { region: Region.MIDWEST, slots: 5 }
    case City.KANSAS_CITY:
      return { region: Region.MIDWEST, slots: 3 }
    case City.ST_LOUIS:
      return { region: Region.MIDWEST, slots: 3 }
    case City.CINCINNATI:
      return { region: Region.MIDWEST, slots: 1 }
    case City.ALBANY:
      return { region: Region.EAST, slots: 3 }
    case City.BOSTON:
      return { region: Region.EAST, slots: 3 }
    case City.PITTSBURGH:
      return { region: Region.EAST, slots: 3 }
    case City.NEW_YORK:
      return { region: Region.EAST, slots: 5 }
    case City.WASHINGTON:
      return { region: Region.EAST, slots: 3 }
    case City.EL_PASO:
      return { region: Region.SOUTH, slots: 1 }
    case City.DALLAS:
      return { region: Region.SOUTH, slots: 1 }
    case City.MEMPHIS:
      return { region: Region.SOUTH, slots: 1 }
    case City.ATLANTA:
      return { region: Region.SOUTH, slots: 3 }
    case City.CHARLESTON:
      return { region: Region.SOUTH, slots: 1 }
    case City.SAN_ANTONIO:
      return { region: Region.SOUTH, slots: 1 }
    case City.HOUSTON:
      return { region: Region.SOUTH, slots: 3 }
    case City.NEW_ORLEANS:
      return { region: Region.SOUTH, slots: 5 }
    default:
      throw new Error(`Invalid city: ${city}.`)
  }
}
