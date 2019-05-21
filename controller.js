config = require('./config');
fetch = require('isomorphic-fetch')
Dropbox = require('dropbox').Dropbox;

var pathlist = [];
var imagepaths = [];
var tmpPromises = [];
var dbx = new Dropbox({fetch: fetch, accessToken: config.DBX_ACCESS_TOKEN}); 

module.exports.home = (req,res,next)=>{
    pathlist = [];
    imagepaths = [];
    tmpPromises = [];
    var params = {};
    params.path = config.DBX_PATH;
    console.log('here');
    dbx.filesListFolder(params).then(function(result) { 
        console.log('Retrieved files ' + result.entries.length);
        //console.log(result);
	return getFileList(result);
    }).then( function () { 
        return getLinkListPromises();
    }).then( () => {
        Promise.all(tmpPromises).then(function(tmplinks) {
            console.log('got ' + tmplinks.length + ' temp links');
            for ( var i = 0; i < tmplinks.length; i++ ) {
	        imagepaths.push(tmplinks[i].link); 
            }
            console.log('loading to web ' + imagepaths.length);
            res.render('gallery',{imgs: imagepaths, layout:false});
            console.log('stopping');
        });
    });
};

var getLinkListPromises = function(result) {
     console.log('getting links for file list');
     return new Promise( function(resolve, reject) {
     try{
            console.log('getting links...'+ pathlist.length);
            for ( var i = 0; i < pathlist.length; i++ ) {
	        tmpPromises.push(dbx.filesGetTemporaryLink({'path':pathlist[i]}));
            }
            console.log('data retrieved');
            resolve();
      } catch (error) {
                console.log('got error');
                console.log(error);
      }
      });
}

var getFileList = function(result) {
    console.log('processing file list of ' + result.entries.length);
    return new Promise( function(resolve, reject) {
        for (var i = 0; i < result.entries.length; i++ ){ 
	    //console.log('retrieved data ' + result.entries[i].name + ' ' + i ); 
            if ( result.entries[i].name.search(/\.jpg$/i) > -1) {
                //console.log('Adding data');
                try{
                pathlist.push(result.entries[i].path_lower);
                } catch(error) {
                    console.log('error happened');
                    console.log(error);
                }
                console.log('processing data ' + i);
            } 
        }
	resolve();
    }); 
}

