/*
 * Paginación para Blogger - Creado por Yeifer Orozco
 * Modificado por MJ + Copilot para compatibilidad móvil (m=1)
 */

// Parámetros globales
var currentPage, searchQuery, lastPostDate = null, type, lblname1, nopage;

// Detectar móvil
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Añadir &m=1 cuando sea necesario
function addMobileParam(url) {
  if (isMobile() && !url.includes("m=1")) {
    url += (url.includes("?") ? "&m=1" : "?m=1");
  }
  return url;
}

// Obtener parámetro de búsqueda
function getSearchQuery() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("q") || "";
}

// Función principal de paginación
function pagination(totalPosts) {
    let paginationHTML = "";
    let leftnum = Math.floor(pagesToShow / 2);
    let maximum = Math.ceil(totalPosts / itemsPerPage);

    paginationHTML += `<span class='totalpages'>Hoja ${currentPage} de ${maximum}</span>`;

    if (currentPage > 1) {
        paginationHTML += createPageLink(currentPage - 1, prevpage);
    }

    let start = Math.max(currentPage - leftnum, 1);
    let end = Math.min(start + pagesToShow - 1, maximum);

    if (start > 1) paginationHTML += createPageLink(1, "1");
    if (start > 2) paginationHTML += "...";

    for (let r = start; r <= end; r++) {
        paginationHTML += r === currentPage 
            ? `<span class="pagenumber current">${r}</span>` 
            : createPageLink(r, r);
    }

    if (end < maximum - 1) paginationHTML += "...";
    if (end < maximum) paginationHTML += createPageLink(maximum, maximum);

    if (currentPage < maximum) {
        paginationHTML += createPageLink(currentPage + 1, nextpage);
    }

    let pageArea = document.getElementsByName("pageArea");
    let pagerElement = document.getElementById("blog-pager");

    for (let i = 0; i < pageArea.length; i++) {
        pageArea[i].innerHTML = paginationHTML;
    }
    if (pagerElement) pagerElement.innerHTML = paginationHTML;
}

// Crear enlace de página
function createPageLink(pageNum, linkText) {
    if (type === "page") {
        return `<span class="pagenumber"><a href="#" onclick="redirectpage(${pageNum}); return false;">${linkText}</a></span>`;
    } else if (type === "label") {
        return `<span class="pagenumber">
