document.addEventListener("DOMContentLoaded", function () {
   document.getElementById('navbar_top').classList.add('fixed-top');

   function getQueryVariable(variable)
   {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
               return pair[1].replace("%C3%BC","ü");
            }
      }
   }

   if (sessionStorage.getItem("reloaded")) {
      console.log("The page is being reloaded.");
      sessionStorage.removeItem("reloaded");
  }
  else {
   var accordion = getQueryVariable("accordion");
   console.log(accordion)
   document.getElementById(accordion).click()
   var element = document.getElementById(accordion);
   const yOffset = -80;
   const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
   window.scrollTo({ top: y, behavior: 'smooth' });
   sessionStorage.setItem("reloaded", true);
   
}

   window.addEventListener('scroll', function () {
      if (document.getElementById('rtlNav').className !== 'activeClass') {
         if (window.scrollY > 2) {
            document.getElementById('navbar_top').classList.add('fixed-top');
         }
      }
   });
});