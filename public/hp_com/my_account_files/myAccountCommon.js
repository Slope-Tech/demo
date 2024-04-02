
    function openMenu() {
      document.getElementById("myAccountOverlay").style.display = "block";
      document.getElementById("myAccountNav").style.position= "fixed";
      document.getElementById("myAccountNav").style.overflow= "auto";
      document.getElementById("myAccountNav").style.right = "0";
      document.getElementById("myAccountNav").style.width = "72%";
      document.getElementById("closeNav").style.right = "75%";
    }

    function closeMenu() {
      document.getElementById("closeNav").style.right = "100%";
      document.getElementById("myAccountOverlay").style.display = "none";
      setTimeout(function(){document.getElementById("myAccountNav").style.position= "absolute";}, 300); 
      document.getElementById("myAccountNav").style.right = "-60px";
      document.getElementById("myAccountNav").style.width = "0";
      document.getElementById("myAccountContent").style.marginLeft= "0";
      document.getElementById("myAccountNav").style.overflow= "hidden";
    }

