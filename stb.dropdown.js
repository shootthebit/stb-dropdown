/*
* Shoot The Bit - jQuery Dropdown v0.1.0
* @author Luis Valencia
*/
;
(function ($) {
   //Generated HTML
   var $container = $('<div class="stb-select-container"><span class="selected"></span></div>');
   var $list = $('<ul class="stb-select" style="display:none;"></ul>');
   //Object Instance
   $.fn.stbDropdown = function (options) { 
      var $els = $(this); 
      $els.hide();
      $els.each(function(index,value) {
         //Visuals
         var $currentContainer = $container.clone();
         var $currentList = $list.clone();
         var $el = $(value);
         var $options = $el.find('option'); 
         $el.after($currentContainer);
         $el.appendTo($currentContainer); 
         $currentList.appendTo($currentContainer);
         $options.each(function (index, value) {
            var $option = $(value);
            var $wrapper = $("<li></li>");
            var attributes = $option.prop("attributes"); 
            $wrapper.prop("attributes", attributes);
            $.each(attributes, function(index, attribute) {
               $wrapper.attr(attribute.name, attribute.value);
            });
            $wrapper.append($option.text());
            $currentList.append($wrapper); 
         });
         $currentContainer.find('.selected').text($($options[0]).text());
         //Behaviorals
         $currentContainer.on("click.stb.select", function() {
            var $sel = $(this);
            var targets = $.grep($('.stb-select-container'), function (e) {
               return ! $sel.is($(e));
            });
            $(targets).find('ul').hide();
            $sel.find('ul').toggle();
         });
         $currentContainer.on("click.stb.option", "li", function(e) { 
            //Dont Trigger General Select
            e.stopPropagation();
            //Display Accordingly 
            var $li = $(this); 
            var $currentContainer = $li.parents('.stb-select-container');
            var $currentlySelected = $currentContainer.find('span.selected');
            $currentlySelected.text($li.text());
            $li.parents('ul').toggle();
            //Set Select Selected
            var $select = $currentContainer.find('select');
            $select.val($li.attr('value'));
         });
      });
   }
})(jQuery);
