import _debounce from 'lodash/debounce';
import DrugsPrescription from '@/components/DrugsPrescription/DrugsPrescription';

function App() {
  return (
    <>
      <header className="bg-slate-500 py-4 mb-5">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl">Diagnostic Robotics Test</h1>
        </div>
      </header>

      <main className="container mx-auto">
        <DrugsPrescription />
      </main>

      <footer>

      </footer>
    </>
  )
}

export default App
