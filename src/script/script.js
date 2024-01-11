$(document).ready(()=>{
    const key = "66d3737f6f13454880d0fe3f9948fa06";

    const inputEl = $(".game-input");
    const searchBtn = $(".search");
    const recentSearchEl = $(".recent-search");
    const searchMsgEl = $(".games-page p");
    const indexPageContainer = $(".index-page");
    const gamesPageContainer = $(".games-page");
    const gamesContainer = $(".games");
    const returnBtn = $(".return");
    const pageNavEl = $(".page-nav");
    const modalEl = $(".modal-box");
    
    const detailPageContainer = $(".detail-page");
    const indexGamePageContainer = $(".index-game-page");
    const returnIndexBtn=$(".return-index");
    const returnBackBtn=$(".return-games");

    const descriptionEl= $(".description");
    const gameNameEl =$(".searched-game-name");
    const developersEl =$(".developers");
    const publishersEl =$(".publishers");
    const ratingEl =$(".stat-value");
    const platformsEl =$(".platforms");
    const genresEl =$(".genres");
    const releasedDateEl =$(".released-date");
    const tagsEl =$(".tags");
    const carouselEl =$(".carousel");
    
    let recentSearches= [];
    let nextUrl;
    let previousUrl;
    let slug;

    
    
    function displayScreenshots(data){
        const images = data.results.map(result => result.image);
        carouselEl.html("");
        // console.log(screenshots + "screenshots");
        images.forEach((image, index) =>{
            let prev, next;
            prev = index - 1;
            next = index + 1;
            prev = prev < 0 ? images.length - 1 : prev;
            next = next === images.length ? 0 : next;
            console.log(`prev is ${prev} and next is ${next}`);
            carouselEl.append(`
                <div id="slide${index}" class="carousel-item relative w-full">
                    <img src="${image}" class="w-full"/>
                    <div
                        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide${prev}" class="btn btn-circle">❮</a>
                        <a href="#slide${next}" class="btn btn-circle">❯</a>
                    </div>
                </div>
            
            `);
        });

        
    }

    function fetchScreenshotsOfTheGame(slug){
        const requestUrl = `https://rawg.io/api/games/${slug}/screenshots?key=${key}`;
        fetchData(requestUrl, "screenshots");
    }

   function displayTheGameDetails(data){
        const name = data.name;
        gameNameEl.append(name);
        const description = $(data.description);
        descriptionEl.html(description);
        
        releasedDateEl.html("");
        releasedDateEl.html('<span class="data-caption">Released On: </span> ');
        const releasedDate = data.released;
        releasedDateEl.append(`<span class="data">${releasedDate}</span>`);

        developersEl.html("");
        developersEl.html('<span class="data-caption">Developers: </span> ');
        const developers = data.developers.map(developer => developer.name);
        developers.forEach(developer => {
            developersEl.append(`<span class="data">'${developer}' </span>`);
        });
        publishersEl.html("");
        publishersEl.html('<span class="data-caption">Publishers: </span> ');
        const publishers= data.publishers.map(publisher=>publisher.name);
        publishers.forEach(publisher => {
            publishersEl.append(`<span class="data">'${publisher}'</span>`);
        });
        const rating = data.rating;
        ratingEl.append(rating);
        // const ratings = data.ratings.map(rating=>{rating.title, rating.percent});
        //  const esbrRating = data.esbr_rating.map(rating => rating.name);
        // const metacritic = data.metacritic;
        genresEl.html("");
        const genres = data.genres.map(genre=>genre.name);
        genres.forEach(genre => {
            genresEl.append( `<div class="badge badge-outline"> '${genre}' </div>`);
        });

        platformsEl.html("");
        const platforms = data.platforms.map(platform=>platform.platform.name);
        platforms.forEach(platform => {
            platformsEl.append(`<div class="badge badge-secondary"> ${platform} </div>`);
        });
        
        tagsEl.html("");
        tagsEl.html('<span class="data-caption">Tags:</span> ');
        const tags = data.tags.map(tag=>tag.name);
        tags.forEach(tag =>{
            tagsEl.append(`<span class="data"> '${tag}'</span>`);
        });
        
        slug = data.slug;
        fetchScreenshotsOfTheGame(slug);
    
    }
    function showPagination(data){
        pageNavEl.html("");
        if(data.previous){
            pageNavEl.append(`<button class="btn btn-primary mr-3">❮❮Previous Page</button>`);
            previousUrl = data.previous;
        }
        if(data.next){
            pageNavEl.append(`<button class="btn btn-primary ">Next Page❯❯</button>`);
            nextUrl= data.next;
        }
    }

    function showOrHidePage(page, toShow = true){
        if(toShow){//showing the page
            if(page === "index"){
                indexPageContainer.removeClass("hidden");
                // alert("1");
            }else if (page === "games"){
                gamesPageContainer.removeClass("positioned");
                // alert("2");
            }else if(page === "detail-page"){
                detailPageContainer.removeClass("positioned");
                // alert("3");
            }else{
                indexGamePageContainer.removeClass("positioned");
                // alert("4");
            }
        }else{//hiding the page
            if(page === "index"){
                indexPageContainer.addClass("hidden");
                // alert("5");
            }else if (page === "games"){
                gamesPageContainer.addClass("positioned");
                // alert("6");
            }else if(page === "detail-page"){
                detailPageContainer.addClass("positioned");
                // alert("7");
            }else{
                indexGamePageContainer.addClass("positioned");
                // alert("8");
            }
        }
    }

    function displayGames(data){
        gamesContainer.html("");
        
        // result.platforms[0].platform.name
        for(result of data.results){
            const platforms =result.platforms.map(platform => platform.platform.name);
            console.log("platforms are ");
            console.log(platforms);
            gamesContainer.append(`
                <div class="card card-compact bg-base-100 shadow-xl  hover:opacity-90">
                    <figure><img src="${result.background_image}" alt="${result.name}"  data-id="${result.background_image}" ></figure>
                    <div class="card-body">
                        <h2 class="card-title">${result.name}</h2>
                         <div class="data-body"><span class="data-caption">Release Date:</span><span class="data"> ${result.released}</span></div> 
                         <div class="data-body"><span class="data-caption">Platform: </span><span class="data" >${platforms}</span></div>    
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" data-id="${result.id}">Find Out More</button>
                        </div>
                    </div><!--card body end-->
                </div><!--card end-->
            `);
            showPagination(data);
        }
        showOrHidePage("games");
    }
    function fetchData(requestUrl,  dataOf ="games"){
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            if(dataOf === "games"){
                console.log("-----------------fetching games data");
                console.log(data);
                showOrHidePage("index", false);
                displayGames(data);
                inputEl.val("");
            }else if(dataOf === "gameDetail"){
                console.log("-----------------fetching the game detail data");
                console.log(data);
                showOrHidePage("index-games", false);
                showOrHidePage("detail-page");
                displayTheGameDetails(data);
                
            }else{
                console.log("-----------------fetching the game screenshots");
                console.log(data);
                displayScreenshots(data);
            }
           
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
    }

    function fetchGames(gameQueryString){
        const url = "https://api.rawg.io/api/games?";
        
        // console.log(gameQueryString);
        const requestUrl = `${url}key=${key}&search="${gameQueryString}"&page_size=6&search_precise=true`;
        fetchData(requestUrl);
        // searchMsgEl.removeClass("hidden");
        searchMsgEl.html(`Showing results for: <span class="data">${gameQueryString}</span>`);

    }

    function displayRecentSearches(){
        let i= 1;
        readTheSearchesFromLS();
        // console.log("before creating list");
        recentSearchEl.html("");
        if(recentSearches.length > 0){
            recentSearches.forEach(search=>{
                recentSearchEl.append(`<li>${i}.${search}</li>`)
                // console.log("during creating list");
                i++;
            });
        }
   
        // console.log("after creating list");
    }
    function readTheSearchesFromLS(){
        const storedSearches = JSON.parse(localStorage.getItem("Search Queries"));
        if(storedSearches){
            recentSearches = storedSearches;
        }
    }
    function saveTheSearchToLS(queryString){
        let searches;
        // console.log("from save function " + queryString);
        //  console.log(queryString.trim().length);
        if(queryString.trim().length !== 0){
            // console.log("length is not 0");
            if(recentSearches.length === 0){
                //  console.log("!recentSearches");
                recentSearches.push(queryString)
            }else{
                // console.log("recentSearches");
                searches = recentSearches.filter(search=>{
                    return search != queryString;
                });
                recentSearches=searches;
                if(recentSearches.length>13){
                    recentSearches.pop();
                }
                recentSearches.reverse();
                recentSearches.push(queryString);
            }
            recentSearches.reverse();
            // console.log("length " + recentSearches.length);
            localStorage.setItem("Search Queries", JSON.stringify(recentSearches));
        }

    }
    function validateGameNameInput(){
        const input = inputEl.val().trim();
        if(input.length >=1){
            return true;
        }else{
           inputEl.val("");
           inputEl.focus();
           console.log("after validation false");
           return false;
        }
    }
    //when search button is pressed
    searchBtn.on("click", ()=>{
        // console.log("button clicked");
        const searchQuery = inputEl.val();
        // console.log("search query " + searchQuery);
        // console.log(validateGameNameInput());
        if(validateGameNameInput()){
            saveTheSearchToLS(searchQuery);
            displayRecentSearches();
             fetchGames(searchQuery);
            // showGames(searchQuery);
            inputEl.val("");
        }
    });

    // when enter key is pressed down
    inputEl.on("keydown", e=>{
        if(e.key === "Enter"){
            e.preventDefault();
        }
    });

    //after typing in user input and pressing Enter key
    inputEl.on("keyup", e =>{
        console.log("key " + e.key);
        if(e.key === "Enter"){
            // e.stopImmediatePropagation();
            e.preventDefault();
            const searchQuery = inputEl.val();
            // console.log(searchQuery);
            if(searchQuery.trim().length!==0){
                saveTheSearchToLS(searchQuery);
                displayRecentSearches();
                fetchGames(searchQuery);
                inputEl.val("");
            }
        }
    });

    //when next and previous navigation buttons are pressed
    pageNavEl.on("click", "button", e =>{
        // console.log($(e.target).text());
        if($(e.target).text()==="Next Page❯❯"){
            // console.log(nextUrl);
            fetchData(nextUrl);
        }
        if($(e.target).text()==="❮❮Previous Page"){
            // console.log(previousUrl);
            fetchData(previousUrl);
        }
    });
 
    //user presses return back while in games page
     returnBtn.on("click", ()=>{
       showOrHidePage("index");
       inputEl.focus();
       showOrHidePage("games", false);
     });

    //when the image on the game card is pressed 
    gamesContainer.on("click","img", e=>{
        const id = $(e.target).data("id");
        modalEl.html("");
        modalEl.append(`<img src="${id}" alt="">
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
            </form>
            </div>`);
        my_modal_5.showModal();
    });
    //when the find out more button is pressed
    gamesContainer.on("click","button", e=>{
        const id = $(e.target).data("id");
        // console.log("id" + id);
        const url = "https://api.rawg.io/api/games/";
        const requestUrl = `${url}${id}?key=${key}`;
        // const requestUrl = `${url}key=${key}&id=${id}`;
        fetchData(requestUrl, "gameDetail");
        

    });

    //user presses return to index page while in detail page
    returnIndexBtn.on("click", ()=>{
        showOrHidePage("index");
        showOrHidePage("index-games");
        inputEl.focus();
        showOrHidePage("detail-page", false);
        showOrHidePage("games", false);
     });
     //user presses return back while in detail page
     returnBackBtn.on("click", ()=>{
        showOrHidePage("detail-page", false);
        showOrHidePage("index-games");
     });




















     displayRecentSearches();
})
