window.onload = function() 
{
    var quickAddBtn = document.getElementById('AddButton');
    var quickAddFormDiv = document.querySelector('.addbookForm')
    var window = document.querySelector(".window")
	var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    var searchValue;

    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var favorite = document.getElementById("favorite")
    var favoriteInBook = document.getElementById("favoriteInBook")

    var addBook = document.querySelector(".addbook")

    var addressBook = [];

    function jsonStructure(name, phone, favorite)
    {
        this.name = name;
        this.phone = phone;
        this.favorite = favorite;
    }

    quickAddBtn.addEventListener("click", function()
    {
        quickAddFormDiv.style.display = "inline-flex";
        window.style.display = "none";
    });

    cancelBtn.addEventListener("click", function()
    {
        console.log("CYKA")
        quickAddFormDiv.style.display = "none";
        window.style.display = "inline-flex";
    });

    AddBtn.addEventListener("click", addToBook);

    addBook.addEventListener("click", removeEntry);


    document.addEventListener('keydown', function(event) {
        if (event.code == 'Enter') {
            searchValue = (document.getElementById('searchValue').value);
            console.log(searchValue);
        }
    });

    function clearForm(){
        var formFields = document.querySelectorAll(".formFields");
        var formCheckBox = document.querySelectorAll(".formCheckBox");
        for(var i in formFields)
        {
            formFields[i].value ='';
        }
        for(var i in formCheckBox)
        {
            formCheckBox[i].checked = false;
        }
    }

    function removeEntry(e){
        if(e.target.classList.contains('delbutton')){
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID,1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
        if(e.target.classList.contains('checkbox1'))
        {
            var remID = e.target.getAttribute('data-id');
            console.log(remID);
            if(addressBook[remID].favorite)addressBook[remID].favorite = false;
            else addressBook[remID].favorite = true;
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
}

    function showAddressBook(){
        if (localStorage['addbook'] === undefined){
            localStorage['addbook'] = '[]';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBook.innerHTML = '';
            if(true)
            {
                findFavorite(true)
                findFavorite(false)
            }
        }
    }

    function findFavorite(search)
    {
        for(var n in addressBook)
                {
                    if(addressBook[n].favorite === search)
                    {
                        var str = '<div class="entry">';
                        str += '<div class="name"><p>' + addressBook[n].name + '</p></div>';
                        str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                        if(search) str += '<div class="formCheckBox"> Избранное <input class="checkbox1" type="checkbox" data-id="' + n + '"checked></div>';
                        else str += '<div class="formCheckBox"> Избранное <input class="checkbox1" type="checkbox" data-id="' + n + '"></div>';
                        str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">XI</a></div>';
                        str += '</div>';
                    addBook.innerHTML += str;
                    }
                }
    }


    function addToBook()
    {
        var isEmpty = name.value!="" || phone.value!="";
        var checked = favorite.checked;
        if(isEmpty)
        {
            var obj = new jsonStructure(name.value, phone.value, checked);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);

            quickAddFormDiv.style.display = "none";
            window.style.display = "inline-flex";
            clearForm();
            showAddressBook();
        }
    }

    showAddressBook();
}