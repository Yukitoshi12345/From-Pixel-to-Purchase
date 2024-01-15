$(document).ready(()=>{
    const rawGKey = "66d3737f6f13454880d0fe3f9948fa06";
    const gamespotKey ="6493f75acb2827c70912c6f769c7649ed167342a";

    const inputEl = $(".game-input");
    const searchBtn = $(".search");
    const recentSearchEl = $(".recent-search");
    const recentArticlesEl = $(".recent-articles");
    const searchMsgEl = $(".games-page p");
    const indexPageContainer = $(".index-page");
    const gamesPageContainer = $(".games-page");
    const gamesContentEl = $(".games-content");
    const result404 = $(".result-404");
    const gameCardsContainer = $(".game-cards");
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
    const videoEl =$(".video");
    
    let recentSearches= [];
    let nextUrl;
    let previousUrl;
    let slug;

    //displays the recent arcticles in the collapse component
    function displayArticles(response){
        let title, url;
        response.results.forEach((result, index)=>{

            title = result.title;
            url= result.site_detail_url;
            // console.log(`title: ${title}`);
            // console.log(`url: ${url}`);
            recentArticlesEl.append(`<li class ="hover:text-amber-100 hover:cursor-pointer hover:text-lg border-b-2 border-amber-50" data-url="${url}">${index}.${title}</li>`)
        });
    }
    //displays the video of the game on the detail page
    function displayVideo(response){
        let results = response.results;
        //default link
        //in case any video is not found for a given game
        let src ="https://video.gamespot.com/2022/10/14/7f80585a-d61b-49f2-a0ff-d0301e64934d/Feature_GodofLoreLoki_10142022_1080h5000k.mp4";
        
        //look through the results and get the first hd video
        results.forEach(result=>{
            if(result.hd_url!=""){
                src = result.hd_url;
                return;
            }
        });
        //if no hd video available, choose the first low resolution video
        if(src === ""){
            results.forEach(result=>{
                if(result.low_url!=""){
                    src = result.low_url;
                    return;
                }
            });
        }
        videoEl.attr("src", src );
    }
    

    //shows the screenshot images of the game in carousel component
    function displayScreenshots(data){
        const images = data.results.map(result => result.image);
        carouselEl.html("");
        images.forEach((image, index) =>{
            let prev, next;
            prev = index - 1;
            next = index + 1;
            prev = prev < 0 ? images.length - 1 : prev;
            next = next === images.length ? 0 : next;
            // console.log(`prev is ${prev} and next is ${next}`);
            //putting images in the carousel component
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
    //fetches the game video data
    function fetchGamespotData(requestUrl, content="video"){
        // AJAX call requires a third party library, jQuery
        $.ajax({
            url: requestUrl,
            method: 'GET',
        }).then(function (response) {
            console.log('Ajax Response \n-------------');
            console.log(response);
            if(content==="video"){
                displayVideo(response);
            }else{
                displayArticles(response);
            }
        });
    }
    //fetches the game video data when game slug is passed in
    function fetchTheGameVideo(slug){
        console.log(slug);
        //rawg has titles delimited by - like: the-god-of-war-4
        //gamespot has titles delimited by %20 like: the%20god%20of%20war%204
        //so replacing the rawg delimiter with gamespot delimiter
        const gamespotSlug = slug.replaceAll("-","%20");
        console.log(gamespotSlug);
        const requestUrl = `https://www.gamespot.com/api/videos/?api_key=${gamespotKey}&format=json&limit=10&filter=title:${gamespotSlug}&categories:[{Trailer},{Games}]`;
        fetchGamespotData(requestUrl);
    }

    //fetches the screenshots of the game given the slug
    function fetchScreenshotsOfTheGame(slug){
        const requestUrl = `https://rawg.io/api/games/${slug}/screenshots?key=${rawGKey}`;
        fetchData(requestUrl, "screenshots");
    }

    //displays the game details 
    //attribute/data are like name, description, released date etc
   function displayTheGameDetails(data){

        gameNameEl.html("");
        gameNameEl.append(data.name);

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
        //not showing following attributes
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
        fetchTheGameVideo(slug);
    
    }

    //shows next/previous button for page navigation
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

    //page switch
    //hides and shows the html elements
    //so an user can go from index to games to details pages
    // and back and forth an in between
    function showOrHidePage(page, toShow = true){
        if(toShow){//showing the page
            if(page === "index"){
                indexPageContainer.removeClass("hidden");
                
            }else if (page === "games"){
                gamesPageContainer.removeClass("hidden");
            }else if(page === "detail-page"){
                detailPageContainer.removeClass("hidden");
            }else{
                indexGamePageContainer.removeClass("hidden");
            }
        }else{//hiding the page
            if(page === "index"){
                indexPageContainer.addClass("hidden");
            }else if (page === "games"){
                gamesPageContainer.addClass("hidden");
            }else if(page === "detail-page"){
                detailPageContainer.addClass("hidden");
            }else{
                indexGamePageContainer.addClass("hidden");
            }
        }
    }
    //displays the results from the game search
    function displayGames(data){
        gamesPageContainer.removeClass("hidden");
        //if no games were found as a search result
        if(data.results.length===0){
            result404.removeClass("hidden");
            gamesContentEl.addClass("hidden");
        //when games are found as a search result
        }else{
            //only save the search if there is a matched game result
            saveTheSearchToLS(inputEl.val().trim().toLowerCase());
            displayRecentSearches();
            
            result404.addClass("hidden");
            gamesContentEl.removeClass("hidden");
            gameCardsContainer.html("");
            // result.platforms[0].platform.name
            for(result of data.results){
                const platforms =result.platforms.map(platform => platform.platform.name);
                // console.log("platforms are ");
                // console.log(platforms);
                gameCardsContainer.append(`
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
            inputEl.val("");
        }
    }

    //fetches search result games data
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
                showOrHidePage("games");
                displayGames(data);
            }else if(dataOf === "gameDetail"){
                console.log("-----------------fetching the game detail data");
                console.log(data);
                showOrHidePage("games", false);
                showOrHidePage("index-games", false);
                showOrHidePage("detail-page");
                displayTheGameDetails(data);
            }else if(dataOf === "screenshots"){
                console.log("-----------------fetching the game screenshots");
                console.log(data);
                displayScreenshots(data);
            }else{
                console.log("-----------------fetching the game video");
                console.log(data);
                displayVideo(data);
            }
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
    }
    //fetches the game search given the search word
    function fetchGames(gameQueryString){
        const url = "https://api.rawg.io/api/games?";
        const requestUrl = `${url}key=${rawGKey}&search="${gameQueryString}"&page_size=6&search_precise=true`;
        fetchData(requestUrl);
        searchMsgEl.html(`Showing results for: <span class="data-caption">${gameQueryString}</span>`);
    }

    //shows the recently searched game list
    function displayRecentSearches(){
        let i= 1;
        readTheSearchesFromLS();
        recentSearchEl.html("");
        if(recentSearches.length > 0){
            recentSearches.forEach(search=>{
                recentSearchEl.append(`<li class ="hover:text-amber-100 hover:cursor-pointer hover:text-lg border-b-2 border-amber-50 ">${i}.${search}</li>`);
                i++;
            });
        }
    }

    //reads the search list from the local storage
    function readTheSearchesFromLS(){
        const storedSearches = JSON.parse(localStorage.getItem("Search Queries"));
        if(storedSearches){
            recentSearches = storedSearches;
        }
    }

    //saves the recent search list to the local storage
    function saveTheSearchToLS(queryString){
        let searches;
        //when user didn't type empty string
        if(queryString.trim().length !== 0){
            //if the list is empty, add the searched game to the list
            if(recentSearches.length === 0){
                recentSearches.push(queryString)
            //if the list is not empty,
            //create another list without the game being searched
            // add the the game to the list
            //so most recent search will be on the top of the list
            }else{ 
                searches = recentSearches.filter(search=>{
                    //check if they are same two words, ignoring the case
                    return search.toLowerCase() != queryString.toLowerCase();
                });
                recentSearches=searches;
                //the search list is limited to 13 items
                //stops from perpetually growing
                //the array has most recent searched item as first element
                //and the oldest search as the list element
                //delete the one on the last of the list
                //as it is the oldest search
                if(recentSearches.length>13){
                    recentSearches.pop();
                }
                //reversing the order of the items to match the search order
                //because we will reverse the list again
                //unshift will not work here
                recentSearches.reverse();
                recentSearches.push(queryString);
            }
            //reversing the order of the list
            //so that when appending the list items,
            //the most recent search is appended first/is on top of the list
            recentSearches.reverse();
            localStorage.setItem("Search Queries", JSON.stringify(recentSearches));
        }
    }

    //checks if the user input for the game name is empty
    function validateGameNameInput(string){
        if(string.length >=1){
            return true;
        }else{
           return false;
        }
    }

    //when search history link is pressed
    recentSearchEl.on("click", "li", (e)=>{
        const searchQuery = $(e.target).text();
        const searchQueryArr= Array.from(searchQuery).filter((char, i)=>{
            return i > 1;
        });
        fetchGames(searchQueryArr.join(""));
    });

    //when recent game articles link is pressed
    recentArticlesEl.on("click", "li", (e)=>{
        const articleUrl = $(e.target).data("url");
        console.log("article url: ");
        console.log(articleUrl);
        window.open(articleUrl);
    });

    //when search button is pressed
    searchBtn.on("click", ()=>{
        //trim the whitespaces and make it all lowercase
        const searchQuery = inputEl.val().trim().toLowerCase();
        //when validation is successful
        //fetch the games and displays
        if(validateGameNameInput(searchQuery)){
            fetchGames(searchQuery);
            /*
            the following method saves any valid game search string,
            any random string, for example: djkjkcjk87008s;/?
            even if there are no games found for the search
            //save the searched game in the local storage
            //and show the updated search list
            saveTheSearchToLS(searchQuery);
            displayRecentSearches();
            */
        //if validation fails
        //put the focus back to the input element
        //remove the previously searched game user input
        //making ready for another search
        }else {
            inputEl.focus();
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
        if(e.key === "Enter"){
            e.preventDefault();
            //removing whitespace and changing to all lowercase
            const searchQuery = inputEl.val().trim().toLowerCase();
            //when validation is successful
            //fetch the games and displays
            
            if(validateGameNameInput(searchQuery)){
                fetchGames(searchQuery);
                /*
                    the following method saves any valid game search string,
                    any random string, for example: djkjkcjk87008s;/?
                    even if there are no games found for the search
                    //save the searched game in the local storage
                    //and show the updated search list
                    saveTheSearchToLS(searchQuery);
                    displayRecentSearches();
                */
            }else {
                //remove the previously searched game user input
                //making ready for another search
                inputEl.val("");
                inputEl.focus();
            }
        }
    });

    //when next and previous navigation buttons are pressed
    pageNavEl.on("click", "button", e =>{
        if($(e.target).text()==="Next Page❯❯"){
            fetchData(nextUrl);
        }
        if($(e.target).text()==="❮❮Previous Page"){
            fetchData(previousUrl);
        }
    });
 
    //user presses return back while in games page
     returnBtn.on("click", ()=>{
       showOrHidePage("index");
       inputEl.focus();
       inputEl.val("");
       showOrHidePage("games", false);
     });

    //when the image on the game card is pressed 
    gameCardsContainer.on("click","img", e=>{
        const id = $(e.target).data("id");
        modalEl.html("");
        modalEl.append(`<img src="${id}" alt="" class="full">
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
            </form>
            </div>`);
        my_modal_5.showModal();
    });

    //when the find out more button is pressed
    gameCardsContainer.on("click","button", e=>{
        const id = $(e.target).data("id");
        const url = "https://api.rawg.io/api/games/";
        const requestUrl = `${url}${id}?key=${rawGKey}`;
        fetchData(requestUrl, "gameDetail");
    });

    //user presses return to index page while in detail page
    returnIndexBtn.on("click", ()=>{
        showOrHidePage("index-games");
        showOrHidePage("index");
        inputEl.focus();
        showOrHidePage("detail-page", false);
        videoEl.attr("src", "" );
     });

     //user presses return back while in detail page
     returnBackBtn.on("click", ()=>{
        
        showOrHidePage("index-games");
        showOrHidePage("games");
        showOrHidePage("detail-page", false);
        videoEl.attr("src", "" );
     });

     //display
     function displayTop10RecentArticles(){
        const url=`https://www.gamespot.com/api/articles/?api_key=${gamespotKey}&format=json&sort=publish_date:desc&limit=10`;
        fetchGamespotData(url, "articles");
     }
     //when the page loads, it shows 
     //the recently searched games and
     // the top 10 recent games articles
     displayRecentSearches();
     displayTop10RecentArticles();
})
