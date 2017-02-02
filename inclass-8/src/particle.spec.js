import { expect } from 'chai'
import { jsdom } from 'jsdom';
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok

        //
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, {width: 5, height: 5})
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0,{width: 5, height: 5}) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // implement me:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 2.0, {width: 5, height: 5}) // dt is different here
        expect(velocity).to.eql([2.0, 0.0])

    })

    it('particles should wrap around the world', () => {
        // implement me:

        const p = particle({ position: [3, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, {width: 2, height:2}) // dt is different here
        expect(position[0]).to.be.within(0.0, 2.0)
        expect(position[1]).to.be.within(0.0, 2.0)

        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
    })

})
