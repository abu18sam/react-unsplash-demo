import AppLayout from './components/appLayouts/AppLayout';
import ImagesList from './pages/imagesList/ImagesList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <>
      <AppLayout>
        <ImagesList />
      </AppLayout>
    </>
  );
}

export default App;
