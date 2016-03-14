// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("deleteUserFromTeam", function(request, response) {

  var usr = request.params.username;
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", request.params.username);

  // Get the first user which matches the above constraints.
  query.first({
    success: function(anotherUser) {
      // Successfully retrieved the user.
      // Modify any parameters as you see fit.
      // You can use request.params to pass specific
      // keys and values you might want to change about
      // this user.
      anotherUser.set("TEAMNAME", "");
      anotherUser.get("ACCESSLEVEL").set("personal",false);
      anotherUser.get("ACCESSLEVEL").set("medical",false);
      anotherUser.get("ACCESSLEVEL").set("financial",false);
      anotherUser.get("ACCESSLEVEL").set("legal",false);
      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });
  //response.success("Hello world!");
});


Parse.Cloud.define("addUserToTeam", function(request, response) {

  var usr = request.params.username;
  var newTeam = request.params.newTeamName;
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", request.params.username);

  // Get the first user which matches the above constraints.
  query.first({
    success: function(anotherUser) {
      // Successfully retrieved the user.
      // Modify any parameters as you see fit.
      // You can use request.params to pass specific
      // keys and values you might want to change about
      // this user.
      if (anotherUser.get("TEAMNAME") == "") {
        anotherUser.set("TEAMNAME", newTeam);
        anotherUser.get("ACCESSLEVEL").set("personal",false);
        anotherUser.get("ACCESSLEVEL").set("medical",false);
        anotherUser.get("ACCESSLEVEL").set("financial",false);
        anotherUser.get("ACCESSLEVEL").set("legal",false);

        }

      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });
  //response.success("Hello world!");
});


Parse.Cloud.define("getAccessLevels", function(request, response) {
    Parse.Cloud.useMasterKey();

    var query = new Parse.Query("NFObject");
    query.equalTo("objectId", request.params.objId);
    query.find({
        success: function(matchingNFObj) {
            response.success(matchingNFObj.length);
        },
        error: function(error) {

            response.error("There was an error");

        }
    });
});
