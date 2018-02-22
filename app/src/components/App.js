import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router";
import '../res/App.css';
import Todos from "./Todos";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as AppAction from "../actions/AppAction";
import {Paper} from "material-ui";

const getTodo = (todos, addTodo, removeTodo, match) => (
    <Todos addTodo={addTodo} removeTodo={removeTodo} todos={todos} path={match.path}/>
);

const MainTodos = ({todos, addTodo, removeTodo, match}) => getTodo(todos, addTodo, removeTodo, match);
const EpicTodos = ({todos, addTodo, removeTodo, match}) => getTodo(todos, addTodo, removeTodo, match);
const OtherTodos = ({todos, addTodo, removeTodo, match}) => getTodo(todos, addTodo, removeTodo, match);

const mapStateToPropsMain = (state) => ({todos: state.app.mainTodos});
const mapStateToPropsEpic = (state) => ({todos: state.app.epicTodos});
const mapStateToPropsOther = (state) => ({todos: state.app.otherTodos});

const mapDispatchToPropsMain = dispatch => ({
    addTodo: bindActionCreators(AppAction.addMainTodo, dispatch),
    removeTodo: bindActionCreators(AppAction.removeMainTodo, dispatch)
});
const mapDispatchToPropsEpic = dispatch => ({
    addTodo: bindActionCreators(AppAction.addEpicTodo, dispatch),
    removeTodo: bindActionCreators(AppAction.removeEpicTodo, dispatch)
});
const mapDispatchToPropsOther = dispatch => ({
    addTodo: bindActionCreators(AppAction.addOtherTodo, dispatch),
    removeTodo: bindActionCreators(AppAction.removeOtherTodo, dispatch)
});

const ConnectedMain = connect(mapStateToPropsMain, mapDispatchToPropsMain)(MainTodos);
const ConnectedEpic = connect(mapStateToPropsEpic, mapDispatchToPropsEpic)(EpicTodos);
const ConnectedOther = connect(mapStateToPropsOther, mapDispatchToPropsOther)(OtherTodos);

export default class App extends Component {

    render() {
        return (
            <div className="app-div">
                <div className="app-inner-div">
                    <Paper className="app-inner-inner-div">
                        <Switch>
                            <Route path="/main" component={ConnectedMain}/>
                            <Route path="/epic" component={ConnectedEpic}/>
                            <Route path="/other" component={ConnectedOther}/>
                            <Redirect exact from='/' to="/main"/>
                        </Switch>
                    </Paper>
                </div>
            </div>
        );
    }
}
