$(document).on("pageinit", "#activitiesPage", function(){
		$("#actlist").listview({
		    autodividers: true,
		    autodividersSelector: function (li) {
		        var out = li.attr('date');
		        return out;
		    }
		}).listview('refresh');
		
		
		//add 'Add' button
		
		//------------- Begin Database Injection Code --------
		// Handling database errors
		function databaseError(error) {console.log(error);}
				
		//Read and/or create   database
		function getDatabase() {
			return window.openDatabase("actDB","1.0","Activities Database",5242880);
		}
		db=getDatabase();
		
		//db.transaction(populate function, error funciton, success function)
		
		db.transaction(setupTable,databaseError, getItems);
		console.log(db);
		
		function setupTable(tx) {
			console.log("Setting up database....");
			tx.executeSql("CREATE TABLE IF NOT EXISTS ACTMAIN (id INTEGER PRIMARY KEY,star varchar(255),startdate date,projgo varchar(255),title varchar(255),groupname varchar(255),prev varchar(255),pres varchar(255))");
;
			//tx.executeSql("INSERT INTO ACTMAIN (startdate,projgo,title,groupname) VALUES ('03/21/2013','To improve literact', 'Weekly classroom', 'gov')")
		}
		
		//executeSwl(SQL, querysuccess, error function)
		function getItems() {
			console.log(db);
			
			console.log("Selecting items from database...");
			db.transaction(function(tx) {
				tx.executeSql("SELECT * FROM ACTMAIN",[],querySuccess, databaseError);},databaseError);	
		}
		
			//NOTE: Querysuccess is called with results, we use the method to add to the actlist listview:
		//========== Adding to the list ================
		
		var part1 = '<li date="';
		var part2 = '"><a href="detail.html?id=';
		var part3 = '"><h3>';
		var part4 =  '</h3><h4>';
		var part5= '</h4></a></li>';
		
		function querySuccess(tx,results) {
			var len = results.rows.length;
			console.log("Database of length" +len);
			var output = '';
			for (var i=0; i<len; i++)
			{
				output=output + part1 + results.rows.item(i).date + part2 + results.rows.item(i).id + part3 + results.rows.item(i).title + part4 + results.rows.item(i).projgo + part5;
			}
			console.log("Database injection successful");
			$("#actlist").html(output);
			$('#actlist').listview('refresh');		
		}	
});