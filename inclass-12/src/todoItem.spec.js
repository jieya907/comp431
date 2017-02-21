import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import { assert } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}


describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument

        const node = TestUtils.renderIntoDocument(<div> 
                <ToDoItem id={1} text="hi" done={false} toggle={_ => _} remove={_ => _} />
            </div>).children[0]
        // findDOMNode and assert 3 children of the ToDoItem element
        expect(node.children).to.have.length(3)
        // assert the innerHTML of the todo is the text you initially set
        
        assert.equal(node.children[1].innerHTML, "hi")
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element

        const node = TestUtils.renderIntoDocument(<div> 
                <ToDoItem id={1} text="hi" done={false} toggle={_ => _} remove={_ => _} />
            </div>).children[0]
        // findDOMNode and assert 3 children of the ToDoItem element
        expect(node.children).to.have.length(3)

        // assert there is no child with classname 'completed'
        expect(findByClassname(node.children, "completed"), null)
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument

        const node = TestUtils.renderIntoDocument(<div> 
                <ToDoItem id={1} text="hi" done={false} toggle={() => toggled=true} remove={_ => _} />
            </div>).children[0]
        // when the checkbox is clicked via TestUtils.Simulate.click()

        const button = findByClassname(node.children, 'check glyphicon glyphicon-check')
        expect(toggled).to.be.false
        TestUtils.Simulate.click(button)
        expect(toggled).to.be.true

        // we expect the variable toggled to be true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        // use TestUtils.renderIntoDocument

        const node = TestUtils.renderIntoDocument(<div> 
                <ToDoItem id={1} text="hi" done={false} toggle={_=> _} remove={() => removed=true} />
            </div>).children[0]
        // when the checkbox is clicked via TestUtils.Simulate.click()

        const button = findByClassname(node.children, 'destroy glyphicon glyphicon-remove')
        expect(removed).to.be.false
        TestUtils.Simulate.click(button)
        expect(removed).to.be.true
    })

    it('should display a completed ToDo', () => {
         const node = TestUtils.renderIntoDocument(<div> 
                <ToDoItem id={1} text="hi" done={true} toggle={_=> _} remove={() => removed=true} />
            </div>).children[0]
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
         expect(findByClassname(node.children, "completed"), true)
    })

})
