import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { memo } from 'react';
import PropTypes from 'prop-types';

const SearchInput = (props) => {
    const { formSubmit, setSearchQuery, searchQuery, formReset } = props;

    return (
        <>
            <Form onSubmit={formSubmit} onReset={formReset}>
                <Form.Group className="mb-3" controlId="formCarType">
                    <Form.Label>Search by keyword</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control autoComplete='none' type="text" value={searchQuery} placeholder="Enter keyword to search by..." onChange={e => setSearchQuery(e.target.value)} />
                        </Col>
                        <Col>
                            <Row>
                                <span style={{ width: 'max-content' }}>
                                    <Button variant="primary" type="submit">
                                        Search
                                    </Button>
                                </span>
                                <span style={{ width: 'max-content' }}>
                                    <Button variant="secondary" type="reset">Reset</Button>
                                </span>
                            </Row>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </>
    )
}

SearchInput.propTypes = {
    formSubmit: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    formReset: PropTypes.func.isRequired,
}

export default memo(SearchInput);