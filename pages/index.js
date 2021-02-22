import React from 'react';
import Head from 'next/head';

import SearchForm from '../containers/search-form';
import SearchResults from '../containers/search-results';

function Home() {
  return (
    <div className="h-100">
      <Head>
        <title>Mega Search Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-md">
        <header className="row pt-4">
          <div className="col text-center">
            <h1>Mega Search Engine</h1>
          </div>
        </header>
        <SearchForm />
        <SearchResults />
      </div>
    </div>
  );
}

export default Home;
