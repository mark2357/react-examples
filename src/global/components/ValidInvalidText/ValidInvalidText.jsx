import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ValidInvalidText = (props) => {

    const {
        valid,
        text,
        className,
    } = props;

    let newClassName = 'valid-invalid-text ' + className;
    newClassName += (valid ? ' valid' : ' invalid');
    
    return (
        <div className={newClassName}>
            <FontAwesomeIcon icon={valid ? 'check-circle' : 'times-circle'}/>
            <span className='text-wrapper'>{text}</span>
        </div>
    );

}

ValidInvalidText.propTypes = {
    className: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

ValidInvalidText.defaultProps = {
    className: '',
}

export default ValidInvalidText;