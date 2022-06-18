import PropTypes from 'prop-types';
import { memo } from 'react';
import Card from 'react-bootstrap/Card';

const ImageCard = props => {
    const { imageUrl, photoBy, alt_description } = props;

    return (
        <>
            <Card className='image-card'>
                <Card.Img  src={imageUrl} title={`Photo by: ${photoBy}`} alt={alt_description? alt_description : ''} />
                {/* <Card.Body>
                    <Card.Title>Photo by: <i>{photoBy}</i></Card.Title>
                    <Card.Text>
                        {imageDescription}
                    </Card.Text>
                </Card.Body> */}
            </Card>
        </>
    )
}

ImageCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    photoBy: PropTypes.string,
    imageDescription: PropTypes.string,
    alt_description: PropTypes.string
}

export default memo(ImageCard);