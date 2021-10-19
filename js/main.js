(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Blogs carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Class filter
    var classIsotope = $('.class-container').isotope({
        itemSelector: '.class-item',
        layoutMode: 'fitRows'
    });

    $('#class-filter li').on('click', function () {
        $("#class-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        classIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


//EAT CLEAN
function displayRandomImages()   
    {  
       //array of images with image location, height, and width  
       var imageArray = [  
       {   
         //address URL of the image  
         src: "img/eatclean/1.png",  
         //size for the image to be display on webpage  
         width: "1122.5",  
         height: "793.5"  
       },   
       {  
         src: "img/eatclean/2.png",  
         width: "1122.5",  
         height: "793.5"  
       },   
       {  
         src: "img/eatclean/3.png",  
         width: "1122.5",  
         height: "793.5"  
       },  
        {  
         src: "img/eatclean/4.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/5.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/6.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/7.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/8.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/9.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/10.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/11.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/12.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/13.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/14.png",  
         width: "1122.5",  
         height: "793.5"  
        },
        {  
         src: "img/eatclean/15.png",  
         width: "1122.5",  
         height: "793.5"  
        },
    ];  
          
        //find the length of the array of images  
        var arrayLength = imageArray.length;  
        var newArray = [];  
        for (var i = 0; i < arrayLength; i++) {  
            newArray[i] = new Image();  
            newArray[i].src = imageArray[i].src;  
            newArray[i].width = imageArray[i].width;  
            newArray[i].height = imageArray[i].height;  
        }  
         
      // create random image number  
      function getRandomNum(min, max)   
      {  
          // generate and return a random number for the image to be displayed   
          imgNo = Math.floor(Math.random() * (max - min + 1)) + min;  
          return newArray[imgNo];  
      }    
      
      // 0 is first image and (preBuffer.length - 1) is last image of the array  
      var newImage = getRandomNum(0, newArray.length - 1);  
       
      // remove the previous images  
      var images = document.getElementsByTagName('img');  
      var l = images.length;  
      for (var p = 0; p < l; p++) {  
         images[0].parentNode.removeChild(images[0]);  
      }  
      // display the new random image    
      document.body.appendChild(newImage); 
    }  


// nav bar
// Create the dropdown base
$("<select />").appendTo("nav");

// Create default option "Go to..."
$("<option />", {
   "selected": "selected",
   "value"   : "",
   "text"    : "Go to..."
}).appendTo("nav select");

// Populate dropdown with menu items
$("nav a").each(function() {
 var el = $(this);
 $("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo("nav select");
});

//make it works pls
$("nav select").change(function() {
    window.location = $(this).find("option:selected").val();
  });


  function othername() {
    var input = document.getElementById("userInput").value;
    alert(input);
}