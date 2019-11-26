const sourceUrl = '../static/pdfhandler-test2.pdf';
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
const scaleRate = 1;
const cvsRender = document.getElementById('cvs-render');
const ctxRender = cvsRender.getContext('2d');

let pageRendering = false;
let pageNumPending = null;
let pageNum = 1;
let pdfDoc = null;

function renderPage(number) {
    pageRendering = true;
    pdfDoc.getPage(number).then(page => {
        const viewport = page.getViewport({scale: scaleRate});
        cvsRender.height = viewport.height;
        cvsRender.width = viewport.width;

        const renderTask = page.render({
            canvasContext: ctxRender,
            viewport
        });

        renderTask.promise.then(res => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        })

    });
    document.getElementById('page_num').textContent = number;
}

function queueRenderPage(number) {
    if (pageRendering) pageNumPending = number;
    else renderPage(number)
}

document.getElementById('prev').addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum)
});

document.getElementById('next').addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum)
});

pdfjsLib.getDocument(sourceUrl).promise.then(res => {
    pdfDoc = res;
    document.getElementById('page_count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
}).then(res => {
    const page = document.querySelector('.painter');

    setTimeout(() => {
        const cvsDraw = document.getElementById('cvs-draw');
        console.log(page.clientWidth, page.clientHeight);
        cvsDraw.height = page.clientHeight;
        cvsDraw.width = page.clientWidth;
        const ctxDraw = cvsDraw.getContext('2d');
        ctxDraw.fillStyle='#FF0000';
        ctxDraw.strokeStyle='#FF0000';
    }, 1000)

});





