import PropTypes from 'prop-types';
import { memo } from 'react';
import { Row } from 'react-bootstrap';
import ImageCard from '../../imageCard/ImageCard';

const ImageGrid = (props) => {
    const { imagesList } = props;
    return (
        <>
            <Row className="images-grid">
                {imagesList?.map((imageData) => {
                    return (
                        <ImageCard
                            imageUrl={imageData.urls.small}
                            photoBy={imageData.user.name}
                            imageDescription={imageData.description}
                            alt_description={imageData.alt_description}
                            key={imageData.id}
                        />
                    )
                })}
            </Row>
        </>
    )
}

ImageGrid.propTypes = {
    imagesList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string,
        alt_description: PropTypes.string,
        urls: PropTypes.shape({ full: PropTypes.string, thumb: PropTypes.string, small: PropTypes.string, regular: PropTypes.string }),
        user: PropTypes.shape({ first_name: PropTypes.string, name: PropTypes.string, last_name: PropTypes.string })
    }))
}

export default memo(ImageGrid);