const getData = () => {
    fetch('/routes', {
        body: Blob
    }).then(response => console.log(response.body));
};
