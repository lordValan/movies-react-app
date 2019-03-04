// Core
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// Styles
import styles from './Conformator.module.scss';
// Instruments
import PropTypes from 'prop-types';

class Conformator extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        const domNode = ReactDOM.findDOMNode(this.wrapperRef);

        if ((!domNode || !domNode.contains(event.target))) {
            this.props.onCancel();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    onAcceptClickHandler() {
        this.props.onAccept(this.props.movie);
        this.props.onCancel();
    }

    render() {
        return (
            <section className = { `${styles.conformator} ${this.props.className}` } ref={ this.setWrapperRef } >
                <p>Are you sure?</p>
                <section className = { styles.buttons }>
                    <button className = { styles.btCancel }
                            onClick = { this.props.onCancel }
                    >
                        Cancel
                    </button>
                    <button className = { styles.btAccept }
                            onClick = { this.onAcceptClickHandler.bind(this) }
                    >
                        Yes
                    </button>
                </section>
            </section>        
        )
    }
}

Conformator.propTypes = {
    movie: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default Conformator;