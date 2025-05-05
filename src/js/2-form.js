let formData = { 
    email: "",
     message: "", 
};

const STORAGE_KEY = "feedback-form-state";

const formElem = document.querySelector(".feedback-form");
populateForm()


formElem.addEventListener("submit", handleFormSubmit);
formElem.addEventListener("input", handleFormInput);


function handleFormSubmit(event){
    event.preventDefault();
    if (formData.email.trim() === "" || formData.message.trim() === "") {
        alert("Fill please all fields");
        return;
      }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formElem.reset();
}


function handleFormInput(event){
    formData = {
        email: event.currentTarget.email.value,
        message: event.currentTarget.message.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm(){
    const savedLSData = localStorage.getItem(STORAGE_KEY);
    if(!savedLSData){
        return
    }
    try{
        const DataFromLS = JSON.parse(savedLSData);
        // formElem.email.value = DataFromLS.email;
        // formElem.message.value = DataFromLS.email;
        const formObj = new FormData(formElem)
        const formFields = Array.from(formObj.keys())
        formFields.forEach(field => {
            formElem.elements[field].value = DataFromLS[field];
        });
    } catch{
        alert('ERROR');
    }
}


