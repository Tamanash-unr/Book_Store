import { useState } from "react";
import { AuthData } from "../AuthContext/AuthWrapper";
import "./AddNew.css";

function AddNew(){
    const defaultImg = "https://firebasestorage.googleapis.com/v0/b/cn-cart-884a6.appspot.com/o/Public%2FThumb_Book.PNG?alt=media";

    const [imgSrc, setImgSrc] = useState(defaultImg);
    const { cookies, toast, toastId } = AuthData();
    let genre = [];
    let language = [];

    function updateBookGenre(evt){
        if(evt.currentTarget.checked && !genre.includes(evt.currentTarget.value)){
            genre.push(evt.currentTarget.value)
        } else {
            if(genre.includes(evt.currentTarget.value)){
                const index = genre.indexOf(evt.currentTarget.value);
                genre.splice(index, 1)
            }
        }
    }

    function updateBookLanguage(evt){
        if(evt.currentTarget.checked && !language.includes(evt.currentTarget.value)){
            language.push(evt.currentTarget.value)
        } else {
            if(language.includes(evt.currentTarget.value)){
                const index = language.indexOf(evt.currentTarget.value);
                language.splice(index, 1)
            }
        }
    }

    function clearForm(){
        genre = [];
        language = [];
        document.getElementById('addNew-form').reset();
    }

    async function handleAddBook(evt){
        evt.preventDefault();

        const token = cookies.user_token;
        toastId.current = toast("Adding New Book", {autoClose: false, isLoading: true});
        
        const newBook = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            image: document.getElementById("image").value,
            price: document.getElementById("price").value,
            year: document.getElementById("year").value,
            desc: document.getElementById("description").value,
            genre,
            language
        }

        try {
            const data = await fetch("http://localhost:8080/booksApi/create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'jwt_auth_token': token
                  },
                body: JSON.stringify(newBook)
            });

            const response = await data.json();

            // Update Toast using ref Id based on Status of API result
            setTimeout(()=>{
                if(data.status === 201){
                    toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 2000, render: response.message, isLoading: false} );
                    clearForm();
                } else {
                    toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 2000, render: response.message, isLoading: false} )
                }
            }, 500);
        } catch (error) {
            toast.error("Failed to Add Book!")
            console.log("Failed to add Book : ",error)
        }
    }

    return (
        <div className="addNew-Form">
            <div className="card-header">
                <h2>Add New Book</h2>
            </div>
            <form id="addNew-form" method="POST" onSubmit={handleAddBook}>
                <div className="addNew-formData">
                    <div className="formInputs">
                        <input type="text" id="title" placeholder="Book Title" required/>
                        <input type="text" id="author" placeholder="Author Name" required/>
                        <input type="text" id="image" placeholder="Image URL" />
                        {/* <i className="fas fa-rotate-right fa-spin" /> */}
                        <input type="number" id="price" placeholder="Price" required/>
                        <input type="number" id="year" placeholder="Year of Publish" required/>
                    </div>
                    <div className="formImage">
                        <img src={imgSrc} alt="Book..."/>
                    </div>
                </div>
                <div className="addNew-Select">
                    <label for="genres">Genres</label><br/>
                    <input type="checkbox" className="genre" name="Fiction" value="Fiction" onChange={updateBookGenre}/>
                    <label for="Fiction">Fiction</label>
                    <input type="checkbox" className="genre" name="Sci-Fi" value="Sci-Fi" onChange={updateBookGenre}/>
                    <label for="Sci-Fi">Sci-Fi</label>
                    <input type="checkbox" className="genre" name="Health" value="Health" onChange={updateBookGenre}/>
                    <label for="Health">Health</label>
                    <input type="checkbox" className="genre" name="Academic" value="Academic" onChange={updateBookGenre}/>
                    <label for="Academic">Academic</label>
                    <input type="checkbox" className="genre" name="Cooking" value="Cooking" onChange={updateBookGenre}/>
                    <label for="Cooking">Cooking</label>
                </div>
                <div className="addNew-Select">
                    <label for="language">Language</label><br/>
                    <input type="checkbox" className="language" name="English" value="English" onChange={updateBookLanguage}/>
                    <label for="English">English</label>
                    <input type="checkbox" className="language" name="Hindi" value="Hindi" onChange={updateBookLanguage}/>
                    <label for="Hindi">Hindi</label>
                    <input type="checkbox" className="language" name="Other" value="Other" onChange={updateBookLanguage}/>
                    <label for="Other">Other</label>
                </div>
                <div className="addNew-Desc">
                    <label for="description">Description</label><br/>
                    <textarea id="description" placeholder="Add Book Description"/>
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