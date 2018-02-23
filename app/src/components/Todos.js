import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    FlatButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import TextField from 'material-ui/TextField';
import {Link} from "react-router-dom";
import SendIcon from "material-ui/svg-icons/content/send";
import RemoveIcon from "material-ui/svg-icons/content/remove";

const getStyleColor = (link, activeLink) => {
    if (activeLink.indexOf(link) !== -1) return {color: "#dc0e17"}
};

const Links = ({activeLink}) => (<div>
    <Link to="/main" className={"app-link"} style={getStyleColor("main", activeLink)}>Main</Link>
    <Link to="/epic" className={"app-link"} style={getStyleColor("epic", activeLink)}>Epic</Link>
    <Link to="/other" className={"app-link"} style={getStyleColor("other", activeLink)}>Other</Link>
</div>);

class AddTodoField extends Component {

    static propTypes = {addTodoFunc: PropTypes.func.isRequired};

    state = {text: ""};

    handleChange = (event) => {
        this.setState({text: event.target.value})
    };

    onClick = () => {
        const {addTodoFunc} = this.props;
        const {text} = this.state;

        this.setState({text: ""});
        addTodoFunc(text)
    };

    render() {
        const {text} = this.state;

        return (
            <div className="add-todo-field">
                <TextField value={text} onChange={this.handleChange}/>
                <FlatButton icon={<SendIcon/>} onClick={this.onClick.bind(this)} disabled={text.length === 0}/>
            </div>
        );
    }
}

const getRows = (todos, removeFunc) => {
    let rows = [];

    const getRemoveFunc = (index) => () => {
        removeFunc(index)
    };

    todos.forEach((item, i) => {
        const row = (
            <TableRow key={i}>
                <TableRowColumn>{i + 1}</TableRowColumn>
                <TableRowColumn>{item}</TableRowColumn>
                <TableRowColumn><RemoveBtt removeFunc={getRemoveFunc(i)}/></TableRowColumn>
            </TableRow>
        );
        rows.push(row)
    });

    return rows;
};

const RemoveBtt = ({removeFunc}) => <FlatButton icon={<RemoveIcon/>} onClick={removeFunc}/>;

class Todos extends Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        todos: PropTypes.array.isRequired,
        addTodo: PropTypes.func.isRequired,
        removeTodo: PropTypes.func.isRequired,
    };

    render() {
        const {todos, addTodo, path, removeTodo} = this.props;
        return (
            <div className="todos">
                <Links activeLink={path}/>
                <AddTodoField addTodoFunc={addTodo}/>
                <Table multiSelectable={true} selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true} displayRowCheckbox={false} showRowHover={false}>
                        {getRows(todos, removeTodo)}
                    </TableBody>
                </Table>
            </div>);
    }
}

export default Todos;
export {getRows};
