/**
*  Simple SVG Animation
*  Author: Yasin Yaqoobi
*  Project Goal: Show how to parse a SVG file from the same server and perform a simple animation. 
*  Date: 08/21/16
**/


$(document).ready(function(){

var svgElements = ['.dynamic', '.global', '.activism', '.selection', '.knowledge']; 
var svgText = {
               'Dynamic'                  :  'Creative and flexible solutions to alpha generation',
               'Global'                   :  'Opportunities exist globally and competitive environement must be understood on global scale',
               'Activism'                 :  'Consultative approach leads to win-win for all stakeholders',
               'Company Selection'        :  'Deeper understanding leads to specific company investments rather than broad-based baskets',
               'Knowledge Through Cycles' :  'Deep research and knowledge base of 25 years is the bedrock for success'
               };

var counter = 0; 
var animation; 

/** Send GET request to the .svg file and call the required methods **/  
$.get('images/cycler.svg', function(data){

    setupCycler(data); 
    setupListeners(); 
    setupHoverEffect();
}); 


/** Setup the cycler - call animation function **/ 
function setupCycler(data){
var oSerializer = new XMLSerializer();   // init XML Serializer
var svg = oSerializer.serializeToString(data); // Get #document - xml that was read from the svg file and convert it to jquery string 
    
     $('.cycler').html(svg);

     animateElement('.knowledge');   

     animation = setInterval(setupAnimation, 5000);  // Switch animation after five secs

}



/** Setup an internaval - inifnite so the animation keeps cycling **/
function setupAnimation(){
    
     if (counter > svgElements.length-1){
            counter = 0; 
     }
     removePrevious(); 
     animateElement(svgElements[counter]); 
     updateRequiredText(counter);
     counter++; 

}


/** Simple animation to fill the svg elements with white backgorund **/ 
function animateElement(elementName){
    $(elementName).find('circle').attr('fill', 'white');
    $(elementName).find('.circle_text').attr('fill', 'gray');
}

function updateRequiredText(index){
    var count = 0; 
    $.each(svgText, function(key,value){
        if (count === index){
             $('.replacable .featured_header').html(key); 
             $('.replacable .brd-bottom').html(value);
        }
        count ++; 
    });

}

/** Remove all the previous clicked / active states **/ 
function removePrevious(){
    $('#cycler_svg').find('circle').attr('fill', 'transparent'); 
    $('#cycler_svg').find('.circle_text').attr('fill', 'white');
}


/** Setup on click listener for all the elements = classNames in svg array **/ 
function setupListeners(){
    $.each(svgElements, function (index, value){
       $(value).on('click', function(){
            removePrevious(); 
            animateElement(value);
            updateRequiredText(index);
            counter = index;  // move the counter to current index position so it starts from next up
       });


    });
}

function setupHoverEffect(){
  $.each(svgElements, function(index, value){
      $(value).mouseover(function(){
          $(this).next().css('font-weight', 'bold');
          
      });
      $(value).mouseout(function(){
        $(this).next().css('font-weight', 'normal');

      });
  });
}


}); 

