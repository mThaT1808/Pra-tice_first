window.onload = function() {
    var quickAddBtn = document.getElementById('AddButton');
    var quickAddFormDiv = document.querySelector('.addbookForm')
	var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    quickAddBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function(){
        console.log("CYKA")
        quickAddFormDiv.style.display = "none";
    });
}