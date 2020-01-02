import React from 'react';
import CompaniesPage from '../components/CompaniesPage';
const App: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-2'>
        <main>
            <CompaniesPage />
        </main>
    </div>
  );
};

export default App;
