import React, {useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';

import LOCAL_STORAGE_KEYS from '../../constants/localStorageKeys';
import {storeInLocalStorage, retrieveFromLocalStorage} from '../../helpers/localStorageHelpers';

/**
 * @description
 * used to let the user know that this website is an example / portfolio website
 * this should only be displayed once
 */
const ExampleWebsiteWarningModal = () => {

    /**
     * @description
     * determines if user has seen the modal before
     * @returns {boolean}
     */
    const getShownExampleSiteMessageFromLocalStorage = () => {
        return retrieveFromLocalStorage(LOCAL_STORAGE_KEYS.SHOWN_EXAMPLE_SITE_MSG) || false;
    }

    // only shows the modal once
	const [showModal, setShowModal] = useState(!getShownExampleSiteMessageFromLocalStorage());
    

    const setShownExampleSiteMessageFromLocalStorage = () => {
        storeInLocalStorage(LOCAL_STORAGE_KEYS.SHOWN_EXAMPLE_SITE_MSG, true);
    }

    const handleHideModal = () => {
        setShownExampleSiteMessageFromLocalStorage();
        setShowModal(false);
    }

	return (
		<Modal
                className='example-website-warning-modal'
                isOpen={showModal}
                toggle={handleHideModal}
            >
                <ModalHeader>This is only a example website</ModalHeader>
                <ModalBody className='text-center'>
                    <div className='mt-1 mb-1'>
                        This is an example site that is part of a portfolio, this website doesn&apos;t provide any service or products
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleHideModal}>Close</Button>
                </ModalFooter>
            </Modal>
	);
}

export default ExampleWebsiteWarningModal;