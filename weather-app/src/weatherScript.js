ReactDOM.render(
    <div>
      <header>
        <div className="head">
          <h1>Weather</h1>
          <div className="searchBar">
            <input id="searchInput" type="text" placeholder="" />
            <button className="search" id="searchBtn">Search</button>
          </div>
        </div>
  
        <div className="navigation">
          <nav>
            <ul>
              <li><a href="#">Cities</a></li>
              <li><a href="#">Weather Map</a></li>
              <li><a href="#">Info</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>,
    document.getElementById("container")
  );
  