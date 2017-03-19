import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'

import { shallow } from 'enzyme';

import { findDOMNode } from 'react-dom'

import * as Actions from '../../../actions' ;
import { Articles, AddArticle } from './articles'

const findByName = (children, name) => {
    const result = Array.prototype.filter.call(children, it => it.name === name)
    return result.length ? result[0] : null
}

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate Article View', ()=>{


    it ('should render articles', () => {

        const contents = [
            {id : 1, text: "article 1", author: "A", timestamp: "111111", image:""},
            {id : 2, text: "article 2", author: "A", timestamp: "111111", image:""}
        ];

        const node = shallow(<Articles contents={contents} addArticle={_=>_} search={_=>_}/>)

        expect(node.find('.article').children()).to.have.length(2)
    });


    it ('should dispatch actions to create a new article', ()=>{
        const article = "new post";
        const expectedAction = {
            type: Actions.ADD_CONTENT,
            article
        }

        let action = {}
        const addArticle = TestUtils.renderIntoDocument(
            <div>
                <AddArticle addArticle={ (text) => { 
                    action = {type: "ADD_CONTENT", article: text}
                }}/>
            </div>
        ).children[0]

        const input = findByName(addArticle.children, 'inputArticle')
        expect(input.type).to.equal('text')
        expect(input.value).to.equal('')
        input.value = article // update the text in the input
        TestUtils.Simulate.change(input)

        const button = findByName(addArticle.children, 'btnAddArticle')
        expect(action).to.deep.equal({})
        TestUtils.Simulate.click(button)
        expect(action.type).to.deep.equal(expectedAction.type)
    })
})
