const searchBtn = document.getElementById("search-btn");
const cocktailList = document.getElementById("cocktail");
const cocktailDetailsContent = document.querySelector('.cocktail-details-content');

const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listener
searchBtn.addEventListener('click', getCocktailList);
cocktailList.addEventListener('click', getCocktailRecipe);
recipeCloseBtn.addEventListener('click', () => {
    cocktailDetailsContent.parentElement.classList.remove('showRecipe');
})


//get cocktail list that match with name
function getCocktailList(){

    let searchInputText = document.getElementById('search-input').value.trim();

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +searchInputText)

    
    .then(response => response.json())
    .then(data => {
        //console.log(data);

        let html ="";
        let k ="";

        if(data.drinks)
        {
            data.drinks.forEach(drinks => {
                html += `
                    <div class="cocktail-item" data-id = "${drinks.idDrink}"> 
                        <div class="cocktail-img">
                            <img src="${drinks.strDrinkThumb}"  alt="cocktail" >
                        </div>
                        <div class="cocktail-name">
                            <h3> ${drinks.strDrink}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
       
                `;
                
            });
            cocktailList.classList.remove('notFound');
        }
        else
        {
            html = "Sorry, we didn't find any Cocktail!";
            cocktailList.classList.add('notFound');
        }
        cocktailList.innerHTML = html;
    })

}


//get recipe for the cocktail

function getCocktailRecipe(e)
{
    e.preventDefault();
    //console.log(e.target);

    if(e.target.classList.contains('recipe-btn'))
    {
        let cocktailItem = e.target.parentElement.parentElement;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailItem.dataset.id}`)
        .then(response => response.json())
        .then(data => cocktailRecipeModal(data.drinks));
    }
}


//create a model

function cocktailRecipeModal(drinks)
{
    //console.log("hello from cocktailrecipeblock"+drinks);
    drinks = drinks[0];
    //console.log(drinks.strDrink);


    let html = `
        <h2 class="recipe-title">
                ${drinks.strDrink}
        </h2>
        <p class="recipe-category">${drinks.strCategory}</p>
        
      
       
        
           
    
        <div class="recipe-meal-img">
            <img src="${drinks.strDrinkThumb}" >
        </div>
    `;
    let Ingredient = "<h3> Ingredient: </h3>"
    k = 
     "<ul>";
    for(let i=1; i<16; i++)
    {
        var detail = drinks[`strIngredient${i}`];
        if(detail != null)
        {
        k += "<li>" + drinks[`strMeasure${i}`] +": " + drinks[`strIngredient${i}`] +"</li>";
       
        }
       else
        {
            break;
        }
     }
     k += "</ul>";

     let instructionTitle = "<h3> Instruction: </h3>"
     let instruction = drinks.strInstructions;
    

     cocktailDetailsContent.innerHTML = html +Ingredient +k +instructionTitle +instruction;
     cocktailDetailsContent.parentElement.classList.add('showRecipe');
     cocktailDetailsContent.parentElement.classList.add('recipeList');

  
}



// function getIngredient(drinks)
// {
//     k = "<ul>";
//     for(let i=1; i<drinks.length; i++)
//     {
//         var detail = drinks[`strIngredient${i}`];
//         if(detail != null)
//         {
//         k += "<li>" + drinks[`strMeasure${i}`] +": " + drinks[`strIngredient${i}`] +"</li>";
//         }
//         else{
//             break;
//         }
//     }
//     k += "</ul>";


//     cocktailDetailsContent.innerHTML = k;
//     cocktailDetailsContent.parentElement.classList.add('showRecipe');
// }