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
    // const nextBtn = $(".next");
    // const previousBtn =$(".previous");

    const modalBoxEl = $(".modal-box");
    const dialogBoxEl = $(".modal");

    // const modalBoxEl = $(".modal-box");
    // const dialogBoxEl = $("#my_modal_5");

    const pageNavEl = $(".page-nav");
    const errMsg = $(".error-text");


  const inputEl = $('.game-input');
  const searchBtn = $('.search');
  const recentSearchEl = $('.recent-search');
  const searchMsgEl = $('.games-page p');
  const indexPageContainer = $('.index-page');
  const gamesPageContainer = $('.games-page');
  const gamesContainer = $('.games');
  const returnBtn = $('.return');
  // const nextBtn = $(".next");
  // const previousBtn =$(".previous");
  // const modalBoxEl = $(".modal-box");
  // const dialogBoxEl = $("#my_modal_5");
  const pageNavEl = $('.page-nav');
  const errMsg = $('.error-text');

  let recentSearches = [];
  let nextUrl;
  let previousUrl;
  /*
    const cardContainer = $(".grid-cards");
    
    const pageNavEl = $(".page-nav");
    
    const mainEl = $("main");
    const popupContainer = $(".popup-container");
    
    const moreBtn = $('.more');
    const closeEl= $(".close-icon");
    const gameDetailContainer = $(".game-detail");
    let nextUrl;
    let previousUrl;
    let currentUrl;
    




    function displayTheGameDetails(data){
        hideCurrentPage();
    }
 


    function readSavedUrlFromLS(){
        const savedUrl =localStorage.getItem("currentUrl");
        if(savedUrl){
            currentUrl= savedUrl;
        }
    }
    function saveCurrentUrlToLS(currentUrl){
        localStorage.setItem("currentUrl", JSON.stringify(currentUrl));
    }

   


    pageNavEl.on("click", "button", e =>{
        // console.log($(e.target).text());
        if($(e.target).text()==="Next"){
            // console.log(nextUrl);
            fetchData(nextUrl);
        }
        if($(e.target).text()==="Previous"){
            // console.log(previousUrl);
            fetchData(previousUrl);
        }
    });

    closeEl.on("click","i", () =>{
        // alert("hi");
        mainEl.removeClass("hidden");
        popupContainer.addClass("hidden");
    });

    recentSearchEl.on("click", "li", (e)=>{
        console.log($(e.target).text());
        const searchQuery = $(e.target).text();
        const searchQueryArr= Array.from(searchQuery).filter((char, i)=>{
            return i > 1;
        });
        // console.log(searchQueryArr);
        // console.log(searchQueryArr.join(""));
        
        fetchGames(searchQueryArr.join(""));
    });

    // moreBtn.on("click", (e)=>{
    cardContainer.on("click","button", e=>{
         
        const id = $(e.target).data("id");
        console.log(id);
        const url = "https://api.rawg.io/api/games/";
        const requestUrl = `${url}${id}?key=${key}`;
        // const requestUrl = `${url}key=${key}&id=${id}`;

        fetchData(requestUrl, "gameDetail");
    });

    */

  function showPagination(data) {
    pageNavEl.html('');
    if (data.previous) {
      pageNavEl.append(
        `<button class="btn btn-primary mr-3">Previous Page</button>`
      );
      previousUrl = data.previous;
    }
    if (data.next) {
      pageNavEl.append(`<button class="btn btn-primary ">Next Page</button>`);
      nextUrl = data.next;
    }
  }

  function showOrHidePage(page, toShow = true) {
    if (toShow) {
      //showing the page
      if (page === 'index') {
        indexPageContainer.addClass('md:grid');
        indexPageContainer.removeClass('hidden');
      } else if (page === 'games') {
        gamesPageContainer.addClass('md:grid');
        gamesPageContainer.removeClass('hidden');
      }
    } else {
      //hiding the page
      if (page === 'index') {
        indexPageContainer.addClass('hidden');
        indexPageContainer.removeClass('md:grid');
      } else if (page === 'games') {
        gamesPageContainer.addClass('hidden');
        gamesPageContainer.removeClass('md:grid');
      }
    }
  }

  let gamePlatformNumber = 0;
  let releaseDate = '';

  const gamePlatformSelect = document.querySelector('#game-type-select');
  const releaseDateEle = document.querySelector('#release-date');

  async function getAllGamePlatforms() {
    try {
      const url = `https://api.rawg.io/api/platforms?key=${key}&page_size=50`;

      const response = await fetch(url);

      const data = await response.json();
      console.log(data.results);
      data?.results.forEach((platform) => {
        gamePlatformSelect.insertAdjacentHTML(
          'beforeend',
          `
         <option value=${platform?.id}>${platform?.name}</option>
         `
        );
      });
    } catch (error) {
      console.log('failed to get game details', error);
    }
  }

  if (releaseDateEle) {
    releaseDateEle.addEventListener('change', (event) => {
      releaseDate = event.target.value;
    });
  }

  if (gamePlatformSelect) {
    gamePlatformSelect.addEventListener('change', (event) => {
      gamePlatformNumber = event.target.value
      console.log(event.target.value, 'select');
    });

    getAllGamePlatforms();
  }

    function displayGames(data){
        gamesContainer.html("");
        for(result of data.results){
            gamesContainer.append(`

                <div class="card card-compact bg-base-100 shadow-xl md:col-span-1 hover:opacity-50">
                        <figure><img src="${result.background_image}" alt="${result.name}" ></figure>

                <div class="card card-compact bg-base-100 shadow-xl md:col-span-1">
                        <figure><img src="${result.background_image}" alt="${result.name}" /></figure>


                        <div class="card-body">
                        <h2 class="card-title">${result.name}</h2>
                        <ul >
                            <li> Release Date:<span class="data"> ${
                              result.released
                            }</span></li>
                            <li>Platforms:</li>
  <ul>
    ${result.platforms
      .map(
        (platformInfo) => `
      <li>
      
        <span class="data">Platform: ${
          platformInfo?.platform?.name ?? 'None'
        }</span>
        
        <!-- Add additional platform-related information here if needed -->
      </li>
    `
      )
      .join('')}
      <span class="data">Released At: ${result.released ?? 'None'}</span>
  </ul>
                            <li>Rating: <span class="data">${
                              result.rating
                            }</span></li>
                            <li>Rating Count: <span class="data">${
                              result.ratings_count
                            }</span></li>
                            </ul>
                        <div id="game-detail-container-${id}" class='hidden'  >
                        <h1 class='mb-[1rem] text-white' >Game Details</h1>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" id="game-id-${
                              result?.id
                            }"><a href="/Project1/From-Pixel-to-Purchase/game-details.html?game-id-${id}" target="_blank">Find Out Mor</a></button>
                        </div>
                    </div><!--card body end-->
                </div><!--card end-->
            `);
      // const findMoreButton = $(`#game-id-${id}`);

      // if (findMoreButton) {
      //   findMoreButton.on('click', async function (event) {
      //     const paresedId = event.target?.id.split('game-id-');
      //     const gameContainer = document.querySelector(
      //       `#game-detail-container-${paresedId[1] ?? ''}`
      //     );
      //     const response = await gameDetail(paresedId[1] ?? '');
      //     const recommendedVideo = recommendYoutubeVideo(response?.name, 10000);
      //     console.log(recommendYoutubeVideo, 'recommend video');
      //     gameContainer.insertAdjacentHTML(
      //       'beforeend',
      //       `<p>Description : ${response?.description_raw}</p>`
      //     );
      //     gameContainer.classList.remove('hidden');
      //     gameContainer.classList.add('max-h-[max-content]');
      //     gameContainer.classList.add('block');
      //   });
      // }
      // const findMoreButton = $(`#game-id-${id}`);

      //     if (findMoreButton) {
      //       findMoreButton.on('click', async function (event) {
      //         const paresedId = event.target?.id.split('game-id-');
      //         const gameContainer = document.querySelector(
      //           `#game-detail-container-${paresedId[1] ?? ''}`
      //         );
      //         const response = await gameDetail(paresedId[1] ?? '');
      //         const recommendedVideo = recommendYoutubeVideo(response?.name, 10000);
      //         console.log(recommendYoutubeVideo, 'recommend video');
      //         gameContainer.insertAdjacentHTML(
      //           'beforeend',
      //           `<p>Description : ${response?.description_raw}</p>`
      //         );
      //         gameContainer.classList.remove('hidden');
      //         gameContainer.classList.add('max-h-[max-content]');
      //         gameContainer.classList.add('block');
      //       });
      //     }

      showPagination(data);
    }
    showOrHidePage('games');
  }

  function fetchData(requestUrl, dataOf = 'games') {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log('-----------------fetching games data');
        console.log(data);
        if (dataOf === 'games') {
          // saveCurrentUrlToLS(requestUrl)
          showOrHidePage('index', false);
          displayGames(data);
          // gamesContainer.css("minHeight", "100%");
          // inputEl.val("");
        } else {
          // hideCurrentPage();
          // displayTheGameDetails(data);
        }
      })
      .catch(function (err) {
        console.log('Something went wrong!', err);
      });
  }

  function fetchGames(gameQueryString) {
    const url = 'https://api.rawg.io/api/games?';
    let requestUrl = `${url}key=${key}&search=${gameQueryString}&page_size=6&search_precise=true`;

    if (gamePlatformNumber) {
      requestUrl = `${url}key=${key}&search=${gameQueryString}&page_size=6&search_precise=true&platforms=${parseInt(gamePlatformNumber)}`;
    }

    if (releaseDate) {
      requestUrl = `${url}key=${key}&search=${gameQueryString}&page_size=6&search_precise=true&dates=${releaseDate}`;
    }


    if (releaseDate && gamePlatformNumber) {
      requestUrl = `${url}key=${key}&search=${gameQueryString}&page_size=6&search_precise=true&dates=${releaseDate}&platforms=${parseInt(gamePlatformNumber)}`;
    }

    console.log(gamePlatformNumber)

    // console.log(gameQueryString);

    // const requestUrl =  ` http://www.gamespot.com/api/games/?api_key=${}`
    fetchData(requestUrl);
    searchMsgEl.removeClass('hidden');
    searchMsgEl.html(
      `Showing results for: <span class="data">${gameQueryString}</span>`
    );
  }
  function displayRecentSearches() {
    let i = 1;
    readTheSearchesFromLS();
    // console.log("before creating list");
    recentSearchEl.html('');
    if (recentSearches.length > 0) {
      recentSearches.forEach((search) => {
        recentSearchEl.append(`<li>${i}.${search}</li>`);
        // console.log("during creating list");
        i++;
      });
    }

    // console.log("after creating list");
  }
  function readTheSearchesFromLS() {
    const storedSearches = JSON.parse(localStorage.getItem('Search Queries'));
    if (storedSearches) {
      recentSearches = storedSearches;
    }

    function validateGameNameInput(){
        const input = inputEl.val().trim();
        if(input.length >=1){
            return true;
        }else{
           inputEl.val("");
           inputEl.focus();
           console.log("after validation false");

    function validateGameNameInput(input){
        if(input.trim().length >=1){
            return true;
        }else{
           inputEl.setCustomValidity(false);

           return false;

        }
        recentSearches.reverse();
        recentSearches.push(queryString);
      }
      recentSearches.reverse();
      // console.log("length " + recentSearches.length);
      localStorage.setItem('Search Queries', JSON.stringify(recentSearches));
    }
  }
  function validateGameNameInput(input) {
    if (input.trim().length >= 1) {
      return true;
    } else {
      inputEl.setCustomValidity(false);
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

        console.log("button clicked");
        const searchQuery = inputEl.val();
        console.log("search query " + searchQuery);
        if(validateGameNameInput(searchQuery)){

            saveTheSearchToLS(searchQuery);
            displayRecentSearches();
            fetchGames(searchQuery);
            inputEl.val("");
        }


      fetchGames(searchQuery);
      inputEl.val('');
    }
  });
  inputEl.on('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
  //after typing in user input and pressing Enter key
  inputEl.on('keyup', (e) => {
    console.log('key ' + e.key);
    if (e.key === 'Enter') {
      // e.stopImmediatePropagation();
      e.preventDefault();
      const searchQuery = inputEl.val();
      console.log(searchQuery);
      if (searchQuery.trim().length !== 0) {
        saveTheSearchToLS(searchQuery);
        displayRecentSearches();

        fetchGames(searchQuery);
        inputEl.val('');
      }
    }
  });
  recentSearchEl.on('click', 'li', (e) => {
    console.log($(e.target).text());
    const searchQuery = $(e.target).text();
    const searchQueryArr = Array.from(searchQuery).filter((char, i) => {
      return i > 1;
    });

    // gamesContainer.on("click","img", e=>{
    //     const src= e.target.src;
    //     console.log("source" + src);
    //     const img = `<img src="${src}" alt="">`;
    //     modalBoxEl.prepend(img);
    //     dialogBoxEl.showModal();
    // });

    
    // gamesContainer.on("click","img", dialogBoxEl.showModal());


    // // gamesContainer.on("click","img", dialogBoxEl.showModal);

     returnBtn.on("click", ()=>{
       showOrHidePage("index");
       showOrHidePage("games", false);
     });

    displayRecentSearches();

});


});


