import PropTypes from 'prop-types';
import Header from '../header/Header';
import { memo } from "react";

const AppLayout = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}

AppLayout.propTypes = {
    children: PropTypes.elementType.isRequired
}

export default memo(AppLayout);