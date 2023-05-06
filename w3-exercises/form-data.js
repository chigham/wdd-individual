const formElem = document.querySelector("form");

formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
        method: 'POST',
        body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
};

document.addEventListener('DOMContentLoaded', () => {
    const formElem = document.getElementById('formElem');
    formElem.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(formElem);
        formData.append('submitted', new Date());
        for (let key of formData.keys()) {
            console.log(key, formData.get(key));
        }
    });
});