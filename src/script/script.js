ca$(document).ready(()=>{
    const rawGKey = "66d3737f6f13454880d0fe3f9948fa06";
    const gamespotKey ="6493f75acb2827c70912c6f769c7649ed167342a";
    const giantBombKey ="44f9c228b9f178613033839ebfd62f00e49ff1f6";

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

    function displayArticles(response){
        let title, url;
        response.results.forEach((result, index)=>{

            title = result.title;
            url= result.site_detail_url;
            console.log(`title: ${title}`);
            console.log(`url: ${url}`);
            recentArticlesEl.append(`<li class ="hover:text-amber-100 hover:cursor-pointer hover:text-lg border-b-2 border-amber-50 ">${index}.<a href="${url}">${title}</href></li>`)
        });
    }

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
     
        console.log("src");
        console.log(src);
        videoEl.attr("src", src );
    }
    
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
            // console.log(`prev is ${prev} and next is ${next}`);
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

    function fetchTheGameVideo(slug){
        console.log(slug);
        const gamespotSlug = slug.replaceAll("-","%20");
        console.log(gamespotSlug);
        // gameNameEl = 
        const requestUrl = `http://www.gamespot.com/api/videos/?api_key=${gamespotKey}&format=json&limit=10&filter=title:${gamespotSlug}&categories:[{Trailer},{Games}]`;
        fetchGamespotData(requestUrl);

    }

    function fetchScreenshotsOfTheGame(slug){
        const requestUrl = `https://rawg.io/api/games/${slug}/screenshots?key=${rawGKey}`;
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
        fetchTheGameVideo(slug);
    
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
                gamesPageContainer.removeClass("hidden");
                // gamesPageContainer.removeClass("positioned");
                // alert("2");
            }else if(page === "detail-page"){
                // detailPageContainer.removeClass("positioned");
                detailPageContainer.removeClass("hidden");
                // alert("3");
            }else{
                // indexGamePageContainer.removeClass("positioned");
                indexGamePageContainer.removeClass("hidden");
                // alert("4");
            }
        }else{//hiding the page
            if(page === "index"){
                indexPageContainer.addClass("hidden");
                // alert("5");
            }else if (page === "games"){
                gamesPageContainer.addClass("hidden");
                // gamesPageContainer.addClass("positioned");
                // alert("6");
            }else if(page === "detail-page"){
                // detailPageContainer.addClass("positioned");
                detailPageContainer.addClass("hidden");
                // alert("7");
            }else{
                // indexGamePageContainer.addClass("positioned");
                indexGamePageContainer.addClass("hidden");
                // alert("8");
            }
        }
    }

    function displayGames(data){
        
        gamesPageContainer.removeClass("hidden");
        
        if(data.results.length===0){
            result404.removeClass("hidden");
            gamesContentEl.addClass("hidden");
        }else{
            saveTheSearchToLS(inputEl.val());
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
                inputEl.val("");
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

    function fetchGames(gameQueryString){
        const url = "https://api.rawg.io/api/games?";
        
        // console.log(gameQueryString);
        const requestUrl = `${url}key=${rawGKey}&search="${gameQueryString}"&page_size=6&search_precise=true`;
        fetchData(requestUrl);
        // searchMsgEl.removeClass("hidden");
        searchMsgEl.html(`Showing results for: <span class="data-caption">${gameQueryString}</span>`);

    }

    function displayRecentSearches(){
        let i= 1;
        readTheSearchesFromLS();
        // console.log("before creating list");
        recentSearchEl.html("");
        if(recentSearches.length > 0){
            recentSearches.forEach(search=>{
                recentSearchEl.append(`<li class ="hover:text-amber-100 hover:cursor-pointer hover:text-lg border-b-2 border-amber-50 ">${i}.${search}</li>`);
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
    //when search history link is pressed
    recentSearchEl.on("click", "li", (e)=>{
        // console.log($(e.target).text());
        const searchQuery = $(e.target).text();
        const searchQueryArr= Array.from(searchQuery).filter((char, i)=>{
            return i > 1;
        });
        // console.log(searchQueryArr);
        // console.log(searchQueryArr.join(""));
        
        fetchGames(searchQueryArr.join(""));
    });
    //when search button is pressed
    searchBtn.on("click", ()=>{
        // console.log("button clicked");
        const searchQuery = inputEl.val();
        // console.log("search query " + searchQuery);
        // console.log(validateGameNameInput());
        if(validateGameNameInput()){
            // saveTheSearchToLS(searchQuery);
            // displayRecentSearches();
             fetchGames(searchQuery);
            // showGames(searchQuery);
            //inputEl.val("");
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
    gameCardsContainer.on("click","img", e=>{
        const id = $(e.target).data("id");
        // const w =  $(document).dccumen
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
        // console.log("id" + id);
        const url = "https://api.rawg.io/api/games/";
        const requestUrl = `${url}${id}?key=${rawGKey}`;
        // const requestUrl = `${url}key=${key}&id=${id}`;
        fetchData(requestUrl, "gameDetail");
        

    });

    //user presses return to index page while in detail page
    returnIndexBtn.on("click", ()=>{
        
        showOrHidePage("index-games");
        showOrHidePage("index");
        inputEl.focus();
        showOrHidePage("detail-page", false);
        // showOrHidePage("games", false);
     });
     //user presses return back while in detail page
     returnBackBtn.on("click", ()=>{
        showOrHidePage("detail-page", false);
        showOrHidePage("index-games");
        showOrHidePage("games");
     });


     function displayTop10RecentArticles(){
        const today = new Date();
        const url=`http://www.gamespot.com/api/articles/?api_key=${gamespotKey}&format=json&sort=publish_date:desc&limit=10`;
        fetchGamespotData(url, "articles");

     }


















     displayRecentSearches();
     displayTop10RecentArticles();
})
