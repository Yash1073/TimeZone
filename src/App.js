import './App.css';
import { SnackbarProvider } from 'notistack';
import Table from './components/Table';


function App() {
  

  return (
    <div className={`cursor-pointer`}>
     <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000} 
        anchorOrigin={{
          vertical: "center",
          horizontal: "bottom",
        }}
      >
        <div className={`h-full w-screen px-20`}>
          <Table />
        </div>
      </SnackbarProvider>
    </div>
  );
}

export default App;