import React, {useState} from "react"
import Head from 'next/head'

import Result from "../organisms/result"

import connector from "../lib/connector"

function Home({search, searchActions}) {
  const {
    querying,
    items,
    pagination
  } = search
  const [text, setText] = useState("")
  const [engine, setEngine] = useState('google')
  
  const onSearch = () => {
    if (text.trim().length > 0) {
      searchActions.query(text, { engine })
    }
  }
  
  const onTextChange = (event) => {
    setText(event.currentTarget.value)
  }
  
  const onEngineChange = (event) => {
    setEngine(event.currentTarget.value)
  }
  
  const onNextPage = () => {
    searchActions.paginate(text, { engine, page: pagination.page + 1 })
  }
  
  const renderLoader = () => {
    return (
      <div className="text-center mb-2">
        <img src="/images/loader.gif"/>
      </div>
    )
  }
  
  const renderEmptyData = () => {
    if (querying) {
      return renderLoader()
    }

    if (items.length === 0) {
      return null
    }
  }
  
  const renderData = () => {
    if (items.length === 0) {
      return null
    }
    return (
      <>
        {items.map((item, index) => {
          return <Result key={`result-${index}`} {...item}/>
        })}
        {querying ? renderLoader() : (
          <div className="text-center mb-4">
            <nav aria-label="Load more pagination">
              <ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" onClick={onNextPage}>Load More</a></li>
              </ul>
            </nav>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="h-100">
      <Head>
        <title>Hepu Search Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-md">
        <header className="row mt-4">
          <div className="col text-center">
            <h1>Search Engine</h1>
          </div>
        </header>
        <section className="form-group row mt-4">
          <div className="col">
            <input type="text"
                   class="form-control"
                   id="text"
                   name="text"
                   aria-describedby="searchText"
                   placeholder="Type your search..."
                   value={text}
                   onChange={onTextChange}
                   onKeyPress={(event) => {
                     if (event.charCode === 13) {
                       onSearch()
                     }
                   }}
                   disabled={querying}/>
          </div>
          <div className="col-lg-2">
            <select className="custom-select"
                    onChange={onEngineChange}
                    value={engine}
                    disabled={querying}
                    onKeyPress={(event) => {
                      if (event.charCode === 13) {
                        onSearch()
                      }
                    }}>
              <option value="google">Google</option>
              <option value="bing">Bing</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="col-lg-2 text-right">
            <button type="submit" class="btn btn-primary btn-block" onClick={onSearch} disabled={querying || text.trim().length === 0}>Search</button>
          </div>
        </section>
        <section className="row">
          <div className="col">
            {items.length === 0 && pagination.page === 1 ? renderEmptyData() : null}
            {items.length > 0 ? renderData() : null}
          </div>
        </section>
      </div>
    </div>
  )
}

export default connector(['search'], ['search'])(Home)