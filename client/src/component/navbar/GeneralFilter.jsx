export default function GeneralFilter({ categories, funtionFilter }) {
  function handleClick(e) {
    funtionFilter(e.target.id)
  }

  return (
    <ul className="dropdown-menu" placeholder="hola" aria-labelledby="navbarDropdown">
      <div className="dropdown-item" id="All" onClick={e => handleClick(e)}>
        All
      </div>

      {categories &&
        categories.map(category => (
          <li key={category.id}>
            <div className="dropdown-item" id={category.name} onClick={e => handleClick(e)}>
              {category.name}
            </div>
          </li>
        ))}
    </ul>
  )
}
