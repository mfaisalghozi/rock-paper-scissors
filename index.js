function showDropdown() {
  console.log('hello');

  const dropdownTarget = document.getElementById("dropdown-target")
  dropdownTarget.classList.toggle("show")

  console.log(dropdownTarget)
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdownBtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

