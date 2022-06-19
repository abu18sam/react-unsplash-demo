import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import SearchInput from '../../components/searchInput/SearchInput';
import UnsplashInstance from '../../service/UnsplashInstance';
import PaginationComponent from '../../components/pagination/Pagination';
import SpinnerLoader from '../../components/loader/Loader';
import { debounce } from '../../utils/functions/Debounce';

const ImageGrid = lazy(() => import('../../components/imagesContainer/imageGrid/ImageGrid/ImageGrid'));

const ImagesList = (props) => {
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalImages, setTotalImages] = useState(1);
    const [imagesList, setImagesList] = useState([]);
    const [itemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(false);

    const fetchImageByQuery = ({ newSearch = false, searchQuery, currentPage, itemsPerPage }) => {
        setImagesList([]);
        setTotalImages(0);
        setIsLoading(true);
        UnsplashInstance.search.getPhotos({
            query: searchQuery,
            page: newSearch ? 1 : currentPage,
            perPage: itemsPerPage,
        })
            .then(resp => {
                if (resp?.status === 200 && resp?.response?.results?.length) {
                    setImagesList(resp.response.results);
                    setTotalImages(resp.response.total);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                if (newSearch) {
                    setCurrentPage(1);
                }
                setIsLoading(false);
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCallWithQuery = useCallback(debounce(fetchImageByQuery, 3000), []);

    const fetchAllImagesList = ({ currentPage, itemsPerPage }) => {
        setImagesList([]);
        setTotalImages(0);
        setIsLoading(true);
        UnsplashInstance.photos.list({
            page: currentPage,
            perPage: itemsPerPage
        })
            .then(resp => {
                if (resp?.status === 200 && resp?.response?.results?.length) {
                    setImagesList(resp.response.results);
                    setTotalImages(resp.response.total);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCall = useCallback(debounce(fetchAllImagesList, 3000), []);

    const onResetSearchForm = useCallback((e) => {
        delayedCall({
            currentPage: 1, itemsPerPage, newSearch: true,
        });
        setSearchQuery('');
        setCurrentPage(1);
        localStorage.setItem('searchQuery', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, itemsPerPage])

    const formSubmit = useCallback((e) => {
        e.preventDefault();
        localStorage.setItem('searchQuery', searchQuery);
        if (searchQuery?.length) {
            delayedCallWithQuery({
                searchQuery, currentPage, itemsPerPage, newSearch: true,
            });
        }
        else {
            delayedCall({
                searchQuery, currentPage, itemsPerPage, newSearch: true,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, currentPage, itemsPerPage]);

    // fetch data on component did mount
    useEffect(() => {
        delayedCall({
            searchQuery, currentPage, itemsPerPage, newSearch: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchQuery?.length) {
            delayedCallWithQuery({
                searchQuery, currentPage, itemsPerPage
            });
        }
        else {
            delayedCall({
                searchQuery, currentPage, itemsPerPage, newSearch: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const navigateToPage = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <>
            <Container>
                <SearchInput
                    formSubmit={formSubmit}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    formReset={onResetSearchForm}
                />

                <Suspense fallback={<SpinnerLoader />}>
                    {imagesList?.length && !isLoading ? <ImageGrid
                        imagesList={imagesList}
                    /> : <SpinnerLoader />}
                </Suspense>

                <div className='pagination-container mt-3'>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalItems={totalImages}
                        itemsPerPage={itemsPerPage}
                        navigateToPage={navigateToPage}
                    />
                </div>

            </Container>
        </>
    )
}

export default ImagesList;