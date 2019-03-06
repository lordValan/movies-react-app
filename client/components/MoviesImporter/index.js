// Core
import React, { Component } from 'react';
// Styles
import styles from './MoviesImporter.module.scss';
// Instruments
import PropTypes from 'prop-types';
import Conformator from '../Conformator';
import { MdFileUpload } from "react-icons/md";
// Components
import Rules from './Rules';

const fileType = 'text/plain';

class MoviesImporter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            showConfirm: false
        }
    }

    onFormSubmitHandler(event) {
        event.preventDefault();

        if(this.state.file.type !== fileType) return;

        this.setState({ showConfirm: true });
    }

    onChoseFileHandler(event) {
        this.setState({ file: event.target.files[0] });
    }

    onCancelHandler() {
        this.setState( { showConfirm: false } );
    }

    render() {
        return (
            <section className = { styles.moviesImporter }>
                <form onSubmit = { this.onFormSubmitHandler.bind(this) }>
                    <section className = { styles.formSection }>
                        <label htmlFor = 'importFile' 
                                className = { styles.inputLabel }
                        >
                            <MdFileUpload className = { styles.inputLabelIcon } />
                            <span>{ this.state.file ? this.state.file.name : 'Choose file' }</span>
                        </label>
                        <input type = 'file' 
                            id = 'importFile'
                            onChange = { this.onChoseFileHandler.bind(this) }
                            accept = { fileType }
                            required
                        />
                    </section>                        
                    <Rules />
                    { this.props.success ? <p className = 'successMessage'>{ this.props.success }</p> : null }
                    { this.props.error ? <p className = 'errorMessage'>{ this.props.error }</p> : null }
                    <section className = { `${styles.formSection} ${styles.formSubmitSection}` }>
                        { 
                            this.state.showConfirm ? 
                                <Conformator onAccept = { this.props.onSend.bind(null, this.state.file) }
                                        onCancel = { this.onCancelHandler.bind(this) }                                        
                                /> 
                                : 
                                null 
                        }
                        <button type = 'submit'
                                className = { styles.formBtubmit }
                        >
                            Send
                        </button>
                    </section>                    
                </form>
            </section>
        )
    }
}

MoviesImporter.propTypes = {
    onSend: PropTypes.func.isRequired
}

export default MoviesImporter;