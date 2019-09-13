//this will tell to run all scripts once the browser page has been successfully loader for the user
$(document).ready(function(){


    //------------------------Global Variables to be used throughout app.js file-----------------------------
        var userChoice;
        var gifOutputResults = [];

        var preloadedGifs = ["Barrack Obama", "Elon Musk", "Joy Division", "Mac Dre", "Jackie Chan", "Tupac", "Blobfish"]
        var apiKey = "EX7BbiRvBmKL91x2AmkDSSQQFMjziUnr"



        //renderButtons is a function that is made to run when the user inputs something in the search bar, this function will render out the gifs based on the user choice
        //this function is also responsible for re-rendering the HTML button clicks and creating new button gifs
        function renderButtons() {
            //use the jquery method to point out the specific ID 'preloaded-btns' variable that contains the initial gifs set within the buttons preloaded as the browser initally runs
            //by emptying it out, the user is able input new buttons that will render out the gif animations correlated to their text description within the search bar
            $("#preloaded-btns").empty();
            //created a for loop  that has the parameters of running through the entire array index 'preloadedGifs', starting at preloadedGifs[0], with an increement count of +1 running through the index array
            for(var j = 0; j < preloadedGifs.length; j++) {
            //dynamically created variable 'btnCreate' on line 22 to generates a unique html <button></button> tag for each
            //new user text inputs within the 'searchBar-input' ID for each time they pressed the submit button 
                var btnCreate = $("<button>");
            //added a new class element for eaach new 'newChoiceBtn" the user has created from the search bar by themselves
                btnCreate.addClass("newChoiceBtn btn-danger");
            //added a data-attribute that has a value of specfic chosen array index from j 
                btnCreate.attr("data-name", preloadedGifs[j]);
            //by using the .text method, it point's out the user's choice text input choice within the array 'preloadedGifs'
            // at index j to be set equal to the 'btnCreate' dynamic variable that we created on line 23
                btnCreate.text(preloadedGifs[j]);
            //after we added the new user choice input j value within the 'preloadedGifs' array index, we will .append that new 'btnCreate' button to all buttons with the text element 'preloaded-btns' div ID
                $("#preloaded-btns").append(btnCreate);
            }
        }

        //line 36 basically runs to empty the attributes from the variable element "searchBar-input"...which is basically clearing the search bar so the user and input a new text input value
        $("searchBar-input").val("");


        //this jquery event listener will track the clicks pressed on button tag 'submit' within the index.html file,
        $("#user-input").on("click", function(){
            //line 42 is created within this function and stops the user from clicking the submit button more than once than it was made to function
            event.preventDefault();
            //sets the new variable 'userGIFChoice' equal to the dynamic div ID "#searchBar-input" 
            //and by using the .val().trim() methods will help prevent the user from writing their text input in the search bar outside the given text paremeters 
            var userGIFChoice = $("#searchBar-input").val().trim();
            //using the .push method, I am able to add the new text array values that the user has made, in form of a button, and that to the existing array index 'preloadedGifs'
            preloadedGifs.push(userGIFChoice);
            console.log(preloadedGifs);

            //finally we make this function run the renderButtons function that handles the creationg of the initial array index of 'preloadedGifs'
            renderButtons();
            //empties out the search bar string ("") values within the search bar
            $("#searchBar-input").val("")
        });

        renderButtons();



        //created an onclick event handler that followers the user's clicks on anything tied to the <button> tag and the browser would generate 10 still-imaged .GIF images from giphy's api server
        //and be placed in my div class 'gifs-appear-here" portion within the index.html file...which should output within the bottom portion of the browser page
        $(document).on("click", ".newChoiceBtn", function(event){
            
            var userChoice = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userChoice + "&limit=10" + "&api_key=" + apiKey;
         
            $.ajax({
                url: queryURL,
                method: "GET"
            }) .then(function(response){
                var dynamicListArr = document.getElementById("gifs-appear-here");
                
                console.log(dynamicListArr);

                for (var j = 0; j < response.data.length; j++) {

                     var gifRatings = response.data[j].rating.toUpperCase();
                //this jQuery method will dynamically create 
                $("#gifs-appear-here").prepend("<div class='dynamicContainer'><span class='dynamicTag'>Rating: " + gifRatings + "</span><div class='dynamicGIFContainer'><img class='gifDynamicResults img-responsive center-block'" + "data-still='" + response.data[j].images.downsized_still.url + "'" + "data-animate='" + response.data[j].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[j].images.downsized_still.url + "'></div></div>");
                   
                        gifOutputResults.push(response.data[j].images.downsized.url);
                        console.log(response.data[j].rating);
                }
                //created this on click event handler that handles events that gives us permission to get or set new values/attributes on the index.html file
                $(".gifDynamicResults").on("click", function(){

                    var giphy = $(this).attr("data-state")

                        if(giphy === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }
                        else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                });
            });
        });
});