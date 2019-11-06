function movieSelected(Id){
sessionStorage.setItem('movieId',Id);
window.location='movie.html';
return false;
}

function getMovie()
{
	var movieId=sessionStorage.getItem('movieId');
	var url='http://www.omdbapi.com/?i=' + movieId + '&apikey=f7a01da'
		$.ajax(
		{
			url: url,
			type:'GET'
		})
		.then((response)=>
		{
			console.log("Hi Promises");
			 var output='';
			 output+=`
			 <div class="col-md-4">
			 <img src="${response.Poster}" class="thumbnail">
			 </div>
			 <div class=col-md-8>
			 <h2>${response.Title}</h2>
			 <ul class="list-group">
			 <li class="list-group-item"><strong>Genre:</strong> ${response.Genre}</li>
			 <li class="list-group-item"><strong>Released:</strong> ${response.Released}</li>
			 <li class="list-group-item"><strong>Rated:</strong> ${response.Rated}</li>
			 <li class="list-group-item"><strong>IMDB Rating:</strong> ${response.imdbRating}</li>
			 <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
			 <li class="list-group-item"><strong>Writer:</strong> ${response.Writer}</li>
			 <li class="list-group-item"><strong>Actors:</strong> ${response.Actors}</li>
			 </ul>
			 </div>
			 <div class="row">
			 <div class="well">
			 <h3> Plot </h3>
			 ${response.Plot}
			 <hr>
			 <a href="http://imdb.com/title/${response.imdbID}" target="_blank" class="btn btn-primary"> View IMDB</a>
			 <a href="index.html" class="btn btn-default">Go back to search</a>
			 </div>
			 </div>
			 `
			 $("#movie").html(output);
		})
		.catch((err)=>
		{
			console.log(error)
		});
}

$(document).ready(function()
{
	$("#btnSubmit").on('click',function()
	{
	var search=$("#searchText").val();
	getMovies(search);
	});
	
	function getMovies(search)
	{
		var url='http://www.omdbapi.com/?s=' + search + '&apikey=f7a01da'
		$.ajax(
		{
			url: url,
			type:'GET'
		})
		.then((response)=>{
			console.log(response);
			//alert(response.Search[0].Title)
			var movies=response.Search;
			var output='';
			$.each(movies,function(index, movie)
			{
				output+=`
				<div class="col-md-3">
				<div class="well center-text">
				<img src="${movie.Poster}">
				<h5>${movie.Title}</h5>
				<a id="anchor" name="anchor" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#"> More Details</a>
				</div>
				</div>
				`;
			});
			$("#movies").html(output);
		})
		.catch((err)=>{
			console.log(err);
		});

	};
});