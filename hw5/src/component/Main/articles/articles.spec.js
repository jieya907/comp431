import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'

import { shallow } from 'enzyme';

import { findDOMNode } from 'react-dom'

import * as Actions from '../../../actions' ;
import { Articles, AddArticle } from './articles'

import { addArticleFetch } from './articleAction'

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
        const article = {
            text: "another post"
        }
        addArticleFetch(article)(
            fn => (action) => {
                expect(action.type).to.eql("ADD_CONTENT")
                expect(action.article.text).to.eql("another post")
            }
        )
    })
})
