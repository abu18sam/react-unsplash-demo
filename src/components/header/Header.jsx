import Container from 'react-bootstrap/Container';
import { memo } from "react";

const Header = props => {
    return (
        <header>
            <Container className='mt-5'>
                <h2 className='header-title'>Images Gallery</h2>
            </Container>
        </header>

    )
}

export default memo(Header);