import * as _ from 'lodash'
import Cards from './Cards'
import Donation from './enum/Donation'
import City from './enum/City'
import getCityMetadata from '@/util/getCityMetadata'
import { CityCount } from '@/store/state'

/**
 * Places blocking disks on donations and city on start of the game.
 */
export default class BlockDonationCityRandomizer {

  private readonly _disksTotal : number
  private _disksPlaced = 0
  private _donationsDisks : Donation[] = []
  private _cityDisks : CityCount[] = []

  /**
   * @param disksTotal Total disks (18 for two players or solo)
   */
  constructor(disksTotal : number) {
    this._disksTotal = disksTotal
    this.drawCards()
    this._donationsDisks = this.orderedDonations()
    this._cityDisks = this.orderedCityDisks()
  }

  public get donationsDisks() : readonly Donation[] {
    return this._donationsDisks
  }

  public get cityDisks() : readonly CityCount[] {
    return this._cityDisks
  }

  /**
   * Draw solo mode cards to place disks by random on donation and city slots.
   */
  private drawCards() {
    const cards = _.shuffle(Cards.getAll())
    for (const card of cards) {
      this.placeDonationDisk(card.donation)
      card.constructionCities.forEach(city => this.placeCityDisk(city))
      if (this._disksPlaced == this._disksTotal) {
        break
      }
    }
  }

  /**
   * Place a donation disk
   * @param donation Donation
   */
  private placeDonationDisk(donation: Donation) {
    if (this._disksPlaced < this._disksTotal && !this._donationsDisks.includes(donation)) {
      this._donationsDisks.push(donation)
      this._disksPlaced++
    }
  }

  /**
   * Place a city disk (if the city has an available slot left)
   * @param city City
   */
  private placeCityDisk(city : City) {
    if (this._disksPlaced < this._disksTotal) {
      let cityDisks = this._cityDisks.find(item => item.city == city)
      if (!cityDisks) {
        cityDisks = { city, count: 0}
        this._cityDisks.push(cityDisks)
      }
      if (cityDisks.count < getCityMetadata(city).slots) {
        cityDisks.count++
        this._disksPlaced++
      }
    }
  }

  private orderedDonations() : Donation[] {
    return Object.values(Donation)
        .filter(donation => this._donationsDisks.includes(donation))
  }

  private orderedCityDisks() : CityCount[] {
    return Object.values(City)
        .map(city => this._cityDisks.find(item => item.city == city))
        .filter(item => item != undefined) as CityCount[]
  }

}
