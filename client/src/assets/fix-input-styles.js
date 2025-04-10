// This script fixes input text visibility in dark mode
document.addEventListener('DOMContentLoaded', function() {
  // Set input text colors to be visible in dark mode
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    input, textarea {
      color: white !important;
      caret-color: white !important;
    }
  `;
  document.head.appendChild(styleElement);
});