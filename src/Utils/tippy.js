function showTooltip(element) {
  const tooltip = element.nextElementSibling;
  if (tooltip && tooltip.classList.contains("animated-tooltip")) {
    tooltip.style.opacity = "1";
    tooltip.style.visibility = "visible";
    tooltip.style.transform = "translateX(-50%) translateY(0)";
  }
}

// Función para ocultar tooltip personalizado
function hideTooltip(element) {
  const tooltip = element.nextElementSibling;
  if (tooltip && tooltip.classList.contains("animated-tooltip")) {
    tooltip.style.opacity = "0";
    tooltip.style.visibility = "hidden";
    tooltip.style.transform = "translateX(-50%) translateY(10px)";
  }
}

// Deshabilitar tooltips nativos del navegador
document.querySelectorAll("[title]").forEach(function (element) {
  const title = element.getAttribute("title");
  element.removeAttribute("title");
  element.setAttribute("data-title", title);
});
