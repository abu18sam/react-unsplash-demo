import Spinner from 'react-bootstrap/Spinner';

const SpinnerLoader = () => {
    return (
        <div className="spinner-loader-container">
            <Spinner role="status" animation="border" variant="success" />
        </div>
    )
}

export default SpinnerLoader;