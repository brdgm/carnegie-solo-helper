import TimelineTiles from '@/services/TimelineTiles'
import { expect } from 'chai'

describe('services/TimelineTiles', () => {
  it('get', () => {
    const timelineTile = TimelineTiles.get(1)

    expect(timelineTile).not.undefined
    expect(timelineTile?.id).to.eq(1)
  })

  it('getAll', () => {
    const timelineTiles = TimelineTiles.getAll()
    expect(timelineTiles.length).eq(8)
  })
})
