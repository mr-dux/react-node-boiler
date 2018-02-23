import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Todos, {getRows} from '../components/Todos';
import {expect} from 'chai';

Enzyme.configure({adapter: new Adapter()});

describe('Todos test',
    () => {
        //Component test
        it("Display todos", () => {
            const func = () => {};
            const testComponent = <Todos path={""} todos={["test msg"]} addTodo={func} removeTodo={func}/>;
            const renderedComponent = shallow(testComponent);
            //console.log(renderedComponent.debug());
            expect(renderedComponent.contains("test msg")).to.equal(true);
        });
        //function test
        it("getRows() test, todos count equal row count ", () => {
            const todos = ["one","two","three"];
            const result = getRows(todos);
            expect(result.length).to.equal(todos.length);
        });
    }
);
