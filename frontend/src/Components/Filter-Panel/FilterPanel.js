import "./FilterPanel.css";

function FilterPanel(){

    const clearFilters = (evt) =>{
        evt.preventDefault();
    }

    const applyFilters = (evt) =>{
        evt.preventDefault();
    }

    return (
        <div className="filter-container">
            <form className="filters-form">
                <div className="flex-center filter-header">
                    <h3>Filters</h3>
                    <button className="flex-center btn btn-primary" onClick={clearFilters}>
                        <span className="fa fa-close" />&nbsp;
                        Clear All
                    </button>
                </div>
                <div className="filter-section">
                    <label htmlFor="price-range">Price Range</label><br/>
                    <input type="number" name="price-range" placeholder="Min"/>
                    <input type="number" name="price-range" placeholder="Max"/>
                </div>
                <div className="filter-section">
                    <label htmlFor="genres">Genres</label><br/>
                    <input type="checkbox" name="Fiction" value="Fiction"/>
                    <label htmlFor="Fiction">Fiction</label><br/>
                    <input type="checkbox" name="Sci-Fi" value="Sci-Fi"/>
                    <label htmlFor="Sci-Fi">Sci-Fi</label><br/>
                    <input type="checkbox" name="Health" value="Health"/>
                    <label htmlFor="Health">Health</label><br/>
                    <input type="checkbox" name="Academic" value="Academic"/>
                    <label htmlFor="Academic">Academic</label><br/>
                    <input type="checkbox" name="Cooking" value="Cooking"/>
                    <label htmlFor="Cooking">Cooking</label><br/>
                </div>
                <div className="filter-section">
                    <label htmlFor="language">Language</label><br/>
                    <input type="checkbox" name="English" value="English"/>
                    <label htmlFor="English">English</label><br/>
                    <input type="checkbox" name="Hindi" value="Hindi"/>
                    <label htmlFor="Hindi">Hindi</label><br/>
                    <input type="checkbox" name="Other" value="Other"/>
                    <label htmlFor="Other">Other</label><br/>
                </div>
                <div className="filter-footer">
                    <button className="flex-center btn btn-primary" onClick={applyFilters}>Apply Filters</button>
                </div>
            </form>
        </div>
    );
}

export default FilterPanel;