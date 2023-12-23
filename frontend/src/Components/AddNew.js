import "./AddNew.css";

function AddNew(){
    let imgSrc = "https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/BookStore%2FThumb_Book.PNG?alt=media";

    return (
        <div className="addNew-Form">
            <div className="card-header">
                <h2>Add New Book</h2>
            </div>
            <form method="POST">
                <div className="addNew-formData">
                    <div className="formInputs">
                        <input type="text" placeholder="Book Name" required/>
                        <input type="text" placeholder="Author Name" required/>
                        <input type="text" placeholder="Image URL" required/>
                        {/* <i className="fas fa-rotate-right fa-spin" /> */}
                        <input type="number" placeholder="Price" required/>
                        <label className="publishDate" for="genres">Date of Publish</label>
                        <input type="date" required/>
                    </div>
                    <div className="formImage">
                        <img src={imgSrc} alt="Book..."/>
                    </div>
                </div>
                <div className="addNew-Select">
                    <label for="genres">Genres</label><br/>
                    <input type="checkbox" name="Fiction" value="Fiction"/>
                    <label for="Fiction">Fiction</label>
                    <input type="checkbox" name="Sci-Fi" value="Sci-Fi"/>
                    <label for="Sci-Fi">Sci-Fi</label>
                    <input type="checkbox" name="Health" value="Health"/>
                    <label for="Health">Health</label>
                    <input type="checkbox" name="Academic" value="Academic"/>
                    <label for="Academic">Academic</label>
                    <input type="checkbox" name="Cooking" value="Cooking"/>
                    <label for="Cooking">Cooking</label>
                </div>
                <div className="addNew-Select">
                    <label for="language">Language</label><br/>
                    <input type="checkbox" name="English" value="English"/>
                    <label for="English">English</label>
                    <input type="checkbox" name="Hindi" value="Hindi"/>
                    <label for="Hindi">Hindi</label>
                    <input type="checkbox" name="Other" value="Other"/>
                    <label for="Other">Other</label>
                </div>
                <button className="btn btn-primary flex-center" type="submit">
                    <i className="fas fa-book"/>
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddNew;