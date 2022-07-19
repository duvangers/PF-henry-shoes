import { getFiltersSearchbar } from '../../redux/actions'

export default function SearchBar({ dispatch, setName, name, navigate }) {
  //   const [name, SetName] = useState();
  function handleOnChange(e) {
    setName(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault()
    navigate('/filters')
    dispatch(getFiltersSearchbar(name))
  }
  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={name}
        onChange={e => handleOnChange(e)}
      />
      <button className="btn btn-outline-success bg-dark " type="submit" onClick={e => handleSearch(e)}>
        Search
      </button>
    </form>
  )
}
