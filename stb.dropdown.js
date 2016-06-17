/*
* Shoot The Bit - jQuery Dropdown v0.1.0.2
* @author Luis Valencia
*/
;
(function ($) {
   function KeycodeInterpreter (keycode) {
      //Keyboard Enumerables
      var Keyboard = {
          Up:38,
          Down:40,
          Left:37,
          Right:39
      };
      //Object with Instance Variables
      return {
         handlePrevious:function (block) {
            if (keycode == Keyboard.Up || keycode == Keyboard.Left) { block(); } //If I could I would simply like to yield to a block, instead of passing in a function
            return this;
         },
         handleNext:function (block) {
            if (keycode == Keyboard.Down || keycode == Keyboard.Right) { block(); }
            return this;
         },
         handleSubmit:function (block) {
            if (keycode == Keyboard.Enter) { block(); }
            return this;
         },
         handleCharacter:function (block) { 
            if (this._searchable(keycode)) { block(); }
            return this;
         },
         // "Private" Helper Method
         _searchable:function (keycode) {
            return keycode !== 0 && 
                keycode != Keyboard.Up && 
                keycode != Keyboard.Down && 
                keycode != Keyboard.Left && 
                keycode != Keyboard.Right;
         }
      };
   };
   //Generated HTML
   var $container = $('<div class="stb-select-container"><span class="selected"></span></div>');
   var $list = $('<ul class="stb-select" style="display:none;"></ul>');
   //Object Instance
   $.fn.stbDropdown = function (options) { 
      var $els = $(this); 
      //Hide Original Selects
      $els.hide();
      //Go through each select and create STB Dropdown
      $els.each(function(index,value) {
         //Visuals
         //Clone Containers and List Objects
         var $currentContainer = $container.clone();
         var $currentList = $list.clone();
         //Pull out Select Info and Copy it Over to our New Structure
         var $el = $(value);
         var $options = $el.find('option'); 
         //Insert Container into DOM
         $el.after($currentContainer);
         //Move select into Container
         $el.appendTo($currentContainer); 
         //Insert our Shell List
         $currentList.appendTo($currentContainer);
         //Copy over Options into List
         $options.each(function (index, value) {
            var $option = $(value);
            var $wrapper = $("<li></li>");
            var attributes = $option.prop("attributes"); 
            $wrapper.prop("attributes", attributes);
            //Copy over teh attributes
            $.each(attributes, function(index, attribute) {
               $wrapper.attr(attribute.name, attribute.value);
            });
            $wrapper.append($option.text());
            //Add it to our list
            $currentList.append($wrapper); 
         });
         //Filter Selected Options
         var selectedOptions = $el.children("option").filter(function (index, el) { 
            return $(el).is("[selected]"); 
         });
         //Set Selected 
         var $selected;
         if (selectedOptions.length == 0) {
             //Default to First Option
             $selected = $options.first();
         }
         else {
            //Default to First to multiple selections
            $selected = selectedOptions.first();
         }
         //Set the currently selected Default
         $currentContainer.find('.selected').text($selected.text());
         //Behaviorals
         $currentContainer.on("click.stb.select", function() {
            //When the Click on our "select" dropdown box
            var $sel = $(this);
            //Close all other boxes
            var targets = $.grep($('.stb-select-container'), function (e) {
               return ! $sel.is($(e));
            });
            $(targets).find('ul').hide();
            //Toggle our Box
            $sel.find('ul').toggle();
         });
         $currentContainer.on("click.stb.option", "li", function(e) { 
            //Dont Trigger General Select
            e.stopPropagation();
            //Update Selected Text
            var $li = $(this); 
            var $currentContainer = $li.parents('.stb-select-container');
            var $currentlySelected = $currentContainer.find('span.selected');
            $currentlySelected.text($li.text());
            //Toggle our Dropdown
            $li.parents('ul').toggle();
            //Set Select Selected
            var $select = $currentContainer.find('select');
            $select.val($li.attr('value')).change(); //Make sure you trigger the change event
            $li.siblings().removeAttr('selected');
            $li.attr('selected', 'selected');
         }); 
         //Make Focusable
         $currentContainer.attr('tabindex', "1");
         //Bind Keystroke
         $currentContainer.on("keyup.stb", function (e) {
            var keycode = e.which;
            KeycodeInterpreter(keycode).handlePrevious(function () {
               var $selected = $currentContainer.find("li[selected]");
               if ($selected.length == 0) {
                  $selected.removeAttr("selected")
                  $currentContainer.find("li").first().attr("selected","selected");
                  return;
               }
               $previous = $selected.first().prev();
               if ($previous.length > 0) { 
                  $selected.removeAttr("selected")
                  $previous.attr("selected", "selected");
               }
            })
            .handleNext(function () {
               var $selected = $currentContainer.find("li[selected]");
               if ($selected.length == 0) {
                  $selected.removeAttr("selected");
                  $currentContainer.find("li").first().attr("selected","selected");
                  return;
               }
               $next = $selected.first().next();
               if ($next.length > 0) { 
                  $selected.removeAttr("selected");
                  $next.attr("selected", "selected");
               }
            })
            .handleSubmit(function () {
               var $selected = $currentContainer.find("li[selected]");
               $selected.first().click(); //Simulate Click
            })
            .handleCharacter(function () {
               var character = String.fromCharCode(keycode);
            });
         });
         //If an element is added after init
         $el.on("DOMNodeInserted", function (e) {
            //Add to List if it's an Option Tag
            var $option =  $(e.target); 
            if ($option.is('option')) {
               var $wrapper = $("<li></li>");
               var attributes = $option.prop("attributes"); 
               $wrapper.prop("attributes", attributes);
               $.each(attributes, function(index, attribute) {
                  $wrapper.attr(attribute.name, attribute.value);
               }); 
               $wrapper.append($option.text());
               $currentList.append($wrapper); 
            }   
         });
         //If an element is removed after init
         $el.on("DOMNodeRemoved", function (e) {
            //Remove from List if it's Option Tag
            var $option =  $(e.target);
            if ($option.is('option')) {
               $currentList.find("li:contains('"+$option.text()+"')").remove();
            }
         });
      });
   }
})(jQuery);
