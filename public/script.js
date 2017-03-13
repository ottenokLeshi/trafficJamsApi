const getData = () => {
    fetch('/routes', {
        body: Blob
    }).then(response => response.blob())
    .then(blob => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.style = 'display: none';
        link.href = window.URL.createObjectURL(blob);
        link.download = 'MyFile';
        link.click();
        document.removeChild(link);
    });
};
