import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import SearchInput from '../../components/searchInput/SearchInput';
import UnsplashInstance from '../../service/UnsplashInstance';
// import { MockImagesList } from '../../service/mockdata';
import PaginationComponent from '../../components/pagination/Pagination';


const ImageGrid = lazy(() => import('../../components/imagesContainer/imageGrid/ImageGrid/ImageGrid'));


const debounce = (func, delay = 3000) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, delay);
    };
};

const ImagesList = (props) => {
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalImages, setTotalImages] = useState(1);
    const [imagesList, setImagesList] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const fetchImageByQuery = ({ newSearch = false, searchQuery, currentPage, itemsPerPage }) => {
        UnsplashInstance.search.getPhotos({
            query: searchQuery,
            page: newSearch ? 1 : currentPage,
            perPage: itemsPerPage,
        })
            .then(resp => {
                console.log('querySearch = ', resp);
                if (resp?.status === 200 && resp?.response?.results?.length) {
                    console.log('response with search query ==== ', resp);
                    setImagesList(resp.response.results);
                    setTotalImages(resp.response.total);
                }
                else {
                    setImagesList([]);
                    setTotalImages(0);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                if (newSearch) {
                    setCurrentPage(1);
                }
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCallWithQuery = useCallback(debounce(fetchImageByQuery, 3000), []);

    const fetchAllImagesList = ({ currentPage, itemsPerPage }) => {
        UnsplashInstance.photos.list({
            page: currentPage,
            perPage: itemsPerPage
        })
            .then(resp => {
                if (resp?.status === 200 && resp?.response?.results?.length) {
                    setImagesList(resp.response.results);
                    setTotalImages(resp.response.total);
                }
                else {
                    setImagesList([]);
                    setTotalImages(0);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const delayedCall = useCallback(debounce(fetchAllImagesList, 3000), []);

    const onResetSearchForm = useCallback((e) => {
        delayedCall({
            currentPage: 1, itemsPerPage, newSearch: true,
        });
        setCurrentPage(1);
        localStorage.searchQuery('searchQuery', '');
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

                <Suspense fallback={'...Loading'}>
                    <ImageGrid
                        imagesList={imagesList}
                    />
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