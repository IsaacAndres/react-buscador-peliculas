import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovie'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {  
  const [sort, setSort] = useState (false)

  const {search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search  })
    }, 500) 
    , []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div>
      <header>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            value={search} 
            name='query' 
            type="text" 
            placeholder='Star Wars, The Matrix...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{error}</p>}
      </header>
      
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={ movies } />
        }        
      </main>
    </div>
  )
}

export default App
