// angular.module('fileUpload', ['ngFileUpload'])
// .controller('MyCtrl',['Upload','$window',function(Upload,$window){
//     var vm = this;

// vm.submit = function(){ 
//    if (vm.upload_form.file.$valid && vm.params.file) {
//        console.log(vm.params)
//        vm.upload(vm.params); // Pass the `vm.params` object.
//    }
//  }

// vm.upload = function (params) {

//     console.log(params.name); // params.name should be available
//     console.log(params.email); // params.email should be available
//     console.log(params.file); // params.file should be available

//     Upload.upload({
//       url: 'http://localhost:3000/upload',
//       file: params.file,   // Image to upload
//       data: {
//         name: params.name,
//         email: params.email
//       } 
//     })
// }
// }]);

angular.module('fileUpload', ['ngFileUpload'])
.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }
    
    vm.upload = function (file) {
    
    console.log(vm.name);
    console.log(vm.email);
    
    
        Upload.upload({
        url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
        data:{file:file, name:vm.name, email:vm.email} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);