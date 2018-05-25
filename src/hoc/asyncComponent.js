import React, { Component } from 'react';
import NewPost from '../containers/Blog/NewPost/NewPost'

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount () {
            importComponent() 
            .then(cmp => {
                this.setState({component: cmp.default});
            });
        }
        redner () {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}


export default asyncComponent;