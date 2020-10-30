
function printError(element, msg) {
    document.getElementById(element).innerHTML = msg;
}

var blogcreate = function (name, description, photo, date) {
    var div = document.createElement("div");
    var titleelement = document.createElement("h2");
    var details = document.createElement("p");
    var img = document.createElement("img");
    var times = document.createElement("h5");
    var clear = document.createElement("hr");
    titleelement.innerText = name;
    details.innerText = description;
    times.innerText = date;
    times.classList.add("text-muted");
    img.src = photo;
    img.style.float = "right";
    img.style.width = "360px";
    img.style.height = "360px";
    img.classList.add("img-responsive");
    clear.style.clear = "both";
    div.appendChild(img);
    div.appendChild(titleelement);
    div.appendChild(times);
    div.appendChild(details);
    div.appendChild(clear);
    return div;
}

var addblog = function (parent, child) {
    parent.appendChild(child);
}

var loadblog = function () {
    var spaces = document.getElementsById("blog-post");
    for (blog of blogs) {
        var elem = blogcreate(blog.name, blog.description, blog.photo, blog.date);
        addblog(spaces, elem);
    }
    return;
}
var validate = function(){
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var file = document.getElementById("file").value;
    var date = new Date();
    var success = true;
    if(name==""){
        if(document.getElementById("name-error").classList.contains("d-none")){
            document.getElementById("name-error").classList.toggle("d-none");
        }
        success = false;
    }else{
        if(!document.getElementById("name-error").classList.contains("d-none")){
            document.getElementById("name-error").classList.toggle("d-none");
        }
    }
    if(description==""){
        if(document.getElementById("description-error").classList.contains("d-none")){
            document.getElementById("description-error").classList.toggle("d-none");
        }
        success = false;
    }else{
        if(!document.getElementById("description-error").classList.contains("d-none")){
            document.getElementById("description-error").classList.toggle("d-none");
        }
    }
    if(file==""){
        if(document.getElementById("file-error").classList.contains("d-none")){
            document.getElementById("file-error").classList.toggle("d-none");
        }
        success = false;
    }else{
        if(!document.getElementById("file-error").classList.contains("d-none")){
            document.getElementById("file-error").classList.toggle("d-none");
        }
    }
    
    if(success){
        
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();
        var filename = "";
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            filename = e.target.result;
            var blog = blogcreate(name,description,filename,date);
            var spaces = document.getElementById("blog-post");
            spaces.removeChild(spaces.children[0]);
            spaces.appendChild(blog);
            document.getElementById("post").disabled = false;
            window.scroll(0,1000000);
        }  
        
    }

    return false;
}
var cancels = function(){
    var spaces = document.getElementById("blog-post");
        spaces.removeChild(spaces.children[0]);
        document.getElementById("post").disabled = false;
}



var postblog = function(btn){
    btn.disabled = true;
    window.scroll(0,0);
    var spaces = document.getElementById("blog-post");
    var new_blog = document.createElement("form");
    new_blog.setAttribute("action","javascript:void(0)");
    var div1 = document.createElement("div");
    div1.classList.add("form-group");
    var label1 = document.createElement("label");
    label1.innerText = "Title";
    label1.setAttribute("for","name");
    
    var title_input = document.createElement("input");
    title_input.classList.add("form-control");
    title_input.setAttribute("id","name");
    title_input.type = "text";
    var title_error = document.createElement("small");
    title_error.id = "name-error";
    title_error.innerText = "Please Enter Title";
    title_error.classList.add("text-danger");
    title_error.classList.add("d-none");

    var div2 = document.createElement("div");
    div2.classList.add("form-group");
    var label2 = document.createElement("label");
    label2.innerText = "Contents: ";
    label2.setAttribute("for","description");

    var input1 = document.createElement("textarea");
    input1.classList.add("form-control");
    input1.rows = "3";
    input1.setAttribute("id","description");

    var detail_error = document.createElement("small");
    detail_error.id = "description-error";
    detail_error.innerText = "Content is empty, please enter some content";
    detail_error.classList.add("text-danger");
    detail_error.classList.add("d-none");

    var div3 = document.createElement("div");
    div3.classList.add("form-group");
    var label3 = document.createElement("label");
    label3.innerText = "Insert Image: ";
    label3.setAttribute("for","description");

    var input2 = document.createElement("input");
    input2.type = "file";
    input2.classList.add("form-control");
    input2.accept = ".jpg, .jpeg, .png";
    input2.setAttribute("id","file");

    

    var file_error = document.createElement("small");
    file_error.id = "file-error";
    file_error.innerText = "Image is Empty";
    file_error.classList.add("text-danger");
    file_error.classList.add("d-none");
    
    var file_help = document.createElement("small");
    file_help.id = "file-help";
    file_help.innerText = "Supports only .png, .jpg, .jepg format...";
    file_help.classList.add("text-muted");
    // file_help.classList.add("d-none");

    var div4 = document.createElement("div");
    div4.classList.add("form-group");
    var input3 = document.createElement("button");
    var input4 = document.createElement("button");
    input3.classList.add("btn");
    input3.classList.add("btn-success");
    input3.innerText = "Post Blog";
    input3.addEventListener("click",validate);
    input4.classList.add("btn");
    /* input4.classList.add("btn-danger"); */
    input4.innerText = "Cancel";
    input4.addEventListener("click",cancels);
    input4.style.marginLeft = "5px";

    div1.appendChild(label1);
    div1.appendChild(title_input);
    div1.appendChild(title_error);
    div2.appendChild(label2);
    div2.appendChild(input1);
    div2.appendChild(detail_error);
    div3.appendChild(label3);
    div3.appendChild(input2);
    div3.appendChild(file_help);
    div3.appendChild(file_error);
    div4.appendChild(input3);
    div4.appendChild(input4);
    new_blog.appendChild(div1);
    new_blog.appendChild(div2);
    new_blog.appendChild(div3);
    new_blog.appendChild(div4);
    spaces.insertBefore(new_blog,spaces.children[0]);
}


function validateForm() {

    // Retrieving the values of form elements 
    var name = document.contactForm.name.value;
    var email = document.contactForm.email.value;
    var mobile = document.contactForm.mobile.value;
    var country = document.contactForm.country.value;
    var gender = document.contactForm.gender.value;
    var hobbies = [];
    var checkboxes = document.getElementsByName("hobbies[]");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // Populate hobbies array with selected values
            hobbies.push(checkboxes[i].value);
        }
    }

    var nameErr = emailErr = mobileErr = genderErr = countryErr =true;

    // Validate name
    if (name == "") {
        printError("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }

    // Validate email address
    if (email == "") {
        printError("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    // Validate mobile
    if (mobile == "") {
        printError("mobileErr", "Please enter your mobile number");
    } else {
        // Regular expression for basic email validation
        var regex = /^\d{10}$/;
        if (regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid mobile number");
        } else {
            printError("mobileErr", "");
            mobileErr = false;
        }
    }

    // Validate country
    if (country == "Select") 
        printError("countryErr", "Please select your country");
    else
    {
        printError("countryErr", "");
       countryErr = false;
    }
    

    // Validate gender
    if (gender == "") 
        printError("genderErr", "Please select your gender");
    else
    {
        printError("genderErr", "");
       genderErr = false;
    }

    if (nameErr || emailErr || mobileErr || countryErr || genderErr == true) {
        return false;
    } else {
        alert('You have submitted the form..')
    }
}